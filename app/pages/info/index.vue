<script setup lang="ts">
import type { InfoSectionItem } from '~/types/infoSection';
import { defineAsyncComponent } from 'vue'

const sections: InfoSectionItem[] = [
  {
    key: 'info',
    title: 'ИНФОРМАЦИЯ',
    subtitle:
      'Дом начинается с понимания и превращается в историю дружбы, заботы и настоящего тепла',
    description:
      'Раздел «Информация» расскажет, как забрать питомца и пройти процесс усыновления, как поддержать приют своими руками и где найти ответы на самые популярные вопросы. Всё, чтобы сделать первый шаг навстречу новым друзьям.',
    sectionIcon: defineAsyncComponent(() => import('~/assets/svg/info/cat-read-book.svg')),
    cardIcon: defineAsyncComponent(() => import('~/assets/icons/info-icon.svg')),
    color: 'blue',
    cards: [
      {
        key: 'how-to-adopt',
        position: 1,
        title: 'Как забрать питомца?',
        description:
          'Дает нам свободу оперативно реагировать на нужды: закупать корм, оплачивать счета от ветеринаров и поддерживать ежедневную работу приюта.',
        buttonText: 'Подробнее',
        buttonLink: '/info/adopt',
      },
      {
        key: 'hands-on-help',
        position: 3,
        title: 'Помощь своими руками',
        description:
          'Это возможность купить для подопечных именно то, что им нужно в данный момент. Вы можете выбрать конкретный товар из нашего списка, и он будет доставлен прямо к нам.',
        buttonText: 'Подробнее',
        buttonLink: '/info/diy',
      },
      {
        key: 'faq',
        position: 4,
        title: 'Часто задаваемые вопросы',
        description:
          'Это возможность купить для подопечных именно то, что им нужно в данный момент. Вы можете выбрать конкретный товар из нашего списка, и он будет доставлен прямо к нам.',
        buttonText: 'Подробнее',
        buttonLink: '/info/faq',
      },
    ],
  },
]

</script>

<template>
  <div class="info-page">
    <div
      v-for="section in sections"
      :key="section.key"
      class="info-page__section"
    >
      <info-section :section="section" />
    </div>
  </div>
</template>

<style lang="scss">
.info-page {
  $this: '.info-page';

  padding: 100px 0 0;

  @media (min-width: $mq-sm) {
    padding: 100px 0 0;
  }

  @media (min-width: $mq-md) {
    padding: 120px 0 0;
  }

  @media (min-width: $mq-lg) {
    padding: 140px 0 0;
  }

  &__section {
    margin: 0 0 60px;

    @media (min-width: $mq-sm) {
      margin: 0 0 80px;
    }

    @media (min-width: $mq-lg) {
      margin: 0 0 120px;
    }
  }
}
</style>
