<script setup lang="ts">
const emit = defineEmits(['back'])
</script>

<template>
  <div class="page-not-found">
    <div class="page-not-found__inner">
      <div class="page-not-found__title">
        Страница куда-то сбежала
      </div>
      <img
        src="/img/404-page.svg"
        alt="404-page"
        class="page-not-found__img"
      >
      <btn-default
        class="page-not-found__btn"
        @click="emit('back')"
      >
        Вернуться на главную
      </btn-default>
    </div>
  </div>
</template>

<style lang="scss">
.page-not-found {
  $this: '.page-not-found';

  position: fixed;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--color-purple-light);

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
