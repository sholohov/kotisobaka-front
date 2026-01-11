<script setup lang="ts">
import type { InfoSectionItem } from '~/types/infoSection';

const sections: InfoSectionItem[] = [
  {
    key: 'material-help',
    title: 'Материальная помощь',
    subtitle: 'Любая сумма или нужная вещь — это реальный вклад в комфорт и здоровье животных.',
    description:
      'Финансовая поддержка и адресные пожертвования позволяют нам планировать работу и обеспечивать каждому подопечному качественный уход, питание и необходимое лечение. Вы можете выбрать наиболее удобный для себя формат.',
    sectionIcon: defineAsyncComponent(() => import('~/assets/svg/help/cat-an-pig.svg')),
    cardIcon: defineAsyncComponent(() => import('~/assets/svg/piggy-bank-icon.svg')),
    color: 'green',
    cards: [
      {
        key: 'donations',
        position: 1,
        title: 'Финансовые пожертвования',
        description:
          'Дают нам свободу планирования расходов на нужды: закупать корм, оплачивать счета от ветеринаров и поддерживать ежедневную работу приюта.',
        buttonText: 'Помочь',
        buttonLink: '/help/donate/finance',
      },
      {
        key: 'wishlist',
        position: 2,
        title: 'Корзина желаний',
        description:
          'Это список вещей, которые нам необходимы именно сейчас. Вы можете выбрать любой товар из списка, оплатить его, и он будет доставлен прямо к нам.',
        buttonText: 'Выбрать товар',
        buttonLink: '/help/donate/wishlist',
      },
    ],
  },
  {
    key: 'volunteering',
    title: 'Волонтёрство',
    subtitle: 'Любая форма участия делает их жизнь лучше и интереснее',
    description:
      'Помощь животным — это забота не меньше, чем о человеке. Общение, социализация и внимание помогают им быстрее адаптироваться к новым условиям и устроиться в семью. Вы можете выбрать то, как хотите помочь.',
    sectionIcon: defineAsyncComponent(() => import('~/assets/svg/help/dog.svg')),
    cardIcon: defineAsyncComponent(() => import('~/assets/svg/hand-icon.svg')),
    color: 'pink',
    cards: [
      {
        key: 'temporary-home',
        position: 1,
        title: 'Временная передержка',
        description:
          'Гостевой дом — отличный вариант, если у вас есть возможность на время принять питомца домой. Это особенно важно для малышей, животных после операций и пожилых питомцев, которым сложно в условиях приюта.',
        buttonText: 'О передержке',
        buttonLink: '/help/volunteer/foster',
      },
      {
        key: 'shelter-help',
        position: 2,
        title: 'Волонтёр в приюте',
        description:
          'Если вы готовы приезжать, вы можете помогать с выгулом собак, уходом за животными и другими ежедневными задачами. Это отличный способ познакомиться с нашими питомцами.',
        buttonText: 'О волонтёрстве',
        buttonLink: '/help/volunteer/become',
      },
      {
        key: 'curatorship',
        position: 3,
        title: 'Кураторство',
        description:
          'Вы можете помогать дистанционно, курируя одного животного и помогая найти ему дом.',
        buttonText: 'О кураторстве',
        buttonLink: '/help/volunteer/curator',
      },
    ],
  },
  {
    key: 'other-help',
    title: 'Другие способы помочь',
    subtitle: 'Каждое действие, большое или маленькое, ценно и приближает нас к общей цели',
    description:
      'Вы можете помогать не только руками. Мы всегда нуждаемся в информационной поддержке, целевых сборах и корпоративных волонтёрах, которые помогают нашим животным.',
    sectionIcon: defineAsyncComponent(() => import('~/assets/svg/help/fit-cat.svg')),
    cardIcon: defineAsyncComponent(() => import('~/assets/svg/handshake-icon.svg')),
    color: 'orange',
    cards: [
      {
        key: 'info-support',
        position: 1,
        title: 'Информационная поддержка',
        description:
          'Подписывайтесь на наши соцсети, рассказывайте о нас друзьям и делитесь постами о питомцах, которые ищут дом. Это занимает минимум времени и усилий. Это просто и очень эффективно.',
        buttonText: 'Подробнее',
        buttonLink: '/help/other/info',
      },
      {
        key: 'target-fundraising',
        position: 2,
        title: 'Целевые сборы',
        description:
          'Иногда животному требуется дорогостоящее лечение или особая помощь. На таких страницах мы размещаем данные питомцев, которые нуждаются в срочной помощи.',
        buttonText: 'Посмотреть',
        buttonLink: '/help/other/targeted',
      },
      {
        key: 'corporate',
        position: 3,
        title: 'Корпоративное участие',
        description:
          'Мы всегда рады компаниям, которые ищут идеи для социального проекта. Готовы обсудить возможности — от организации сбора корма до волонтёрских выездов.',
        buttonText: 'Подробнее',
        buttonLink: '/help/other/corporate',
      },
    ],
  },
]
</script>

<template>
  <div class="help-page">
    <div
      v-for="section in sections"
      :key="section.key"
      class="help-page__section"
    >
      <info-section :section="section" />
    </div>
  </div>
</template>

<style lang="scss">
.help-page {
  $this: '.help-page';

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
