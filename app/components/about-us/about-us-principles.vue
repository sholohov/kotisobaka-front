<script setup lang="ts">
const items = computed(() => [{
  key: 'professionalism',
  title: 'Профессионализм',
  description: 'Мы сотрудничаем с ветеринарами, кинологами, юристами.',
  icon: defineAsyncComponent(() => import('~/assets/icons/star-icon.svg')),
  color: 'yellow',
}, {
  key: 'daylight',
  title: 'Открытость',
  description: 'Мы публично отчитываемся о каждой полученной копейке и каждом спасенном животном',
  icon: defineAsyncComponent(() => import('~/assets/icons/report-icon.svg')),
  color: 'purple',
}, {
  key: 'systematicity',
  title: 'Системность',
  description: 'Мы решаем проблемы на всех уровнях: от помощи одной собаке до изменения законов',
  icon: defineAsyncComponent(() => import('~/assets/icons/rule-icon.svg')),
  color: 'blue',
}, {
  key: 'solidarity',
  title: 'Солидарность',
  description: 'Мы сотрудничаем с другими зоозащитными организациями',
  icon: defineAsyncComponent(() => import('~/assets/icons/handshake-icon.svg')),
  color: 'pink',
}])
</script>

<template>
  <content-box class="about-us-principles">
    <ul class="about-us-principles__list">
      <li
        v-for="item in items"
        :key="item.key"
        class="about-us-principles__item"
        :class="[
          'about-us-principles__item--' + item.color
        ]"
      >
        <h4 class="about-us-principles__title">
          {{ item.title }}
        </h4>
        <p class="about-us-principles__description">
          {{ item.description }}
        </p>
        <component
          :is="item.icon"
          width="50"
          class="about-us-principles__icon"
        />
      </li>
    </ul>
  </content-box>
</template>

<style lang="scss">
.about-us-principles {
  $this: '.about-us-principles';

  &__list {
    flex-direction: column;
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    gap: 10px;

    @media (min-width: $mq-sm) {
      gap: 20px;
      flex-direction: row;
      flex-wrap: wrap;
    }

    @media (min-width: $mq-lg) {
      flex-wrap: nowrap;
    }
  }

  &__item {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 24px;

    @media (min-width: $mq-sm) {
      width: calc(50% - 10px);
      flex: none;
    }

    @media (min-width: $mq-lg) {
      width: auto;
      flex: 1;
    }

    &--yellow {
      color: var(--color-yellow);
      background-color: var(--color-yellow-light);
    }

    &--purple {
      color: var(--color-purple);
      background-color: var(--color-purple-light);
    }

    &--blue {
      color: var(--color-blue);
      background-color: var(--color-blue-light);
    }

    &--pink {
      color: var(--color-pink);
      background-color: var(--color-pink-light);
    }
  }

  &__title {
    color: var(--color-text-brown);
    font-weight: 800;
    font-size: 22px;
    line-height: 100%;
    margin: 0 0 10px;
  }

  &__description {
    color: var(--color-text-brown);
    font-weight: 400;

    margin: 0 0 30px;
  }

  &__icon {
    width: 80px;
    height: 80px;
    padding: 18px;
    background-color: var(--color-white);
    border-radius: 50%;
    margin: auto 0 0 auto;
  }
}
</style>
