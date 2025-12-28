import type { ButtonNavigationProps } from "~/types/buttonNavigation";

export const navigation = [{
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
    items: [{
      label: 'Финансовая',
      to: '/help/donate/finance',
      key: 'help-donate-finance',
    }, {
      label: 'Корзина желаний (график приёма)',
      to: '/help/donate/wishlist',
      key: 'help-donate-wishlist',
    }],
  }, {
    label: 'Волонтёрство',
    to: '/help/volunteer',
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
      label: 'Стать партнёром',
      to: '/help/volunteer/partner',
      key: 'help-volunteer-partner',
    }],
  }, {
    label: 'Другая помощь',
    to: '/help/other',
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
  items: [{
    label: 'Карточка питомца',
    to: '/animals/card',
    key: 'animals-card',
  }],
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
}] satisfies ButtonNavigationProps[]
