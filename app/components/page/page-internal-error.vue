<script setup lang="ts">
const emit = defineEmits(['back'])
</script>

<template>
  <div class="page-internal-error">
    <div class="page-internal-error__inner">
      <div class="page-internal-error__title">
        Упс! Что-то пошло не так...
      </div>
      <img
        src="/img/500-error.svg"
        alt="500-error"
        class="page-internal-error__img"
      >
      <btn-default
        class="page-internal-error__btn"
        @click="emit('back')"
      >
        Вернуться на главную
      </btn-default>
    </div>
  </div>
</template>

<style lang="scss">
.page-internal-error {
  $this: '.page-internal-error';

  position: fixed;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--color-orange);

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__title {
    font-weight: 800;
    font-size: 30px;
    margin:  0 0 50px;
    text-align: center;
  }

  &__img {
    max-height: 65vh;
    max-width: 80vw;
    margin: 0 0 20px;
  }

  &__btn {

  }

}
</style>
