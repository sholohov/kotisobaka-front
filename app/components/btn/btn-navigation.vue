<script setup lang="ts">
import ArrowDownIcon from '~/assets/svg/arrow-down-icon.svg';
import ArrowRightIcon from '~/assets/svg/arrow-right-icon.svg';
import type { ButtonNavigationProps } from '~/types/buttonNavigation';
import { useRoute } from '#imports';
import { NuxtLink } from '#components';

const props = defineProps({
  to: {
    type: String as PropType<ButtonNavigationProps['to']>,
    default: '',
  },
  items: {
    type: Array as PropType<Array<ButtonNavigationProps>>,
    default: () => [],
  },
});

const route = useRoute();

const isCurrentSectionActive = computed(() => {
  if (isActive(props.to)) {
    return true;
  }

  for (const item of props.items) {
    if (isActive(item.to)) {
      return true;
    }

    if (item.items) {
      for (const subItem of item.items) {
        if (isActive(subItem.to)) {
          return true;
        }
      }
    }
  }

  return false;
});

function isActive(path: string): boolean {
  return route.path === path || route.path.startsWith(path + '/');
}
</script>

<template>
  <div class="btn-navigation">
    <div
      class="btn-navigation__btn"
      :class="{ 'btn-navigation__btn--active': isCurrentSectionActive }"
    >
      <nuxt-link :to="to">
        <slot />
      </nuxt-link>

      <arrow-down-icon
        v-if="items.length"
        width="24"
        class="btn-navigation__btn-arrow"
      />
    </div>

    <div
      v-if="items.length"
      class="btn-navigation__dropdown"
    >
      <ul class="btn-navigation__list">
        <li
          v-for="item in items"
          :key="item.key"
          class="btn-navigation__item"
        >
          <component
            :is="to ? NuxtLink : 'span'"
            class="btn-navigation__item-link"
            :to="item.to"
          >
            <span class="btn-navigation__item-text">
              {{ item.label }}
            </span>

            <arrow-right-icon
              v-if="item.items?.length"
              width="24"
              class="btn-navigation__item-icon"
            />
          </component>

          <ul
            v-if="item.items?.length"
            class="btn-navigation__sublist"
          >
            <li
              v-for="subItem in item.items"
              :key="subItem.key"
              class="btn-navigation__subitem"
              :class="{ 'btn-navigation__subitem--active': isActive(subItem.to) }"
            >
              <nuxt-link
                class="btn-navigation__subitem-link"
                :to="subItem.to"
              >
                {{ subItem.label }}
              </nuxt-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
.btn-navigation {
  $this: ".btn-navigation";
  $size: 36px;

  position: relative;
  user-select: none;

  @keyframes arrow-right-move {
    0% { transform: translateX(0); }
    10% { transform: translateX(4px); }
    20% { transform: translateX(-2px); }
    30% { transform: translateX(4px); }
    40% { transform: translateX(0); }
    100% { transform: translateX(0); }
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      #{$this}__btn {
        background-color: var(--color-background-pink);

        &--active {
          background-color: var(--color-pink);
        }
      }

      #{$this}__btn-arrow {
        transform: scale(1, -1);
      }

      #{$this}__dropdown {
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: auto;
      }
    }
  }

  &:not(&:hover) {
    #{$this}__dropdown {
      opacity: 0;
      transform: translateY(-10px) scale(1, 0.9);
      transition: opacity 0.3s, transform 0.3s;
      pointer-events: none;
    }
  }

  &__btn {
    display: flex;
    align-items: center;
    gap: 4px;
    height: $size;
    padding: 0 14px;
    color: var(--color-text-brown);
    border-radius: calc($size / 2);
    background-color: var(--color-text-beige);
    border: 1px solid var(--color-beige-light);
    cursor: pointer;
    transition: background-color 0.3s;
    white-space: nowrap;

    &--active {
      color: var(--color-white);
      background-color: var(--color-pink-dark);

      #{$this}__btn-arrow {
        color: var(--color-white);
      }
    }
  }

  &__btn-arrow {
    margin-right: -6px;
    width: 24px;
    height: 24px;
    transform: scale(1, 1);
    transition: transform 0.3s 0.3s;
    color: var(--color-pink-dark);
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
    padding: 10px 0;
    background-color: var(--color-text-beige);
    border-radius: calc(36px / 2);
    border: 1px solid var(--color-beige-light);
  }

  &__item {
    position: relative;

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        #{$this}__sublist {
          opacity: 1;
          transform: translateX(0);
          pointer-events: auto;
        }
      }
    }
  }

  &__item-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    height: $size;
    padding: 0 14px;
    color: var(--color-text-brown);
    background-color: var(--color-text-beige);
    border-radius: 6px;

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        #{$this}__item-icon {
          animation: arrow-right-move 4s ease-in-out infinite;
        }
      }
    }

    &[href] {
      cursor: pointer;
      transition: background-color 0.3s;

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background-color: var(--color-background-pink);
        }
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
    color: var(--color-pink-dark);
  }

  &__sublist {
    list-style: none;
    margin: 0 0 0 10px;
    position: absolute;
    top: -10px;
    left: 100%;
    opacity: 0;
    transform: translateX(-10px);
    transition: opacity 0.3s, transform 0.3s;
    background-color: var(--color-text-beige);
    border: 1px solid var(--color-beige-light);
    border-radius: calc($size / 2);
    padding: 10px 0;
    pointer-events: none;
    white-space: nowrap;

    &:before {
      content: '';
      position: absolute;
      display: flex;
      inset: 0 100% 0 0;
      width: 10px;
      margin: 0 0 0 -10px;
    }
  }

  &__subitem {
    &--active {
      #{$this}__subitem-link {
        background-color: var(--color-background-pink);
        color: var(--color-text-brown);
      }
    }
  }

  &__subitem-link {
    display: block;
    padding: 0 14px;
    height: $size;
    line-height: $size;
    color: var(--color-text-brown);
    transition: background-color 0.3s;
    border-radius: 6px;

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background-color: var(--color-background-pink);
      }
    }
  }
}
</style>
