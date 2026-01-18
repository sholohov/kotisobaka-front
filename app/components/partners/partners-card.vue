<script setup lang="ts">

import type { PartnerData } from '~/api/partners/types';

defineProps({
  partner: {
    type: Object as PropType<PartnerData>,
    required: true,
  },
})
</script>

<template>
  <div class="partners-card">
    <nuxt-link
      :to="partner.link.url"
      :target="partner.link.target"
      class="partners-card__link"
      :aria-label="`Прейти к новости '${partner.name}'`"
    >
      <img
        :src="partner.logo.url"
        :alt="partner.logo.alternativeText || partner.name"
        class="partners-card__img"
      >
    </nuxt-link>
  </div>
</template>

<style lang="scss">
.partners-card {
  $this: '.partners-card';

  position: relative;
  border-radius: 24px;
  width: 100%;
  border: 2px solid var(--color-green);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-color: var(--color-background-beige);
    transition: background-color 0.3s;
    opacity: 0;
  }

  @include hover {
    &::before {
      opacity: 0.3;
      background-color: var(--color-green-light);
    }
  }

  &__link {
    display: flex;
    height: 138px;
    padding: 32px;
    align-items: center;
    justify-content: center;
  }

  &__img {
    position: relative;
    transition: transform 0.3s;
    z-index: 1;
  }
}
</style>
