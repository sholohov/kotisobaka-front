<script setup lang="ts">
import BurgerIcon from '~/assets/svg/burger-icon.svg'
import PawIcon from '~/assets/svg/paw-icon.svg'
import BlogIcon from '~/assets/svg/blog-icon.svg'
import PiggyBankIcon from '~/assets/svg/piggy-bank-icon.svg'
import HeartIcon from '~/assets/svg/heart-icon.svg'
import { NuxtLink } from '#components';
import { useMenuMobileStore } from '~/stores/menuMobile';

interface ItemProps {
  label: string
  key: string
  to: string
  icon: unknown
}

const items: ItemProps[] = [{
  label: 'Меню',
  key: 'menu',
  to: '',
  icon: BurgerIcon,
}, {
  label: 'Хвостики',
  key: 'animals',
  to: '/animals',
  icon: PawIcon,
}, {
  label: 'Помочь',
  key: 'help',
  to: '',
  icon: PiggyBankIcon,
}, {
  label: 'Статьи',
  key: 'articles',
  to: '/articles',
  icon: BlogIcon,
}, {
  label: 'Избранное',
  key: 'favorites',
  to: '/favorites',
  icon: HeartIcon,
}]

const menuMobileStore = useMenuMobileStore()
const modalStore = useModalStore()

function handleTabClick(item: ItemProps) {
  if (item.key === 'menu') {
    menuMobileStore.toggle()
  }

  if (item.key === 'help') {
    if (modalStore.name === 'donate-with-guide') {
      modalStore.close()
    } else {
      modalStore.open('donate-with-guide')
    }
  }
}
</script>

<template>
  <div class="bottom-nav-bar">
    <ul class="bottom-nav-bar__list">
      <li
        v-for="item in items"
        :key="item.key"
        class="bottom-nav-bar__item"
      >
        <component
          :is="item.to ? NuxtLink : 'span'"
          :to="item.to"
          class="bottom-nav-bar__item-link"
          :class="[
            'bottom-nav-bar__item-link--' + item.key,
            { 'bottom-nav-bar__item-link--active': $route.path === item.to }
          ]"
          @click="handleTabClick(item)"
        >
          <component
            :is="item.icon"
            width="24"
            class="bottom-nav-bar__item-icon"
          />

          <div class="bottom-nav-bar__item-label">
            {{ item.label }}
          </div>
        </component>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.bottom-nav-bar {
  $this: '.bottom-nav-bar';

  height: 50px;
  background-color: var(--color-text-beige);
  filter: drop-shadow(0 0 6px rgba(0, 0, 0, 0.15));

  &__list {
    display: flex;
    list-style: none;
    margin: 0 auto;
    padding: 0;
    justify-content: center;
    max-width: 480px;
  }

  &__item {
    display: flex;
    flex: 1;
    align-items: stretch;
    justify-content: center;
  }

  &__item-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 100%;
    cursor: pointer;
    user-select: none;
    color: var(--color-beige-light);
    transition: color 0.3s;

    &--active {
      color: var(--color-pink-dark);
    }

    &--help {
      position: relative;
      top: -26px;
      border-radius: 50%;
      height: 54px;
      width: 54px;
      background-color: var(--color-yellow);
      filter: brightness(110%);
    }

    &--menu {
      color: var(--color-text-brown);
    }
  }

  &__item-icon {
    display: inline-flex;
    width: 24px;
    height: 24px;

    #{$this}__item-link--help & {
      position: relative;
      top: 7px;
      color: var(--color-text-brown);
    }
  }

  &__item-label {
    position: relative;
    font-weight: 700;
    font-size: 10px;

    #{$this}__item-link--help & {
      top: 24px;
      color: var(--color-text-chocolate);
    }
  }
}
</style>
