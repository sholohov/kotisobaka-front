<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amountTarget: {
    type: Number,
    required: true,
  },
  amountCollected: {
    type: Number,
    required: true,
  },
  segments: {
    type: Number,
    default: 30,
  },
})

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
  <div class="fundraising-card">
    <h2 class="fundraising-card__title">
      {{ title }}
    </h2>
    <p class="fundraising-card__reason">
      {{ description }}
    </p>
    <fundraising-bar
      class="fundraising-card__bar"
      :segments="segments"
      :goal="amountTarget"
      :raised="amountCollected"
    />
    <div class="fundraising-card__actions">
      <btn-default
        class="fundraising-card__btn"
        style="flex: 1"
        color="orange"
        no-border
        @click="handleDonateBtn"
      >
        Хочу помочь
      </btn-default>
      <btn-default
        class="fundraising-card__btn"
        color="orange"
        no-border
        circle
        @click="handleDonateBtn"
      >
        <svg-icon name="piggy-bank-icon" />
      </btn-default>
    </div>
  </div>
</template>

<style lang="scss">
.fundraising-card {
  $this: '.fundraising-card';

  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-orange);
  padding: 20px;
  border-radius: 24px;
  background-color: var(--color-white);

  &__title {
    font-size: 20px;
    font-weight: 700;
    margin: 0 0 10px;
    color: var(--color-orange-dark);
  }

  &__reason {
    font-weight: 400;

    margin: 0 0 14px;
  }

  &__bar {
    padding: 14px 0;
    margin: 0 0 14px;
    border-top: 1px solid var(--color-orange-light);
    border-bottom: 1px solid var(--color-orange-light);
  }

  &__actions {
    display: flex;
    align-items: center;
  }
}
</style>
