<script setup lang="ts">
import LogoSvg from '~/assets/svg/logo.svg'

const { navigation } = useAppConfig()
const modalStore = useModalStore()
const { isMobile, isTabletSmall, isTablet } = useBreakpoint()
const isMobileView = computed(() => (isMobile.value || isTabletSmall.value || isTablet.value))
const favoritesStore = useFavoritesStore()

function handleDonateBtn() {
  modalStore.open('donate-with-qr')
}
</script>

<template>
  <header class="page-header">
    <content-box>
      <div class="page-header__inner">
        <tooltip-box
          :text="$route.path === '/' ? 'Кот и Собака' : 'На главную'"
          position="bottom-left"
        >
          <nuxt-link
            :to="$route.path === '/' ? '' : '/'"
            class="page-header__logo-link"
          >
            <logo-svg
              height="36"
              class="page-header__logo-img"
            />
          </nuxt-link>
        </tooltip-box>

        <nav
          v-if="!isMobileView"
          class="page-header__nav"
        >
          <btn-navigation
            v-for="navItem in navigation"
            :key="navItem.key"
            :to="navItem.to"
            :items="navItem.items"
          >
            {{ navItem.label }}
          </btn-navigation>
        </nav>

        <div class="page-header__right">
          <div class="page-header__search">
            <search-panel />
          </div>

          <tooltip-box
            v-if="!isMobileView"
            text="Избранное"
            position="bottom"
          >
            <btn-default
              circle
              to="/favorites"
              :badge="favoritesStore.count"
              style="color: var(--color-beige-light)"
            >
              <svg-icon
                name="heart-icon"
                style="color: var(--color-orange)"
              />
            </btn-default>
          </tooltip-box>

          <tooltip-box
            v-if="!isMobileView"
            text="Помочь сейчас"
            position="bottom-right"
          >
            <btn-donate @click="handleDonateBtn" />
          </tooltip-box>
        </div>
      </div>
    </content-box>
  </header>
</template>

<style lang="scss">
.page-header {
  $this: ".page-header";

  padding: 10px var(--scrollbar-width, 0) 10px 0;

  @media (min-width: $mq-sm) {
    padding: 20px var(--scrollbar-width, 0) 20px 0;
  }

  &__inner {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__logo-link {
    background-color: var(--color-text-beige);
    border: 1px solid var(--color-beige-light);
    width: 44px;
    height: 44px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s;

    @include hover {
      background-color: var(--color-background-pink);
    }

    &:not([href]) {
      pointer-events: none;
      cursor: default;
      background-color: var(--color-text-beige);
      transition: none;
    }

    &:not([href]):hover {
      background-color: var(--color-text-beige);
    }
  }

  &__logo-img {
    height: 36px;
    width: auto;
    color: var(--color-pink-dark);
  }

  &__nav {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__right {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__search {
    flex: none;
    position: relative;
  }

  &__donate {
    display: flex;
    align-items: center;
    position: absolute;
    top: 100%;
    right: 0;
    margin: 10px 0 0;
  }
}
</style>
