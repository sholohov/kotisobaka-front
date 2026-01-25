<script setup lang="ts">
import type { PartnerData } from '~/api/partners/types';
import PawIcon from '~/assets/svg/paw-icon.svg';

defineProps({
  partners: {
    type: Array as PropType<PartnerData[]>,
    required: true,
  },
})
</script>

<template>
  <div class="partners-slider">
    <content-box>
      <common-slider
        class="partners-slider__slider"
        :items="partners"
      >
        <template #default="{ slide }">
          <partners-card :partner="slide" />
        </template>
      </common-slider>

      <div class="partners-slider__link">
        <btn-default
          to="/help/other/partner"
          color="green"
          style="width: 240px"
        >
          Стать партнёром
        </btn-default>
        <btn-default
          to="/help/other/partner"
          color="green"
          circle
        >
          <paw-icon width="24" />
        </btn-default>
      </div>
    </content-box>
  </div>
</template>

<style lang="scss">
.partners-slider {
  $this: '.partners-slider';

  &__slider {
    margin: 0 0 20px;
  }

  &__link {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
