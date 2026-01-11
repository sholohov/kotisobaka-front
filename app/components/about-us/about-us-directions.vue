<script setup lang="ts">

const items = computed(() => [{
  position: 1,
  title: 'Поддержка, опека и безопасность',
  icon: defineAsyncComponent(() => import('~/assets/svg/about-us-directions/man-with-dog.svg')),
  list: [
    'Спасение и лечение бездомных и пострадавших животных.',
    'Временная передержка (опека) и социализация питомцев.',
    'Программа «Помощь опекунам»: поддержка тех, кто взял на передержку уличное животное.',
    'Программа стерилизации: для бездомных животных и для питомцев малообеспеченных граждан.',
    'Пропаганда чипирования для учета и безопасности.',
  ],
}, {
  position: 2,
  title: 'Мы рядом до и после усыновления',
  icon: defineAsyncComponent(() => import('~/assets/svg/about-us-directions/big-family.svg')),
  list: [
    'Индивидуальный подбор семьи для каждого подопечного.',
    'Поддержка семьи после усыновления: рекомендации по уходу, питанию и здоровью животного',
  ],
}, {
  position: 3,
  title: 'Знания и законы ради доброты',
  icon: defineAsyncComponent(() => import('~/assets/svg/about-us-directions/riding-cat-and-and-dog.svg')),
  list: [
    'Работа со СМИ для продвижения идей гуманности.',
    'Юридическая работа: в рамках членства в "Ассоциации зоозащитных организаций", участие в разработке нормативных актов, взаимодействие с властями Минска.',
    'Выпуск информационных материалов (буклеты, плакаты).',
  ],
}, {
  position: 4,
  title: 'Благотворительность в действии',
  icon: defineAsyncComponent(() => import('~/assets/svg/about-us-directions/dog-and-sick-cat.svg')),
  list: [
    'Организация благотворительных акций, выставок-пристроев, фестивалей.',
    'Проведение сборов на лечение конкретных животных и на общие нужды организации.',
  ],
}])
</script>

<template>
  <div class="about-us-directions">
    <content-box>
      <swiper-container
        :slides-per-view="'auto'"
        :space-between="10"
        :breakpoints="{
          768: {
            slidesPerView: 'auto',
            spaceBetween: 20
          },
          1440: {
            slidesPerView: 4,
            spaceBetween: 20
          }
        }"
        class="about-us-directions__slider"
      >
        <swiper-slide
          v-for="item in items"
          :key="item.position"
          class="about-us-directions__slide"
        >
          <div class="about-us-directions__card">
            <div class="about-us-directions__header">
              <div class="about-us-directions__picture">
                <span class="about-us-directions__position">
                  {{ item.position }}
                </span>
                <component
                  :is="item.icon"
                  class="about-us-directions__icon"
                />
              </div>
              <h3 class="about-us-directions__title">
                {{ item.title }}
              </h3>
            </div>
            <ul class="about-us-directions__list">
              <li
                v-for="(listItem, listIndex) in item.list"
                :key="listIndex"
                class="about-us-directions__list-item"
              >
                {{ listItem }}
              </li>
            </ul>
          </div>
        </swiper-slide>
      </swiper-container>
    </content-box>
  </div>
</template>

<style lang="scss">
  .about-us-directions {
    $this: '.about-us-directions';

    &__slider {

    }

    &__slide {
      width: 320px;
    }

    &__card {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    &__header {
      display: flex;
      flex-direction: column;
      padding: 20px;
      border-radius: 24px;
      background-color: var(--color-white);
    }

    &__picture {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      margin: 0 0 20px;
    }

    &__position {
      color: var(--color-blue-light);
      font-weight: 900;
      font-size: 140px;
      position: absolute;
      inset: 10px 60px 0 0;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      filter:url(#noise)
    }

    &__icon {
      height: 100px;
      color: var(--color-green-dark);
      margin: 0 0 0 60px;
      position: relative;
      @include imageGradient
    }

    &__title {
      font-weight: 800;
      font-size: 22px;
      line-height: 100%;
      color: var(--color-green-dark);
    }

    &__list {
      padding: 20px;
      margin: 0;
      border-radius: 24px;
      background-color: var(--color-white);
      color: var(--color-text-chocolate);
      font-weight: 400;

    }

    &__list-item {
      margin: 4px 0 4px 20px;
    }
  }
</style>
