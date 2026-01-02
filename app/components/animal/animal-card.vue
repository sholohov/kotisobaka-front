<script setup lang="ts">
import HeartIcon from '~/assets/svg/heart-icon.svg'
import HeartRoundIcon from '~/assets/svg/heart-round-icon.svg'
import HomeIcon from '~/assets/svg/home-icon.svg'
import HealthIcon from '~/assets/svg/health-icon.svg'

import type { Animal } from '~/api/animals/types';

interface AnimalInfo {
  key: string,
  label: string,
  value: string | number,
  tooltip?: string,
}

const props = defineProps({
  animal: {
    type: Object as PropType<Animal>,
    required: true,
  },
  fundsSegments: {
    type: Number,
    required: true,
  },
})

const { isMobileView } = useBreakpoint()
const favoritesStore = useFavoritesStore()

const tooltipText = computed(() => {
  return favoritesStore.has(props.animal.documentId) ? 'Удалить из избранного' : 'Добавить в избранное'
})

const animalGender = computed((): string => {
  return props.animal.gender === 'male' ? 'мальчик' : 'девочка'
})

const animalInfo = computed(() => {
  const { birthDate, sterilized, gender } = props.animal

  const list: AnimalInfo[] = [{
    key: 'age',
    label: 'возраст',
    tooltip: formatDate(birthDate),
    value: getAge(birthDate, true),
  }, {
    key: 'gender',
    label: 'пол',
    value: animalGender.value,
  }]

  if (!isMobileView.value) {
    list.push({
      key: 'sterilized',
      label: gender === 'male' ? 'кастр.' : 'стерил.',
      value: sterilized ? 'да' : 'нет',
    })
  }

  return list
})

function truncate(text: string, maxLength = 100) {
  if (!text || text.length <= maxLength) return text

  return text.slice(0, maxLength)
}

function handleToggleFavoriteBtn() {
  favoritesStore.toggle(props.animal.documentId)
}

</script>

<template>
  <div class="animal-card">
    <div class="animal-card__img-wrapper">
      <img
        :src="animal.photo.url"
        :alt="animal.photo.alternativeText || animal.name"
        class="animal-card__img"
      >
    </div>

    <div class="animal-card__details">
      <div class="animal-card__name">
        {{ animal.name }}
      </div>
      <div class="animal-card__description">
        {{ truncate(animal.description) }}
      </div>
    </div>

    <div class="animal-card__info">
      <div
        v-for="animalInfoItem in animalInfo"
        :key="animalInfoItem.key"
        class="animal-card__info-item"
      >
        <tooltip-box
          position="top-left"
          :text="animalInfoItem?.tooltip || ''"
        >
          <div class="animal-card__info-item__value">
            {{ animalInfoItem.value }}
          </div>
        </tooltip-box>
        <div class="animal-card__info-label">
          {{ animalInfoItem.label }}
        </div>
      </div>
    </div>

    <fundraising-bar
      v-if="animal.fundsIsNeeded"
      :segments="fundsSegments"
      :goal="animal.fundsAmountTarget!"
      :raised="animal.fundsAmountCollected!"
      class="animal-card__fundraising"
    />

    <nuxt-link
      :to="`/animals/${animal.slug}`"
      class="animal-card__link"
      :aria-label="`Подробнее о ${animal.name}`"
    />

    <div class="animal-card__actions">
      <tooltip-box
        :text="tooltipText"
        position="bottom-left"
      >
        <btn-default
          class="animal-card__actions-btn"
          style="color: var(--color-orange)"
          circle
          @click="handleToggleFavoriteBtn"
        >
          <heart-icon
            v-if="favoritesStore.has(animal.documentId)"
            width="24"
          />
          <heart-round-icon
            v-else
            width="24"
          />
        </btn-default>
      </tooltip-box>

      <tooltip-box
        v-if="animal.animalStatus === 'available'"
        text="Ищу дом"
        position="bottom-left"
      >
        <btn-default
          class="animal-card__actions-btn animal-card__actions-btn--no-click"
          style="color: var(--color-green-dark)"
          circle
        >
          <home-icon width="24" />
        </btn-default>
      </tooltip-box>

      <tooltip-box
        v-if="animal.animalStatus === 'under_treatment'"
        text="Помоги мне"
        position="bottom-left"
      >
        <btn-default
          style="color: var(--color-orange)"
          class="animal-card__actions-btn animal-card__actions-btn--no-click"
          circle
        >
          <health-icon width="24" />
        </btn-default>
      </tooltip-box>
    </div>
  </div>
</template>

<style lang="scss">
.animal-card {
  $this: ".animal-card";

  background-color: var(--color-white);
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.07),
      0 4px 8px rgba(0, 0, 0, 0.035);

      #{$this}__img {
        transform: scale(1.1);
      }
    }
  }

  &__img-wrapper {
    position: relative;
    overflow: hidden;
    width: 100%;
    padding: calc(100% * 0.70) 0 0;
  }

  &__img {
    position: absolute;
    display: flex;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }

  &__details {
    padding: 14px 10px;

    @media (min-width: $mq-lg) {
      padding: 20px 14px;
    }
  }

  &__name {
    font-size: 22px;
    font-weight: 800;
    margin: 0 0 2px;

    @media (min-width: $mq-lg) {
      margin: 0 0 4px;
      font-size: 22px;
    }

    @media (min-width: $mq-xl) {
      margin: 0 0 6px;
      font-size: 24px;
    }
  }

  &__description {
    position: relative;
    font-weight: 400;
    line-height: 1.2;
    color: var(--color-text-chocolate);
    height: 38px;
    overflow: hidden;

    &::after {
      content: '...';
      display: inline-flex;
      position: absolute;
      inset: auto 0 0 auto;
    }
  }

  &__info {
    display: flex;
    border-top: 1px solid var(--color-background-pink);
  }

  &__info-item {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 8px 10px 18px;

    &:not(:last-child) {
      border-right: 1px solid var(--color-background-pink);
    }
  }

  &__info-item__value {
    color: var(--color-text-brown);
    font-weight: 700;
    font-size: 24px;
    line-height: 1.2;
    z-index: 1;
  }

  &__info-label {
    font-size: 14px;
    font-weight: 600;
    line-height: 1.2;
    color: var(--color-text-chocolate);
  }

  &__fundraising {
    padding: 16px;
    border-top: 1px solid var(--color-background-pink);
  }

  &__link {
    position: absolute;
    inset: 0;
  }

  &__actions {
    display: flex;
    flex-direction: column;
    position: absolute;
    inset: 10px auto auto 10px;
    gap: 6px;

    @media (min-width: $mq-lg) {
      inset: 20px auto auto 20px;
    }
  }

  &__actions-btn {
    &--no-click {
      pointer-events: none;
    }

    &--favorites {
      color: var(--color-pink-light);
    }

    &--favorites-active {
      color: var(--color-orange);
    }
  }
}
</style>
