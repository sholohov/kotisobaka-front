<script setup lang="ts">
interface RequisiteCard {
  title: string;
  subtitle: string;
  content: string;
}

interface ActivityGroup {
  type: 'negative' | 'positive';
  title: string;
  list: string[];
}

const requisites: RequisiteCard[] = [
  {
    title: 'Общественное объединение защиты животных «КиС»',
    subtitle: '(ООЗЖ "КиС")',
    content: [
      'Зарегистрировано решением Главного управлением юстиции ' +
      'Мингорисполкома от 20.12.2011 года № 41 в Едином государственном регистре ' +
      'юридических лиц и индивидуальных предпринимателей за № 194902685',
    ].join(' '),
  },
  {
    title: 'Расчетный счет:',
    subtitle: 'BY90AKBB30156614000055400000 Код банка: AKBBBY2Х',
    content: 'в ЦБУ № 527 ОАО "АСБ Беларусбанк", г.Минск, ул. Воронянского, 7А',
  },
  {
    title: 'Юридический адрес',
    subtitle: 'только для юридической корреспонденции',
    content: 'г. Минск, ул. Мележа, д.5, корп.1, оф.408',
  },
  {
    title: 'Электронная почта',
    subtitle: 'только для юридической корреспонденции',
    content: 'info@kotisobaka.by',
  },
];

const activities: ActivityGroup[] = [{
  type: 'negative',
  title: 'Чего мы НЕ делаем:',
  list: [
    'не оказываем экстренную помощь',
    'не забираем животных «с улицы»',
    'не выезжаем на вызовы',
  ],
}, {
  type: 'positive',
  title: 'Что мы делаем:',
  list: [
    'не оказываем экстренную помощь',
    'не забираем животных «с улицы»',
    'не выезжаем на вызовы',
  ],
}]
</script>

<template>
  <content-box class="about-us-requisite">
    <common-grid
      :items="requisites"
      class="about-us-requisite__cards"
    >
      <template #default="{ data }">
        <div class="about-us-requisite__card">
          <h4 class="about-us-requisite__card-title">
            {{ data.title }}
          </h4>
          <div class="about-us-requisite__card-subtitle">
            {{ data.subtitle }}
          </div>
          <p class="about-us-requisite__card-content">
            <nuxt-link
              v-if="data.content.includes('info@')"
              class="about-us-requisite__card-link"
              :to="'mailto:' + data.content"
            >
              {{ data.content }}
            </nuxt-link>
            <template v-else>
              {{ data.content }}
            </template>
          </p>
        </div>
      </template>
    </common-grid>

    <about-us-quote class="about-us-requisite__intro">
      Важно понять: ООЗЖ «КиС» — это не служба спасения, а волонтеры.
      Мы помогаем животным в свободное от основной работы время.
    </about-us-quote>

    <div class="about-us-requisite__details">
      <div class="about-us-requisite__description">
        <p class="about-us-requisite__description-item">
          Мы такие же, как вы: работаем, учимся, растим детей. Помогаем животным исключительно в свободное время и на добровольных началах. У нас нет зарплаты, штата и дежурной машины.
        </p>
        <p class="about-us-requisite__description-item">
          Помощь животным — наше добровольное дело в свободное время, а не работа и не источник дохода.
        </p>
      </div>

      <div class="about-us-requisite__activities">
        <div
          v-for="group in activities"
          :key="group.type"
          :class="[
            'about-us-requisite__activities-list',
            `about-us-requisite__activities-list--${group.type}`
          ]"
        >
          <h3 class="about-us-requisite__activities-title">
            {{ group.title }}
          </h3>

          <div
            v-for="(text, index) in group.list"
            :key="index"
            class="about-us-requisite__activities-item"
          >
            <svg-icon
              v-if="group.type === 'negative'"
              class="about-us-requisite__activities-icon"
              name="close-icon"
            />
            <svg-icon
              v-else
              class="about-us-requisite__activities-icon"
              name="checkbox-icon"
            />
            <p class="about-us-requisite__activities-text">
              {{ text }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </content-box>
</template>

<style lang="scss">
.about-us-requisite {
  $this: 'about-us-requisite';

  &__title {
    font-weight: 600;
    font-size: 30px;
    line-height: 100%;
  }

  &__cards {
    margin: 0 0 60px;
  }

  &__card {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 240px;
    border-radius: 24px;
    padding: 20px;
    border: 1px solid var(--color-purple);
    background-color: var(--color-background-pink);
  }

  &__card-title,
  &__card-subtitle {
    font-weight: 700;
    line-height: 120%;
    margin: 0 0 8px;
  }

  &__card-link {
    @include hover {
      text-decoration: underline;
      text-decoration-color: rgba(0,0,0,0.5);
    }
  }

  &__details {
    margin: 0 0 10px auto;

    @media (min-width: $mq-sm) {
      width: 50%;
    }
  }

  &__description {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 0 0 20px;
    font-weight: 700;
    font-size: 18px;
    line-height: 120%;
    color: var(--color-text-chocolate);
  }

  &__activities {
    display: flex;
    flex-direction: column;
    gap: 10px;

    @media (min-width: $mq-xs) {
      flex-direction: row;
    }
  }

  &__activities-list {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 6px 0;

    &--negative {
      color: var(--color-orange-dark);
    }

    &--positive {
      color: var(--color-green-dark);
    }
  }

  &__activities-title {
    margin: 0 0 4px;
  }

  &__activities-item {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__activities-icon {

  }

  &__activities-text {
    color: var(--color-text-brown);
  }
}
</style>
