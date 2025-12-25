import type { ButtonNavigationProps } from "~/types/buttonNavigation";

export default defineAppConfig({
  navigation: [{
    label: 'О нас',
    to: '/about',
    key: 'about',
    items: [{
      label: 'Документы и отчётность',
      to: '/about/docs',
      key: 'about-docs',
    }, {
      label: 'Истории успеха',
      to: '/about/stories',
      key: 'about-stories',
    }],
  }, {
    label: 'Как помочь?',
    to: '/help',
    key: 'help',
    items: [{
      label: 'Материальная помощь',
      to: '/help/donate',
      key: 'help-donate',
    }, {
      label: 'Волонтёрство',
      to: '/help/volunteer',
      key: 'help-volunteer',
    }, {
      label: 'Другая помощь',
      to: '/help/other',
      key: 'help-other',
    }],
  }, {
    label: 'Наши хвостики',
    to: '/animals',
    key: 'animals',
  }, {
    label: 'Информация',
    to: '/info',
    key: 'info',
    items: [{
      label: 'Как забрать питомца?',
      to: '/info/adopt',
      key: 'info-adopt',
    }, {
      label: 'Процесс усыновления',
      to: '/info/process',
      key: 'info-process',
    }, {
      label: 'Помощь своими руками',
      to: '/info/diy',
      key: 'info-diy',
    }, {
      label: 'Часто задаваемые вопросы',
      to: '/info/faq',
      key: 'info-faq',
    }],
  }, {
    label: 'Блог',
    to: '/blog',
    key: 'blog',
    items: [],
  }] satisfies ButtonNavigationProps[],
})
