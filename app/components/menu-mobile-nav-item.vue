<template>
  <div
    ref="accordionRef"
    class="menu-mobile-nav-item"
    :class="{
      'menu-mobile-nav-item--expanded': isOpen && items.length
    }"
  >
    <component
      :is="props.items?.length ? 'button' : NuxtLink"
      :to="to"
      class="menu-mobile-nav-item__btn"
      :class="{
        'menu-mobile-nav-item__btn--active': isOpen
      }"
      @click="toggleAccordion"
    >
      <span class="menu-mobile-nav-item__btn-text">
        {{ label }}
      </span>

      <arrow-down-icon
        v-if="items.length"
        width="24"
        class="menu-mobile-nav-item__btn-arrow"
        :class="{
          'menu-mobile-nav-item__btn-arrow--active': isOpen
        }"
      />
    </component>

    <div
      v-if="items.length"
      class="menu-mobile-nav-item__dropdown"
      :class="{
        'menu-mobile-nav-item__dropdown--active': isOpen
      }"
    >
      <ul class="menu-mobile-nav-item__list">
        <li
          v-for="item in itemsWithMainSection"
          :key="item.key"
          class="menu-mobile-nav-item__item"
        >
          <nuxt-link
            class="menu-mobile-nav-item__item-link"
            :to="item.to"
            @click="closeAccordion"
          >
            <span class="menu-mobile-nav-item__item-text">
              {{ item.label }}
            </span>
            <arrow-right-icon
              width="24"
              class="menu-mobile-nav-item__item-icon"
            />
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'
import ArrowDownIcon from "~/assets/svg/arrow-down.svg";
import ArrowRightIcon from "~/assets/svg/arrow-right.svg";
import type { ButtonNavigationItemProps, ButtonNavigationProps } from "~/types/buttonNavigation";
import { onMounted, onUnmounted } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  to: {
    type: String as PropType<ButtonNavigationProps['to']>,
    default: '',
  },
  items: {
    type: Array as PropType<Array<ButtonNavigationItemProps>>,
    default: () => [],
  },
});

const isOpen = ref(false);
const accordionRef = ref<HTMLElement | null>(null);

const itemsWithMainSection = computed((): ButtonNavigationItemProps[] => {
  return [
    { to: props.to, label: props.label, key: String(props.to) },
    ...props.items,
  ]
})

function toggleAccordion() {
  if (props.items.length) {
    isOpen.value = !isOpen.value;
  }
}

function closeAccordion() {
  isOpen.value = false;
}

function handleClickOutside(event: MouseEvent) {
  if (accordionRef.value && !accordionRef.value.contains(event.target as Node)) {
    closeAccordion();
  }
}

function handleTouchOutside(event: TouchEvent) {
  if (accordionRef.value && !accordionRef.value.contains(event.target as Node)) {
    closeAccordion();
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  document.addEventListener('touchstart', handleTouchOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  document.removeEventListener('touchstart', handleTouchOutside);
});
</script>

<style lang="scss">
.menu-mobile-nav-item {
  $this: ".menu-mobile-nav-item";
  $size: 44px;

  background-color: var(--color-red-darken);
  color: var(--color-white);

  &__btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: $size;
    color: inherit;
    width: 100%;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    font-family: inherit;
    font-size: inherit;
    text-align: left;
    text-decoration: none;
  }

  &__btn-arrow {
    transition: transform 0.5s;
    transform: scale(1, 1);

    &--active {
      transform: scale(1, -1);
    }
  }

  &__btn-text {
    font-weight: 700;
  }

  &__dropdown {
    height: 100%;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    padding: 0 0 4px;
    border-bottom: 1px solid rgba(255, 255, 255, 0);

    &--active {
      max-height: 1000px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    }
  }

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  &__item-link {
    position: relative;
    display: flex;
    height: $size;
    align-items: center;
    justify-content: space-between;
    padding: 0 0 0 22px;
    text-decoration: none;
    color: inherit;

    &:before {
      content: '';
      display: flex;
      position: absolute;
      left: 10px;
      top: calc(50% + -2px);
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: currentColor;
    }

    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
