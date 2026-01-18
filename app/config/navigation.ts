import type { ButtonNavigationProps } from '~/types/buttonNavigation';

export const navigation = [{
  label: 'О нас',
  to: '/about',
  key: 'about',
  items: [{
    label: 'Документы и отчётность',
    to: '/about/docs',
    key: 'about-docs',
  }, {
    label: 'Счастливые истории',
    to: '/about/stories',
    key: 'about-stories',
  }],
}, {
  label: 'Как помочь?',
  to: '/help',
  key: 'help',
  items: [{
    label: 'Материальная помощь',
    to: '',
    key: 'help-donate',
    items: [{
      label: 'Финансовая',
      to: '/help/donate/finance',
      key: 'help-donate-finance',
    }, {
      label: 'Корзина желаний',
      to: '/help/donate/wishlist',
      key: 'help-donate-wishlist',
    }],
  }, {
    label: 'Волонтёрство',
    to: '',
    key: 'help-volunteer',
    items: [{
      label: 'Стать волонтёром',
      to: '/help/volunteer/become',
      key: 'help-volunteer-become',
    }, {
      label: 'Взять на передержку',
      to: '/help/volunteer/foster',
      key: 'help-volunteer-foster',
    }, {
      label: 'Стать куратором',
      to: '/help/volunteer/curator',
      key: 'help-volunteer-curator',
    }],
  }, {
    label: 'Другая помощь',
    to: '',
    key: 'help-other',
    items: [{
      label: 'Информационная помощь',
      to: '/help/other/info',
      key: 'help-other-info',
    }, {
      label: 'Целевые сборы',
      to: '/help/other/targeted',
      key: 'help-other-targeted',
    }, {
      label: 'Корпоративное волонтёрство',
      to: '/help/other/corporate',
      key: 'help-other-corporate',
    }],
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
    label: 'Помощь своими руками',
    to: '/info/diy',
    key: 'info-diy',
  }, {
    label: 'Часто задаваемые вопросы',
    to: '/info/faq',
    key: 'info-faq',
  }],
}, {
  label: 'Статьи',
  to: '/articles',
  key: 'articles',
}] satisfies ButtonNavigationProps[]
