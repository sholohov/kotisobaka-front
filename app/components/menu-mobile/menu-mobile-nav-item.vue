<script setup lang="ts">
import { NuxtLink } from '#components'
import ArrowDownIcon from "~/assets/svg/arrow-down.svg";
import type { ButtonNavigationProps } from "~/types/buttonNavigation";
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
    type: Array as PropType<Array<ButtonNavigationProps>>,
    default: () => [],
  },
});

const isOpen = ref(false);
const accordionRef = ref<HTMLElement | null>(null);
const activeSubKey = ref<string | null>(null)

const itemsWithMainSection = computed((): ButtonNavigationProps[] => {
  return [
    { to: props.to, label: props.label, key: String(props.to) },
    ...props.items,
  ]
})

function toggleAccordion() {
  if (!props.items.length) {
    return
  }

  if (isOpen.value) {
    isOpen.value = false
    activeSubKey.value = null
  } else {
    isOpen.value = true
  }
}

function closeAccordion() {
  isOpen.value = false;
  activeSubKey.value = null;
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

function toggleSub(key: string) {
  if (activeSubKey.value === key) {
    activeSubKey.value = null
  } else {
    activeSubKey.value = key
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

<template>
  <div
    ref="accordionRef"
    class="menu-mobile-nav-item"
    :class="{
      'menu-mobile-nav-item--expanded': isOpen && items.length
    }"
  >
    <button
      v-if="props.items?.length"
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

      <nuxt-link
        v-else
        :to="to"
      >
        <span class="menu-mobile-nav-item__btn-text">
          {{ label }}
        </span>
      </nuxt-link>
    </button>

    <ul
      v-if="items.length"
      class="menu-mobile-nav-item__list"
      :class="{
        'menu-mobile-nav-item__list--active': isOpen
      }"
    >
      <li
        v-for="item in itemsWithMainSection"
        :key="item.key"
        class="menu-mobile-nav-item__item"
      >
        <button
          v-if="item.items?.length"
          class="menu-mobile-nav-item__item-btn"
          :class="[
            { 'menu-mobile-nav-item__item-btn--active': activeSubKey === item.key }
          ]"
          @click="toggleSub(item.key)"
        >
          <span class="menu-mobile-nav-item__item-btn-text">{{ item.label }}</span>
          <arrow-down-icon
            width="24"
            class="menu-mobile-nav-item__item-btn-icon"
            :class="[
              { 'menu-mobile-nav-item__item-btn-icon--active': activeSubKey === item.key }
            ]"
          />
        </button>

        <nuxt-link
          v-else
          class="menu-mobile-nav-item__item-btn"
          :to="item.to"
          @click="closeAccordion"
        >
          <span class="menu-mobile-nav-item__item-btn-text">{{ item.label }}</span>
        </nuxt-link>

        <ul
          v-if="item.items?.length"
          class="menu-mobile-nav-item__sublist"
          :class="{ 'menu-mobile-nav-item__sublist--active': activeSubKey === item.key }"
        >
          <li class="menu-mobile-nav-item__subitem">
            <nuxt-link
              class="menu-mobile-nav-item__subitem-link"
              :to="item.to"
              @click="closeAccordion"
            >
              {{ item.label }}
            </nuxt-link>
          </li>

          <li
            v-for="subItem in item.items"
            :key="subItem.key"
            class="menu-mobile-nav-item__subitem"
          >
            <nuxt-link
              class="menu-mobile-nav-item__subitem-link"
              :to="subItem.to"
              @click="closeAccordion"
            >
              {{ subItem.label }}
            </nuxt-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.menu-mobile-nav-item {
  $this: ".menu-mobile-nav-item";
  $size: 44px;
  $duration: 1s;

  background-color: var(--color-dark-pink);
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
    transition: transform $duration;
    transform: scale(1, 1);

    &--active {
      transform: scale(1, -1);
    }
  }

  &__btn-text {
    font-weight: 700;
  }

  &__list {
    list-style: none;
    margin: 0;
    height: 100%;
    max-height: 0;
    overflow: hidden;
    transition: border-color $duration, max-height $duration;
    padding: 0 0 0 16px;
    border-left: 2px solid rgba(255, 255, 255, 0);

    &--active {
      max-height: 1000px;
      border-left: 2px solid rgba(255, 255, 255, 0.3);
    }
  }

  &__item-btn {
    width: 100%;
    position: relative;
    display: flex;
    height: $size;
    align-items: center;
    justify-content: space-between;
    text-decoration: none;
    color: inherit;

    &--active {
      font-weight: 700;
    }
  }

  &__item-arrow {
    transition: transform $duration;
    transform: scale(1, 1);

    &--active {
      transform: scale(1, -1);
    }
  }

  &__sublist {
    max-height: 0;
    overflow: hidden;
    transition:  border-color $duration, max-height $duration;
    padding: 0 0 0 16px;
    list-style: none;
    border-left: 2px solid rgba(255, 255, 255, 0);

    &--active {
      max-height: 500px;
      border-left: 2px solid rgba(255, 255, 255, 0.3);
    }
  }

  &__subitem-link {
    width: 100%;
    position: relative;
    display: flex;
    height: $size;
    align-items: center;
    justify-content: space-between;
    text-decoration: none;
    color: inherit;
  }
}
</style>
