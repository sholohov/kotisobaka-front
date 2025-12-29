<script setup lang="ts">
import CloseIcon from '~/assets/svg/close-icon.svg'

defineProps({
  title: {
    type: String,
    required: true,
  },
  width: {
    type: [Number, String],
    default: 600,
  },
})

const modalStore = useModalStore()
const { isMobile, isTablet, isTabletSmall } = useBreakpoint()
const isMobileView = computed(() => (isMobile.value || isTablet.value || isTabletSmall.value))

function handleCloseBtn() {
  modalStore.close()
}
</script>

<template>
  <div class="modal-base">
    <div
      class="modal-base__dialog"
      :style="{ maxWidth: width + 'px' }"
    >
      <header class="modal-base__header">
        <h3 class="modal-base__title">
          {{ title }}
        </h3>
        <button
          class="modal-base__close"
          @click="handleCloseBtn"
        >
          <close-icon
            v-if="!isMobileView"
            width="24"
          />
        </button>
      </header>

      <section class="modal-base__body">
        <slot />
      </section>

      <footer
        class="modal-base__footer"
      >
        <slot name="footer" />
      </footer>
    </div>
  </div>
</template>

<style lang="scss">
.modal-base {
  $this: '.modal-base';

  position: absolute;
  inset: 0;
  display: flex;
  align-items: end;
  justify-content: center;
  pointer-events: none;

  @media (min-width: $breakpoint-lg) {
    padding: 10px;
    align-items: center;
  }

  &__dialog {
    padding: 10px;
    border-radius: 16px 16px 0 0;
    width: 100%;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    pointer-events: auto;
    background-color: var(--color-background-pink);

    @media (min-width: $breakpoint-lg) {
      border-radius: 36px;
      padding: 16px;
    }
  }

  &__header {
    flex: 0 0 auto;
    padding: 0 0 10px;
    position: relative;
    display: flex;
    flex-direction: column;

    @media (min-width: $breakpoint-lg) {
      flex-direction: row;
    }
  }

  &__title {
    display: flex;
    margin: 0;
    flex: 1;
    justify-content: center;
    padding: 0 0 10px;
    font-weight: 800;
    font-size: 20px;
    line-height: 1;
    color: var(--color-dark-pink);
    border-bottom: 1px solid var(--color-white);
    white-space: nowrap;

    @media (min-width: $breakpoint-lg) {
      font-size: 30px;
    }
  }

  &__close {
    flex: none;
    display: flex;
    order: -1;
    justify-content: center;
    cursor: pointer;
    height: 44px;
    border-radius: 4px;
    margin: -2px 0 0;

    &:before {
      content: '';
      display: inline-flex;
      width: 36px;
      height: 4px;
      border-radius: 2px;
      background-color: var(--color-dark-pink);
    }

    @media (min-width: $breakpoint-lg) {
      order: 0;
      color: var(--color-chocolate);
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 1px solid var(--color-chocolate);
      margin: 0 0 0 10px;
      background: none;

      &:before {
        display: none;
      }
    }
  }

  &__body {
    flex: 1 1 auto;
    overflow-y: auto;
  }

  &__footer {
    flex: 0 0 auto;
    padding: 16px 0 0;
    border-top: 1px solid #eee;

    &:empty {
      display: none;
    }
  }
}
</style>
