<template>
  <div class="button-navigation">
    <div class="button-navigation__btn">
      <nuxt-link :to="to">
        <slot />
      </nuxt-link>

      <arrow-down-icon
        v-if="items.length"
        class="button-navigation__btn-arrow"
      />
    </div>

    <div
      v-if="items.length"
      class="button-navigation__dropdown"
    >
      <ul class="button-navigation__list">
        <li
          v-for="item in items"
          :key="item.key"
          class="button-navigation__item"
        >
          <nuxt-link
            class="button-navigation__item-link"
            :to="item.to"
          >
            <span class="button-navigation__item-text">
              {{ item.label }}
            </span>

            <arrow-right-icon
              class="button-navigation__item-icon"
            />
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import ArrowDownIcon from "~/assets/svg/arrow-down.svg";
import ArrowRightIcon from "~/assets/svg/arrow-right.svg";
import type { ButtonNavigationItemProps, ButtonNavigationProps } from "~/types/buttonNavigation";

defineProps({
  to: {
    type: String as PropType<ButtonNavigationProps['to']>,
    default: '',
  },
  items: {
    type: Array as PropType<Array<ButtonNavigationItemProps>>,
    default: () => [],
  },
})
</script>

<style lang="scss">
.button-navigation {
  $this: ".button-navigation";
  $size: 36px;

  position: relative;

  @keyframes arrow-right-move {
    0% {
      transform: translateX(0);
    }
    10% {
      transform: translateX(4px);
    }
    20% {
      transform: translateX(-2px);
    }
    30% {
      transform: translateX(4px);
    }
    40% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(0);
    }
  }


  &:hover {
    #{$this}__btn {
      background-color: var(--color-pink-lighten);
    }

    #{$this}__btn-arrow {
      transform: scale(1, -1);
    }

    #{$this}__dropdown {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  &:not(&:hover) {
    #{$this}__dropdown {
      opacity: 0;
      transform: translateY(-10px) scale(1, 0.9);
      transition: opacity 0.3s, transform 0.3s;
    }
  }

  &:active {
    border-color: var(--color-brown-darkest);
    color: var(--color-brown-darkest);
  }

  &__btn {
    display: flex;
    align-items: center;
    gap: 4px;
    height: $size;
    padding: 0 14px;
    color: var(--color-text);
    border-radius: calc($size / 2);
    background-color: var(--color-white-darken);
    border: 1px solid var(--color-orange-lighten);
    cursor: pointer;
    transition: background-color 0.3s;
    white-space: nowrap;
  }

  &__btn-arrow {
    margin-right: -6px;
    width: 24px;
    height: 24px;
    transform: scale(1, 1);
    transition: transform 0.3s 0.3s;
    color: var(--color-red-darken);
  }

  &__dropdown {
    padding: 12px 0 0;
    position: absolute;
    top: 100%;
    left: 0;
    opacity: 0;
    transform-origin: top;
    transition: opacity 0.3s 0.3s, transform 0.3s 0.3s;
  }

  &__list {
    list-style: none;
    margin: 0;
    overflow: hidden;
    padding: 10px 0;
    background-color: var(--color-white-darken);
    border-radius: calc(36px / 2);
    border: 1px solid var(--color-orange-lighten);
  }

  &__item-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    height: $size;
    padding: 0 14px;
    color: var(--color-text);
    background-color: var(--color-white-darken);
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: var(--color-pink-lighten);

      #{$this}__item-icon {
        animation: arrow-right-move 4s ease-in-out infinite;
      }
    }
  }

  &__item-text {
    display: flex;
    white-space: nowrap;
  }

  &__item-icon {
    display: inline-flex;
    flex: 0 0 24px;
    width: 24px;
    height: 24px;
    margin-right: -6px;
    color: var(--color-red-darken);
  }
}
</style>
