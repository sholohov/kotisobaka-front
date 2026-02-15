<script setup lang="ts">
import DogAndCatDevelopers from '~/assets/svg/dog-and-cat-developers.svg';

</script>

<template>
  <div class="page-maintenance">
    <div class="page-maintenance__inner">
      <component
        :is="DogAndCatDevelopers"
        class="page-maintenance__img"
      />
      <h2 class="page-maintenance__title">
        Раздел на передержке у разработчиков
      </h2>
      <div class="page-maintenance__description">
        Пока команда IT-волонтёров трудится над этой страницей, вы можете погулять по сайту.
        Возможно на странице наших хвостиков вы найдёте себе друга для вечерних мурчаний или утренних пробежек за мячиком.
      </div>
      <div class="page-maintenance__btn">
        <btn-default
          color="blue"
          to="/animals"
        >
          Наши хвостики
        </btn-default>
        <btn-default
          circle
          color="blue"
          to="/animals"
        >
          <svg-icon name="arrow-right-icon" />
        </btn-default>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.page-maintenance {
  $this: '.page-maintenance';

  &__inner {
    max-width: 720px;
  }

  &__img {
    display: flex;
    width: 80%;
    height: auto;
    margin: 0 auto 30px;
  }

  &__title {
    display: flex;
    justify-content: center;
    text-align: center;
    font-weight: 700;
    font-size: 24px;
    line-height: 120%;
    text-transform: uppercase;
    margin: 0 0 10px;
    color: var(--color-text-brown);
  }

  &__description {
    display: flex;
    font-weight: 400;
    text-align: center;
    justify-content: center;
    margin: 0 0 30px;
    color: var(--color-text-chocolate);
  }

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
