<script setup lang="ts">
</script>
<template>
  <content-box class="chat-desktop">
    <div class="chat-desktop__inner">
      <nuxt-link
        class="chat-desktop__btn"
        target="_blank"
        to="https://t.me/kot_i_sobaka_bot"
      >
        <svg-icon
          size="40"
          name="telegram-icon"
        />
      </nuxt-link>
    </div>
  </content-box>
</template>

<style lang="scss">
.chat-desktop {
  $this: '.chat-desktop';

  &__inner {
    display: flex;
    justify-content: flex-end;
  }

  &__btn {
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    color: var(--color-white);
    background-color: var(--color-purple);
    box-shadow:
      0 2px 4px rgba(0, 0, 0, 0.15),
      0 4px 8px rgba(0, 0, 0, 0.3);
    transition: background-color 0.3s, transform 0.1s;

    @include hover {
      background-color: var(--color-purple-dark);
    }

    &:active {
      transform: scale(0.97);
    }
  }
}
</style>
