<script setup lang="ts">
import CatAndDogOnVacation from '@/assets/svg/fundraising/cat-and-dog-on-vacation.svg'
const modalStore = useModalStore()
const { isMobileView } = useBreakpoint()

function handleDonateBtn() {
  if (isMobileView.value) {
    modalStore.open('donate-with-guide')
  } else {
    modalStore.open('donate-with-qr')
  }
}
</script>

<template>
  <div class="fundraising-empty">
    <div class="fundraising-empty__inner">
      <cat-and-dog-on-vacation
        class="fundraising-empty__icon"
      />

      <h2 class="fundraising-empty__title">
        — А где сбор?<br>
        — А его нет!
      </h2>

      <div class="fundraising-empty__description">
        Нажимайте на сердечко в карточке понравившегося питомца, чтобы добавить его сюда.
        Так вы сможете  легко вернуться к анкетам.
      </div>

      <div class="fundraising-empty__link">
        <btn-default
          color="blue"
          @click="handleDonateBtn"
        >
          Помочь сейчас
        </btn-default>
        <btn-default
          circle
          color="blue"
          @click="handleDonateBtn"
        >
          <svg-icon name="piggy-bank-icon" />
        </btn-default>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.fundraising-empty {
  $this: '.fundraising-empty';

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
    height: 320px;
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
