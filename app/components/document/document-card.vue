<script setup lang="ts">
import type { OrgDocument } from '~/api/documents/types';

const props = defineProps({
  orgDocument: {
    type: Object as PropType<OrgDocument>,
    required: true,
  },
  color: {
    type: String as PropType<'blue' | 'green' | 'purple'>,
    default: 'blue',
  },
})

const ext = computed(() => {
  return (props.orgDocument.file?.ext || '').replace('.', '')
})

const date = computed(() => {
  return new Date(props.orgDocument.date).toLocaleDateString()
})
</script>

<template>
  <nuxt-link
    class="document-card"
    :class="[
      'document-card--' + color
    ]"
    :to="orgDocument.file?.url"
    target="_blank"
  >
    <div class="document-card__header">
      <div class="document-card__date">
        {{ date }}
      </div>
      <div class="document-card__ext">
        <span class="document-card__ext-text">
          {{ ext }}
        </span>
      </div>
    </div>
    <div class="document-card__description">
      {{ orgDocument.description }}
    </div>
  </nuxt-link>
</template>

<style lang="scss">
.document-card {
  $this: '.document-card';

  height: 290px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  position: relative;
  transition: transform 0.3s, box-shadow 0.3s;

  @include hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.07),
    0 4px 8px rgba(0, 0, 0, 0.035);
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }

  &--blue {
    color: var(--color-blue-dark);
    background-color: var(--color-blue-light);
  }

  &--green {
    color: var(--color-green-dark);
    background-color: var(--color-green-light);
  }

  &--purple {
    color: var(--color-purple-dark);
    background-color: var(--color-purple-light);
  }

  &__date {
    font-weight: 800;
    font-size: 24px;
    line-height: 1;
  }

  &__ext {
    flex: none;
    display: flex;
    flex: none;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    font-size: 18px;
    font-weight: 900;
    text-transform: uppercase;
    background-color: var(--color-white);
    border-radius: 50%;
  }

  &__ext-text {
    transform: scale(0.6, 1);
  }

  &__description {
    font-weight: 700;
    font-size: 20px;

    color: var(--color-text-brown);
  }
}
</style>
