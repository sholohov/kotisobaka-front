<script setup lang="ts">
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
      <svg-icon
        name="coin-icon"
        size="9"
        class="btn-donate__coin"
      />

      <svg-icon name="piggy-bank-icon" />
    </btn-default>
  </div>
</template>

<style lang="scss">
.btn-donate {
  $this: '.btn-donate';

  overflow: hidden;

  @include hover {
    #{$this}__coin {
      transform: translateY(0);
    }
  }

  &__btn {
    border-color: var(--color-text-brown);
    color: var(--color-text-brown);
    filter: brightness(110%);
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
