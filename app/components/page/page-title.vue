<script setup lang="ts">
const route = useRoute()

const icons: Record<string, { color: string, component: Component }> = {
  animals: {
    color: 'var(--color-pink)',
    component: defineAsyncComponent(() => import('~/assets/svg/page-title/cat-an-dog.svg')),
  },
}

const title = computed(() => route.meta.pageTitle ?? '')
const icon = computed(() => icons[route.meta.pageTitleIcon ?? ''])
</script>

<template>
  <content-box
    v-if="title && icon"
    class="page-title"
  >
    <div class="page-title__inner">
      <div class="page-title__icon-wrapper">
        <component
          :is="icon.component"
          class="page-title__icon"
        />
      </div>
      <div class="page-title__title">
        {{ title }}
      </div>
    </div>
  </content-box>
</template>

<style lang="scss">
.page-title {
  $this: '.page-title';

  margin: 60px 0;

  @media (min-width: $mq-sm) {
    margin: 80px 0;
  }

  @media (min-width: $mq-md) {
    margin: 110px 0;
  }

  @media (min-width: $mq-lg) {
    margin: 130px 0;
  }

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;

    @media (min-width: $mq-sm) {
      flex-direction: row;
    }

    @media (min-width: $mq-md) {
      gap: 20px;
    }

    @media (min-width: $mq-lg) {
      gap: 40px;
    }
  }

  &__icon-wrapper {
    position: relative;
    padding: 8px;
    width: 100px;
    height: 100px;
    border-radius: 24px;
    overflow: hidden;
    color: v-bind('icon?.color');

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background-color: v-bind('icon?.color');
      opacity: 0.6;
    }

    @media (min-width: $mq-md) {
      padding: 12px;
      width: 160px;
      height: 160px;
    }

    @media (min-width: $mq-lg) {
      padding: 14px;
      width: 200px;
      height: 200px;
    }
  }

  &__icon {
    position: relative;
    width: 100%;
    height: auto;
    filter: brightness(0.4) saturate(150%);
    mask-image: linear-gradient(
        145deg,
        rgba(0, 0, 0, 0.5) 15%,
        rgba(0, 0, 0, 1) 75%);
  }

  &__title {
    text-align: center;
    font-size: 45px;
    font-weight: 900;
    color: var(--color-pink-dark);
    text-transform: uppercase;
    line-height: 1;
    max-width: 320px;

    @media (min-width: $mq-sm) {
      text-align: left;
    }

    @media (min-width: $mq-md) {
      text-align: left;
      font-size: 70px;
      max-width: 450px;
    }

    @media (min-width: $mq-lg) {
      font-size: 100px;
      max-width: 700px;
    }
  }
}
</style>
