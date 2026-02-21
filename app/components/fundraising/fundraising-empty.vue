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
        <p class="fundraising-empty__description-item fundraising-empty__description-item--center">
          Наш отдел по учёту вкусняшек (в составе трех котов и двух собак) временно ушел в отпуск.
          Прямо сейчас мы ничего не собираем, потому что:
        </p>

        <p class="fundraising-empty__description-item">
          1. У всех миски полные корма (пока!).<br>
          2. Лапы устали печатать по клавиатуре.<br>
          3. Главный бухгалтер, пес Барбос, уснул за отчётом.
        </p>

        <p class="fundraising-empty__description-item fundraising-empty__description-item--center">
          Но если вы настроены решительно и безвозмездно (то есть даром),
          то вы всегда можете задонатить на постоянные расходы: аренду, корм, лекарства.
          А как только усатые экономисты вернуться из отпуска и истребят все запасы — мы сразу дадим знать!
        </p>
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
    max-width: 610px;
  }

  &__title {
    font-weight: 700;
    font-size: 24px;
    line-height: 120%;
    text-transform: uppercase;
    text-align: center;
    margin: 0 0 10px;
  }

  &__icon {
    width: 80%;
    display: flex;
    color: var(--color-pink-dark);
    margin: 0 auto 30px;
    @include imageGradient;
  }

  &__description {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    font-weight: 400;
    margin: 0 0 30px;
    color: var(--color-pink-dark);
  }

  &__description-item {
    &--center {
      text-align: center;
    }
  }

  &__link {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
