<script setup lang="ts">
const route = useRoute()
const { navigation } = useAppConfig()

const icons: Record<string, { color: string, component: Component }> = {
  animals: {
    color: 'var(--color-pink)',
    component: defineAsyncComponent(() => import('~/assets/svg/page-title/cat-an-dog.svg')),
  },
}

const title = computed(() => {
  const found = navigation.find(i => i.key === route.name)

  return found?.label ?? ''
})

const icon = computed(() => icons[String(route.name)])
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

  margin: 60px 0 0;

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__icon-wrapper {
    position: relative;
    padding: 8px;
    width: 88px;
    height: 88px;
    margin: 0 0 10px;
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
  }
}
</style>
