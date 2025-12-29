<script setup lang="ts">
const menuMobileStore = useMenuMobileStore()
const { navigation } = useAppConfig()
</script>

<template>
  <div class="menu-mobile">
    <div class="menu-mobile__dialog">
      <button
        class="menu-mobile__close"
        @click="menuMobileStore.close()"
      />

      <nav class="menu-mobile__nav">
        <menu-mobile-nav-item
          v-for="navItem in navigation"
          :key="navItem.key"
          :label="navItem.label"
          :to="navItem.to"
          :items="navItem.items"
        />
      </nav>
    </div>
  </div>
</template>

<style lang="scss">
.menu-mobile {
  $this: '.menu-mobile';
  pointer-events: none;

  &__dialog {
    pointer-events: auto;
    overflow: hidden;
    border-radius: 16px 16px 0 0;

    background-color: var(--color-pink-dark);
    color: var(--color-white);
    padding: 0 20px 20px;
  }

  &__close {
    display: flex;
    height: 32px;
    justify-content: center;
    width: 100%;

    &:before {
      content: '';
      display: inline-flex;
      width: 36px;
      height: 4px;
      margin: 8px 0 0;
      border-radius: 4px;
      background-color: var(--color-beige-lightest);
    }
  }
}
</style>
