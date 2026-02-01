<script setup lang="ts">
</script>

<template>
  <div class="favorites-empty">
    <div class="favorites-empty__inner">
      <svg-icon
        name="cat-in-box-icon"
        class="favorites-empty__icon"
        size="320"
      />

      <div class="favorites-empty__description">
        Нажимайте на сердечко <svg-icon
          name="heart-round-icon"
          size="16"
          style="display: inline-flex"
        /> в карточке понравившегося питомца, чтобы добавить его сюда.
        Так вы сможете  легко вернуться к анкетам.
      </div>

      <div class="favorites-empty__link">
        <btn-default
          to="/animals"
          color="blue"
        >
          Посмотреть питомцев
        </btn-default>
        <btn-default
          to="/animals"
          circle
          color="blue"
        >
          <svg-icon name="arrow-right-icon" />
        </btn-default>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.favorites-empty {
  $this: '.favorites-empty';

  display: flex;
  align-items: center;
  justify-content: center;

  &__inner {
    display: flex;
    flex-direction: column;
    text-align: center;
    max-width: 610px;
  }

  &__icon {
    width: 80%;
    display: flex;
    color: var(--color-pink-dark);
    margin: 0 auto 30px;
    @include imageGradient;
  }

  &__description {
    font-weight: 700;

    margin: 0 0 30px;
    text-align: center;
    color: var(--color-pink-dark);
  }

  &__link {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
