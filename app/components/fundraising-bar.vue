<script setup lang="ts">
const props = defineProps({
  segments: {
    type: Number,
    default: 30,
  },
  goal: {
    type: Number,
    default: 0,
  },
  raised: {
    type: Number,
    default: 0,
  },
})

const filledSegments = computed(() => {
  const ratio = props.raised / props.goal

  return Math.min(props.segments, Math.round(ratio * props.segments))
})

</script>

<template>
  <div class="fundraising-bar">
    <div class="fundraising-bar__progress">
      <span
        v-for="segment in props.segments"
        :key="segment"
        class="fundraising-bar__segment"
        :class="{ 'fundraising-bar__segment--filled': segment <= filledSegments }"
      />
    </div>

    <div class="fundraising-bar__info">
      <span class="fundraising-bar__info-item">
        {{ props.raised }} BY
      </span>
      <span class="fundraising-bar__info-item">
        {{ props.goal }} BY
      </span>
    </div>
  </div>
</template>

<style lang="scss">
.fundraising-bar {
  display: flex;
  flex-direction: column;
  gap: 14px;

  &__progress {
    display: flex;
    justify-content: space-between;
  }

  &__segment {
    display: flex;
    width: 6px;
    height: 12px;
    background-color: var(--color-background-pink);
    border-radius: 2px;

    &--filled {
      background-color: var(--color-orange);
    }
  }

  &__info {
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: stretch;
    font-size: 16px;
    color: var(--color-text-chocolate);
    font-weight: 400;

    &::after {
      position: absolute;
      content: '';
      width: 2px;
      height: 100%;
      display: flex;
      background-color: var(--color-background-pink);
      inset: 0 0 0 50%;
    }
  }
}
</style>
