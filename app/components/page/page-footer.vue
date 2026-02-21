<script setup lang="ts">
import LogoBigIcon from '~/assets/svg/logo-big.svg'
import { apiDocuments } from '~/api/documents';

interface NavItem {
  label: string
  to: string
  key: string
}

interface SocItem {
  to: string
  key: string
  icon: string
}

const navigation: NavItem[] = [{
  label: 'О нас',
  to: '/about',
  key: 'about',
}, {
  label: 'Наши хвостики',
  to: '/animals',
  key: 'animals',
}, {
  label: 'Как помочь?',
  to: '/help',
  key: 'help',
}, {
  label: 'Информация',
  to: '/info',
  key: 'info',
}, {
  label: 'Статьи',
  to: '/articles',
  key: 'articles',
}]

const socials: SocItem[] = [{
  to: 'https://www.facebook.com/groups/348219105203299',
  key: 'facebook',
  icon: 'facebook-icon',
}, {
  to: 'https://www.instagram.com/kisorgcom',
  key: 'instagram',
  icon: 'instagram-icon',
}]

const { isMobile, isTabletSmall, isTablet } = useBreakpoint()
const isMobileView = computed(() => (isMobile.value || isTabletSmall.value || isTablet.value))

const { data: userAgreementResponse } = await useAsyncData('user-agreement', () => {
  return apiDocuments.get({
    populate: ['file'],
    filters: {
      description: {
        $startsWith: 'Пользовательское соглашение',
      },
    },
  })
})

const userAgreementFile = computed(() => {
  const file = userAgreementResponse.value?.data[0]

  return file?.file ? `/cms${file.file.url}` : ''
})
</script>

<template>
  <div class="page-footer">
    <content-box>
      <div class="page-footer__inner">
        <div
          v-if="!isMobileView"
          class="page-footer__nav"
        >
          <nav class="page-footer__nav-inner">
            <div class="page-footer__nav-title">
              Навигация:
            </div>

            <ul class="page-footer__nav-list">
              <li
                v-for="item in navigation"
                :key="item.key"
                class="page-footer__nav-item"
              >
                <nuxt-link
                  :to="item.to"
                  class="page-footer__nav-link"
                >
                  {{ item.label }}
                </nuxt-link>
              </li>
            </ul>
          </nav>
        </div>

        <div class="page-footer__pic">
          <img
            src="/img/kotisobaka.webp"
            alt="hand-center"
            class="page-footer__pic-center"
          >
          <img
            src="/img/hand.svg"
            alt="pic-left"
            class="page-footer__pic-left"
          >
          <img
            src="/img/hand.svg"
            alt="hand-right"
            class="page-footer__pic-right"
          >
        </div>

        <div class="page-footer__info">
          <logo-big-icon
            width="150"
            class="page-footer__logo"
          />

          <ul class="page-footer__social">
            <li
              v-for="item in socials"
              :key="item.key"
              class="page-footer__social-item"
            >
              <nuxt-link
                target="_blank"
                :to="item.to"
                class="page-footer__social-link"
              >
                <svg-icon
                  :name="item.icon"
                  class="page-footer__social-icon"
                />
              </nuxt-link>
            </li>
          </ul>

          <div class="page-footer__email">
            <span class="page-footer__email-title">
              email:
            </span>
            <nuxt-link
              to="mailto:info@kotisobaka.by"
              class="page-footer__email-link"
            >
              info@kotisobaka.by
            </nuxt-link>
            <div class="page-footer__email-subtitle">
              только для юридической корреспонденции
            </div>
          </div>

          <div class="page-footer__legal">
            <nuxt-link
              to="/about#requisite"
              class="page-footer__legal-link"
            >
              Реквизиты
            </nuxt-link>
            <a
              target="_blank"
              :href="userAgreementFile"
              class="page-footer__legal-link"
            >
              Пользовательское соглашение
            </a>
          </div>
        </div>
      </div>

      <div class="page-footer__requisite">
        Общественное объединение защиты животных «КиС» зарегистрировано
        решением Главного управлением юстиции Мингорисполкома от 20.12.2011 года
        № 41в ЕГР юр. лиц и индивидуальных предпринимателей за № 194902685.
        Адрес для почтовых отправлений: г. Минск, ул. Мележа, д.5, корп.1, оф.408
      </div>
    </content-box>
  </div>
</template>

<style lang="scss">
.page-footer {
  $this: ".page-footer";
  display: flex;
  flex-direction: column;

  &__inner {
    display: flex;
    gap: 10px;
    padding: 20px 0;
    color: var(--color-white);
    flex-wrap: wrap;

    @media (min-width: $mq-lg) {
      gap: 20px;
      flex-wrap: nowrap;
    }
  }

  &__nav, &__pic, &__info {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--color-pink-dark);
    border-radius: 24px;
    flex: 1;
    overflow: hidden;
    padding: 50px 0;
  }

  &__nav {
    display: flex;
    flex: 1 1 100%;

    @media (min-width: $mq-sm) {
      flex: 1;
    }
  }

  &__nav-title {
    font-size: 24px;
    font-weight: 700;
    margin: 0 0 16px;
  }

  &__nav-list {
    display: flex;
    flex-direction: column;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  &__nav-link {
    position: relative;
    display: inline-flex;
    height: 30px;
    font-weight: 400;
    transition: color 0.3s;

    &:before {
      content: '';
      display: flex;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 8px;
      height: 1px;
      transform-origin: left;
      background-color: var(--color-white);
      opacity: 0.5;
      transform: scale(0, 1);
      transition: transform 0.3s;
    }

    @include hover {
      color: var(--color-background-beige);

      &:before {
        transform: scale(1, 1);
      }
    }

    @media (min-width: $mq-lg) {
      padding: 2px 0;
    }
  }

  &__pic {
    position: relative;
    height: 340px;
    flex: 1 1 100%;
    order: +1;
    width: 100%;

    @include hover {
      #{$this}__pic-left {
        transform: translateX(20%);
      }

      #{$this}__pic-right {
        transform: scale(-1, 1) translateX(20%);
      }
    }

    @media (min-width: $mq-sm) {
      flex: 1;
      height: auto;
    }

    @media (min-width: $mq-md) {
      flex: 1;
      order: 0;
    }

    @media (min-width: $mq-lg) {
      flex: 2;
    }
  }

  &__pic-center {
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    object-fit: cover;
  }

  &__pic-left, &__pic-right {
    position: absolute;
    bottom: 0;
    width: 300px;
    transition: transform 1s;
  }

  &__pic-left {
    left: calc(50% - 330px);
  }

  &__pic-right {
    transform: scale(-1, 1);
    right: calc(50% - 330px);
  }

  &__info {
    flex: 1 1 100%;

    @media (min-width: $mq-sm) {
      flex: 1;
    }
  }

  &__logo {
    margin: 0 0 20px;
  }

  &__social {
    list-style: none;
    padding: 0;
    margin: 0 0 20px;
    display: flex;
    gap: 10px;
  }

  &__social-item {
  }

  &__social-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: currentColor;
    transition: opacity 0.3s;

    @include hover {
      opacity: 0.7;
    }
  }

  &__social-icon {
    color: var(--color-pink-dark);
  }

  &__email {
    text-align: center;
    margin: 0 0 20px;
  }

  &__email-title,
  &__email-link {
    font-size: 20px;
    font-weight: 700;

  }

  &__email-title {
    margin: 0 0 10px;
  }

  &__email-subtitle {
    margin: 10px 0 0;
    font-size: 13px;
  }

  &__email-link {
    position: relative;
    transition: color 0.3s;

    &:before {
      content: '';
      display: flex;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 2px;
      transform-origin: left;
      background-color: var(--color-white);
      opacity: 0.5;
      transform: scale(0, 1);
      transition: transform 0.3s;
    }

    @include hover {
      color: var(--color-background-beige);

      &:before {
        transform: scale(1, 1);
      }
    }
  }

  &__legal {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    transition: color 0.3s;
  }

  &__legal-link {
    display: inline-flex;
    position: relative;
    height: 30px;

    &:before {
      content: '';
      display: flex;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 8px;
      height: 1px;
      transform-origin: left;
      background-color: var(--color-white);
      opacity: 0.5;
      transform: scale(0, 1);
      transition: transform 0.3s;
    }

    @include hover {
      color: var(--color-background-beige);

      &:before {
        transform: scale(1, 1);
      }
    }
  }

  &__requisite {
    color: var(--color-pink-dark);
    text-align: center;
  }
}
</style>
