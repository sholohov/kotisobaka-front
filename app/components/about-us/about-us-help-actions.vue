<script setup lang="ts">

const actions = [{
  title: 'Забрать питомца домой. Подарить дом одному или нескольким хвостикам.',
  link: '/animals',
}, {
  title: 'Стать волонтером: уход, выгул, профессиональная помощь',
  link: '/help/volunteer/become',
}, {
  title: 'Взять питомца на передержку где оно может оправиться в тепле и уюте',
  link: '/help/volunteer/foster',
}, {
  title: 'Сделать пожертвование (на лечение, корм, стерилизацию и другое)',
  link: '/help/donate/finance',
}, {
  title: 'Стать информационным волонтером - делать репосты, рассказывать о нас',
  link: '/help/other/info',
}, {
  title: 'Предложить партнерство (если вы представитель бизнеса или СМИ)',
  link: '/help/volunteer/corporate',
}]
</script>

<template>
  <content-box class="about-us-help-actions">
    <blockquote class="about-us-help-actions__quote">
      Наша команда выросла из нескольких человек в сообщество, где ценен каждый вклад.
      Ваши умения, опыт или поддержка могут помочь спасти больше жизней
    </blockquote>

    <ul class="about-us-help-actions__actions">
      <li
        v-for="action in actions"
        :key="action.link"
        class="about-us-help-actions__action"
      >
        <span class="about-us-help-actions__action-title">
          {{ action.title }}
        </span>
        <btn-default
          :to="action.link"
          circle
          color="blue"
          class="about-us-help-actions__action-btn"
        >
          <svg-icon name="arrow-right-icon" />
        </btn-default>
      </li>
    </ul>
  </content-box>
</template>

<style lang="scss">
.about-us-help-actions {
  $this: '.about-us-help-actions';

  &__quote {
    font-weight: 800;
    font-size: 26px;

    text-transform: uppercase;
    color: var(--color-green-dark);
    margin: 0 0 20px;

    @media (min-width: $mq-sm) {
      font-size: 30px;
      margin: 0 0 30px auto;
      max-width: 1024px;
      text-indent: 2em;
    }

    @media (min-width: $mq-md) {
      text-indent: 4em;
      max-width: 1200px;
    }
  }

  &__actions {

    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
    flex-direction: column;
    border-top: 1px solid var(--color-white);

    @media (min-width: $mq-sm) {
      width: 50%;
      margin: 0 0 0 auto;
      max-width: 700px;
    }

    @media (min-width: $mq-md) {
      max-width: 800px;
      padding: 0;
    }
  }

  &__action {
    border-bottom: 1px solid var(--color-white);
    gap: 20px;
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__action-title {
    font-weight: 700;
    font-size: 18px;

  }
}
</style>
