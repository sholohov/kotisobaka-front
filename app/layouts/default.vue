<script setup lang="ts">
import { disableScroll } from "~/utils/disableScroll";

const { isMobile, isTabletSmall, isTablet } = useBreakpoint()
const isMobileView = computed(() => (isMobile.value || isTabletSmall.value || isTablet.value))
const menuMobileStore = useMenuMobileStore()
const modalStore = useModalStore()
const route = useRoute()
const device = useDevice()

watch(isMobileView, () => {
  if (!isMobileView.value) {
    menuMobileStore.close()
  }

  modalStore.close()
})

watch(() => route.path, (cur: string, prev?: string) => {
  if (prev && cur !== prev) {
    menuMobileStore.close()
    modalStore.close()
  }
})

watch(() => menuMobileStore.isOpen, () => {
  if (menuMobileStore.isOpen) {
    modalStore.close()
  }
})

watch(() => modalStore.isOpen, () => {
  if (modalStore.isOpen) {
    menuMobileStore.close()
  }
})

const showOverlay = computed(() => modalStore.isOpen || menuMobileStore.isOpen)

watch(showOverlay, () => {
  if (import.meta.client) {
    if (showOverlay.value) {
      disableScroll(true)
    } else {
      setTimeout(() => {
        disableScroll(false)
      }, 300)
    }
  }
})

onMounted(() => {
  if (device.isMobileOrTablet) {
    useSwipe(document.body, {
      onSwipe: dir => {
        if (dir === 'down') {
          modalStore.close()
        }
      },
    })
  }
})

function handleClickOverlay() {
  menuMobileStore.close()
  modalStore.close()
}
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
          'layout-default__overlay--visible': showOverlay
        }]"
        @click.self="handleClickOverlay"
      />

      <div
        class="layout-default__modals"
        :class="{ 'layout-default__modals--is-opened': modalStore.name }"
      >
        <modal-root />
      </div>

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

  &__modals {
    z-index: 3;
    position: fixed;
    top: 0;
    bottom: 50px;
    left: 0;
    right: 0;
    transform: translateY(100%);
    transition: transform 0.3s;
    pointer-events: none;

    &--is-opened {
      transform: translateY(0);
    }

    @media (min-width: $breakpoint-lg) {
      transition: opacity 0.3s, transform 0.3s;
      bottom: 0;
      opacity: 0;
      transform: scale(0.8);

      &--is-opened {
        transform: scale(1);
        opacity: 1;
      }
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
    pointer-events: none;

    &--is-opened {
      transform: translateY(0);
    }
  }
}
</style>
