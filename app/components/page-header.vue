<script setup lang="ts">
import LogoSvg from '~/assets/svg/logo.svg'
import HeartIcon from '~/assets/svg/heart-icon.svg'
import SearchIcon from '~/assets/svg/search-icon.svg'
</script>

<template>
  <header class="page-header">
    <content-box>
      <div class="page-header__inner">
        <nuxt-link
          to="/"
          class="page-header__logo-link"
          title="На главную"
        >
          <logo-svg class="page-header__logo-img" />
        </nuxt-link>

        <nav class="page-header__nav">
          <button-default color="green">
            О нас
          </button-default>

          <button-default color="blue">
            Как помочь?
          </button-default>

          <button-default color="yellow">
            Наши хвостики
          </button-default>

          <button-default>Информация</button-default>

          <button-default>Блог</button-default>
        </nav>

        <div class="page-header__right">
          <button-default circle>
            <search-icon style="color: var(--color-green-darken)" />
          </button-default>

          <button-default circle>
            <heart-icon style="color: var(--color-orange)" />
          </button-default>
        </div>
      </div>
    </content-box>
  </header>
</template>

<style lang="scss">
.page-header {
  $this: ".page-header";

  padding: 20px 0;

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__logo-link {
    margin: -5px 0;
  }

  &__logo-img {
    color: var(--color-beige-lightest);
  }

  &__nav {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__right {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}
</style>
