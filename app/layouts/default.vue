<script setup lang="ts">
const { isMobile, isTabletSmall, isTablet } = useBreakpoint()
const isMobileView = computed(() => (isMobile.value || isTabletSmall.value || isTablet.value))
const menuMobileStore = useMenuMobileStore()
const route = useRoute()

watchEffect(() => {
  if (!isMobileView.value) {
    menuMobileStore.close()
  }
})

watch(() => route.path, (cur: string, prev?: string) => {
  if (prev && cur !== prev) {
    menuMobileStore.close()
  }
})
</script>

<template>
  <div class="layout-default">
    <header class="layout-default__header">
      <page-header />
    </header>

    <main class="layout-default__main">
      <nuxt-page />
    </main>

    <footer class="layout-default__footer">
      <page-footer />
    </footer>

    <client-only>
      <div
        class="layout-default__overlay"
        :class="[{
          'layout-default__overlay--visible': menuMobileStore.isOpen
        }]"
        @click="menuMobileStore.close()"
      />

      <div
        v-if="isMobileView"
        class="layout-default__menu"
        :class="{ 'layout-default__menu--is-opened': menuMobileStore.isOpen }"
      >
        <menu-mobile />
      </div>
    </client-only>

    <nav
      v-if="isMobileView"
      class="layout-default__bottom-nav"
    >
      <bottom-nav-bar />
    </nav>
  </div>
</template>

<style lang="scss">
.layout-default {
  $this: ".layout-default";

  display: flex;
  min-height: 100vh;
  flex-direction: column;
  padding: 0 0 calc(30px + $container-padding-xs);

  @media (min-width: $breakpoint-md) {
    padding: 0 0 calc(30px + $container-padding-md);
  }

  @media (min-width: $breakpoint-lg) {
    padding: 0;
  }

  &__header {
    flex: 0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
  }

  &__main {
    flex: 1;
    z-index: 1;
  }

  &__bottom-nav {
    flex: 0;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 3;
  }

  &__footer {
    flex: 0;
    z-index: 1;
  }

  &__overlay {
    position: fixed;
    inset: 0;
    background: rgba(41, 23, 23, 0.5);
    backdrop-filter: blur(10px);
    z-index: 2;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease, backdrop-filter 0.3s ease;

    &--visible {
      opacity: 1;
      pointer-events: auto;
    }
  }

  &__menu {
    z-index: 3;
    position: fixed;
    bottom: 50px;
    left: 0;
    right: 0;
    transition: transform 0.3s;
    transform: translateY(100%);

    &--is-opened {
      transform: translateY(0);
    }
  }
}
</style>
