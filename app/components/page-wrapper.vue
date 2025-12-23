<script setup lang="ts">

</script>

<template>
  <div class="page-wrapper">
    <header class="page-wrapper__header">
      <page-header />
    </header>
    <main class="page-wrapper__main">
      <slot />
    </main>
    <footer class="page-wrapper__footer">
      <page-footer />
    </footer>
  </div>
</template>

<style lang="scss">
.page-wrapper {
  $this: ".page-wrapper";

  display: flex;
  min-height: 100vh;
  flex-direction: column;

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

  &__footer {
    flex: 0;
    z-index: 1;
  }
}
</style>
