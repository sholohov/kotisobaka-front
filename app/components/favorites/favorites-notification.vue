<script setup lang="ts">
const isConfirmed = useCookie<boolean>('favorites_notice_confirmed', {
  default: () => false,
  maxAge: 30 * 24 * 60 * 60, // 30 дней
})

function closeNotification() {
  isConfirmed.value = true
}
</script>

<template>
  <content-box
    class="favorites-notice"
    inner-class="favorites-notice__inner"
  >
    <transition name="favorites-notice__card-">
      <div
        v-if="!isConfirmed"
        class="favorites-notice__card"
      >
        <div class="favorites-notice__header">
          <strong class="favorites-notice__title">Внимание!</strong>
          <btn-default
            class="favorites-notice__close"
            circle
            @click="closeNotification"
          >
            <svg-icon
              name="close-icon"
              class="favorites-notice__close-icon"
            />
          </btn-default>
        </div>
        <p class="favorites-notice__text">
          Ваш список избранного хранится локально, только в этом браузере на этом устройстве.
          Он недоступен с других устройств и будет удален при очистке данных браузера.
        </p>
      </div>
    </transition>
  </content-box>
</template>

<style lang="scss">
.favorites-notice {
  $this: '.favorites-notice';

  position: fixed;
  inset: 80px 0 auto 0;
  pointer-events: none;
  z-index: 1;

  &__inner {
    position: relative;
  }

  &__card {
    margin: 0 0 0 auto;
    pointer-events: auto;
    max-width: 500px;
    padding: 20px;
    border-radius: 24px;
    background-color: var(--color-white);
    color: var(--color-orange);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.07), 0 4px 8px rgba(0, 0, 0, 0.035);

    &--enter-active,
    &--leave-active {
      transition: opacity 0.3s, transform 0.3s;
    }

    &--enter-from,
    &--leave-to {
      opacity: 0;
      transform: translateY(-30px);
    }
  }

  &__title {
    font-weight: 800;
    font-size: 24px;
    line-height: 1;
    margin: 0 0 20px;
  }

  &__text {
    margin: 0;
    font-weight: 700;
    font-size: 18px;

  }

  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__close {
    margin: -10px -10px 0 0;
    color: var(--color-orange);
  }
}

</style>
