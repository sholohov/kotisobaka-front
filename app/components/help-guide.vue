<script setup lang="ts">
import ArrowRightIcon from '~/assets/svg/arrow-right-icon.svg';

type ItemProps = {
  icon: Component
  color: string
  title: string
  description: string[]
  motivation: string
  link: string
}

const items: ItemProps[] = [
  {
    icon: defineAsyncComponent(() => import('~/assets/svg/help-guide/cat-in-box.svg')),
    color: 'green',
    title: 'Взять питомца',
    description: [
      `Вы не просто выбираете питомца — вы спасаете жизнь. За каждым из этих глаз стоит история, часто — с горьким прошлым.
      Но именно вы можете стать для него супергероем, который подарит новую, счастливую главу.`,
    ],
    motivation: 'Станьте героем для того, кто в вас нуждается',
    link: '/animals',
  },
  {
    icon: defineAsyncComponent(() => import('~/assets/svg/help-guide/dog-in-cap.svg')),
    color: 'pink',
    title: 'Стать волонтёром',
    description: [
      'Ваше время — это бесценный ресурс, который может подарить животному надежду.',
      `Вы можете выгулять собаку, подарив ей несколько часов радости,
      приласкать кошку, чтобы она снова научилась доверять.`,
    ],
    motivation: 'Подарите своё время и заботу',
    link: '/help/volunteer/become',
  },
  {
    icon: defineAsyncComponent(() => import('~/assets/svg/help-guide/cat-read-book.svg')),
    color: 'yellow',
    title: 'Финансовая помощь',
    description: [
      `Мы не государственная организация и существуем только благодаря вашей поддержке.
      Каждый рубль — это реальная помощь: это миска корма для ослабленного щенка, жизненно важная прививка или теплая подстилка. `,
    ],
    motivation: 'Любая сумма спасёт чью-то жизнь',
    link: '/help/donate/finance',
  },
  {
    icon: defineAsyncComponent(() => import('~/assets/svg/help-guide/cat-in-a-plate.svg')),
    color: 'purple',
    title: 'Временный дом',
    description: [
      `Передержка — это временный дом для животного, где оно может оправиться от болезни,
      вырастить щенков или котят в тепле и уюте или просто научиться доверять людям в спокойной домашней атмосфере.`,
    ],
    motivation: 'Тёплый приют — шаг к постоянному счастью',
    link: '/help/volunteer/foster',
  },
  {
    icon: defineAsyncComponent(() => import('~/assets/svg/help-guide/dog-and-butterfly.svg')),
    color: 'blue',
    title: 'Помощь словом',
    description: [
      `Вы можете помочь, даже если у вас нет ни времени, ни денег.
      Ваша лента в соцсетях — это мощный инструмент спасения.`,
      'Ваш репост может случайно увидеть их будущий хозяин. Помогите нам быть услышанными.',
    ],
    motivation: 'Поделитесь историей — подарите шанс',
    link: '/help/other/info',
  },
]

const { isDesktop } = useBreakpoint()
</script>

<template>
  <div class="help-guide">
    <content-box>
      <ul class="help-guide__list">
        <li
          v-for="item in items"
          :key="item.color"
          class="help-guide__item"
          :class="`help-guide__item--${item.color}`"
        >
          <div class="help-guide__header">
            <component
              :is="item.icon"
              class="help-guide__icon"
            />
            <h3 class="help-guide__title">
              {{ item.title }}
            </h3>
          </div>
          <div
            v-if="isDesktop"
            class="help-guide__description"
          >
            <p
              v-for="(paragraph, index) in item.description"
              :key="index"
              class="help-guide__paragraph"
            >
              {{ paragraph }}
            </p>
          </div>
          <div class="help-guide__footer">
            <p class="help-guide__motivation">
              {{ item.motivation }}
            </p>
            <btn-default
              :to="item.link"
              circle
              class="help-guide__link"
            >
              <arrow-right-icon width="24" />
            </btn-default>
          </div>
        </li>
      </ul>
    </content-box>
  </div>
</template>

<style lang="scss">
.help-guide {
  $this: ".help-guide";

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;

    @media (min-width: $mq-lg) {
      gap: 20px;
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 16px;
    border-radius: 24px;

    @media (min-width: $mq-sm) {
      flex-direction: row;
      align-items: stretch;
    }

    @media (min-width: $mq-lg) {
      padding: 30px;
    }

    &--green {
      color: var(--color-green-dark);
      background-color: var(--color-green-light);
    }

    &--pink {
      color: var(--color-pink-dark);
      background-color: var(--color-pink-light);
    }

    &--yellow {
      color: var(--color-yellow-dark);
      background-color: var(--color-yellow-light);
    }

    &--purple {
      color: var(--color-purple-dark);
      background-color: var(--color-purple-light);
    }

    &--blue {
      color: var(--color-blue-dark);
      background-color: var(--color-blue-light);
    }
  }

  &__header {
    position: relative;
    display: flex;
    gap: 10px;
    padding: 0 0 16px;
    margin: 0 0 16px;
    align-items: center;

    &::after {
      content: '';
      position: absolute;
      display: flex;
      inset: auto 0 0 0;
      height: 2px;
      background-color: currentColor;
      opacity: 0.5;
    }

    @media (min-width: $mq-sm) {
      flex-direction: row;
      flex: 0 0 50%;
      margin: 0 16px 0 0;
      padding: 0 16px 0 0;

      &::after {
        height: auto;
        width: 2px;
        inset: 0 0 0 auto;
      }
    }

    @media (min-width: $mq-lg) {
      margin: 0 30px 0 0;
      padding: 0 30px 0 0;
    }

    @media (min-width: $mq-xl) {
      flex: 0 0 450px;
    }
  }

  &__icon {
    display: flex;
    flex: none;
    height: 60px;
    width: 60px;
    margin: 0 10px 0 0;
    align-items: center;
    justify-content: center;
    fill: currentColor;
    mask-image: linear-gradient(
        to top,
        rgba(0, 0, 0, 1) 0%,
        rgba(0, 0, 0, 0.3) 100%);

    filter: brightness(60%);

    @media (min-width: $mq-lg) {
      height: 80px;
      width: 80px;
    }

    @media (min-width: $mq-xl) {
      height: 100px;
      width: 100px;
      margin: 0 20px 0 0;
    }
  }

  &__title {
    display: flex;
    font-size: 30px;
    font-weight: 800;

    text-transform: uppercase;

    @media (min-width: $mq-sm) {
      max-width: 220px;
    }

    @media (min-width: $mq-lg) {
      font-size: 36px;
      max-width: none;
    }
  }

  &__description {
    position: relative;
    display: flex;
    flex-direction: column;
    font-size: 16px;

    font-weight: 400;
    padding: 0 30px 0 0;
    margin: 0 30px 0 0;
    color: var(--color-text-brown);
    opacity: 0.7;

    &::after {
      content: '';
      position: absolute;
      display: flex;
      width: 2px;
      inset: 0 0 0 auto;
      background-color: currentColor;
      opacity: 0.3;
    }
  }

  &__paragraph {
    margin: 0 0 0.5em;
  }

  &__footer {
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: space-between;
    flex: 1;

    @media (min-width: $mq-xl) {
      align-items: flex-start;
      flex: 0 0 420px;
    }
  }

  &__motivation {
    font-size: 20px;
    font-weight: 700;

    text-transform: uppercase;

    @media (min-width: $mq-lg) {
      font-size: 24px;
    }
  }

  &__link {
    color: currentColor;
    display: flex;
    align-items: center;

    @media (min-width: $mq-xl) {

      align-self: flex-start;
    }
  }
}
</style>
