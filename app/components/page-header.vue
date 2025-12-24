<script setup lang="ts">
import LogoSvg from '~/assets/svg/logo.svg'
import HeartIcon from '~/assets/svg/heart-icon.svg'
import SearchIcon from '~/assets/svg/search-icon.svg'
import PiggyBankIcon from '~/assets/svg/piggy-bank-icon.svg'
import type { ButtonNavigationProps } from "~/types/buttonNavigation";

const navigations: ButtonNavigationProps[] = [{
  label: 'О нас',
  to: '/about',
  key: 'about',
  items: [{
    label: 'Документы и отчётность',
    to: '/about/docs',
    key: 'about-docs',
  }, {
    label: 'Истории успеха',
    to: '/about/stories',
    key: 'about-stories',
  }],
}, {
  label: 'Как помочь?',
  to: '/help',
  key: 'help',
  items: [{
    label: 'Материальная помощь',
    to: '/help/donate',
    key: 'help-donate',
  }, {
    label: 'Волонтёрство',
    to: '/help/volunteer',
    key: 'help-volunteer',
  }, {
    label: 'Другая помощь',
    to: '/help/other',
    key: 'help-other',
  }],
}, {
  label: 'Наши хвостики',
  to: '/animals',
  key: 'animals',
}, {
  label: 'Информация',
  to: '/info',
  key: 'info',
  items: [{
    label: 'Как забрать питомца?',
    to: '/info/adopt',
    key: 'info-adopt',
  }, {
    label: 'Процесс усыновления',
    to: '/info/process',
    key: 'info-process',
  }, {
    label: 'Помощь своими руками',
    to: '/info/diy',
    key: 'info-diy',
  }, {
    label: 'Часто задаваемые вопросы',
    to: '/info/faq',
    key: 'info-faq',
  }],
}, {
  label: 'Блог',
  to: '/blog',
  key: 'blog',
  items: [],
}]

</script>

<template>
  <header class="page-header">
    <content-box>
      <div class="page-header__inner">
        <tooltip-box
          :text="$route.path === '/' ? 'Кот и Собака' : 'На главную'"
          position="bottom-left"
        >
          <nuxt-link
            :to="$route.path === '/' ? '' : '/'"
            class="page-header__logo-link"
          >
            <logo-svg class="page-header__logo-img" />
          </nuxt-link>
        </tooltip-box>

        <nav class="page-header__nav">
          <button-navigation
            v-for="navigation in navigations"
            :key="navigation.key"
            :to="navigation.to"
            :items="navigation.items"
          >
            {{ navigation.label }}
          </button-navigation>
        </nav>

        <div class="page-header__right">
          <tooltip-box
            text="Поиск"
            position="bottom"
          >
            <button-default circle>
              <search-icon style="color: var(--color-green-darken)" />
            </button-default>
          </tooltip-box>

          <tooltip-box
            text="Избранное"
            position="bottom"
          >
            <button-default
              circle
              to="/favorites"
            >
              <heart-icon style="color: var(--color-orange)" />
            </button-default>
          </tooltip-box>

          <tooltip-box
            text="Помочь сейчас"
            position="bottom-right"
          >
            <button-default
              circle
              color="yellow"
            >
              <piggy-bank-icon
                width="24"
                style="color: var(--color-brown-darkest)"
              />
            </button-default>
          </tooltip-box>
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
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__logo-link {
    background-color: var(--color-white-darken);
    border: 1px solid var(--color-orange-lighten);
    width: 44px;
    height: 44px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s;

    &:hover {
      background-color: var(--color-pink-lighten);
    }

    &:not([href]) {
      pointer-events: none;
      cursor: default;
      background-color: var(--color-white-darken);
      transition: none;
    }

    &:not([href]):hover {
      background-color: var(--color-white-darken);
    }
  }


  &__logo-img {
    height: 36px;
    width: auto;
    color: var(--color-red-darken);
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

  &__donate {
    display: flex;
    align-items: center;
    position: absolute;
    top: 100%;
    right: 0;
    margin: 10px 0 0;
  }
}
</style>
