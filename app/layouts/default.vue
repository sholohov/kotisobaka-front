<script setup lang="ts">
import PageHeader from "~/components/page-header.vue";
import PageFooter from "~/components/page-footer.vue";
import BottomNavBar from "~/components/bottom-nav-bar.vue";

const { isMobile, isTabletSmall, isTablet } = useBreakpoint()
const isMobileView = computed(() => (isMobile.value || isTabletSmall.value || isTablet.value))
</script>

<template>
  <div class="layout-default">
    <header class="layout-default__header">
      <page-header />
    </header>

    <main class="layout-default__main">
      <nuxt-page />
    </main>

    <nav
      v-if="isMobileView"
      class="layout-default__bottom-nav"
    >
      <bottom-nav-bar />
    </nav>

    <footer class="layout-default__footer">
      <page-footer />
    </footer>
  </div>
</template>

<style lang="scss">
.layout-default {
  $this: ".layout-default";

  display: flex;
  min-height: 100vh;
  flex-direction: column;
  padding: 0 0 calc(44px + $container-padding-xs);

  @media (min-width: $breakpoint-md) {
    padding: 0 0 calc(44px + $container-padding-md);
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
    z-index: 2;
  }

  &__footer {
    flex: 0;
    z-index: 1;
  }
}
</style>
