<script setup lang="ts">
import PiggyBankIcon from '~/assets/svg/piggy-bank-icon.svg';
import CoinIcon from '~/assets/svg/coin-icon.svg';

const emit = defineEmits(['click'])
</script>

<template>
  <div class="btn-donate">
    <btn-default
      circle
      color="yellow"
      class="btn-donate__btn"
      @click="emit('click')"
    >
      <coin-icon
        width="9"
        class="btn-donate__coin"
      />

      <piggy-bank-icon
        width="24"
        style="color: var(--color-text-brown)"
      />
    </btn-default>
  </div>
</template>

<style lang="scss">
.btn-donate {
  $this: '.btn-donate';

  overflow: hidden;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      #{$this}__coin {
        transform: translateY(0);
      }
    }
  }

  &__btn {
    border-color: var(--color-text-brown);
  }

  &__coin {
    position: absolute;
    top: -7px;
    left: calc(50% - 3px);
    transition: transform 0.3s;
    transform: translateY(-20px);
  }
}
</style>
