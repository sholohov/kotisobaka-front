<script setup lang="ts">
import PawIcon from '~/assets/svg/paw-icon.svg';

// Асинхронные SVG-компоненты
const images = {
  step1: defineAsyncComponent(() => import('~/assets/svg/adoption-process/step-1.svg')),
  step2: defineAsyncComponent(() => import('~/assets/svg/adoption-process/step-2.svg')),
  step3: defineAsyncComponent(() => import('~/assets/svg/adoption-process/step-3.svg')),
  step4: defineAsyncComponent(() => import('~/assets/svg/adoption-process/step-4.svg')),
};

type Color = 'green' | 'blue' | 'pink' | 'yellow';

type Step = {
  id: number;
  title: string;
  desc: string;
  side: 'left' | 'right';
  color: Color;
  image: keyof typeof images;
};

const steps: Step[] = [{
  id: 1,
  title: 'Шаг 1',
  desc: 'Выбираете питомца на сайте',
  side: 'right',
  color: 'green',
  image: 'step1',
}, {
  id: 2,
  title: 'Шаг 2',
  desc: 'Приезжаете познакомиться лично',
  side: 'left',
  color: 'blue',
  image: 'step2',
}, {
  id: 3,
  title: 'Шаг 3',
  desc: 'Подписываем документы',
  side: 'right',
  color: 'pink',
  image: 'step3',
}, {
  id: 4,
  title: 'Шаг 4',
  desc: 'Домой!  Забираете нового друга!',
  side: 'left',
  color: 'yellow',
  image: 'step4',
}];

const { isMobileView } = useBreakpoint();
const isLargeScreen = computed(() => !isMobileView.value);
// Используем ref для карточек
const cardEls = ref<(HTMLElement | null)[]>([]);

// стрелки
const arrows = ref<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  side: 'left' | 'right',
  color: Color
}[]>([]);

const svgSize = reactive({ width: 0, height: 0 });

function updatePositions() {
  arrows.value = [];
  const container = document.querySelector('.adoption-process') as HTMLElement;

  if (!container) return;
  const cRect = container.getBoundingClientRect();

  svgSize.width = cRect.width;
  svgSize.height = cRect.height;

  for (let i = 0; i < steps.length - 1; i++) {
    const from = cardEls.value[i];
    const to = cardEls.value[i + 1];
    const step = steps[i];

    if (!from || !to || !step) continue;

    const r1 = from.getBoundingClientRect();
    const r2 = to.getBoundingClientRect();
    const { side, color } = step;
    let x1, y1, x2, y2;

    if (isLargeScreen.value) {
      x1 = r1.right - cRect.left;
      y1 = r1.top + r1.height / 2 - cRect.top;

      x2 = r2.left - cRect.left;
      y2 = r2.top + r2.height / 2 - cRect.top;
    } else {
      x1 = side === 'right'
        ? r1.left - cRect.left
        : r1.right - cRect.left;

      y1 = r1.top + r1.height / 2 - cRect.top;
      x2 = r2.left + r2.width / 2 - cRect.left;
      y2 = r2.top - cRect.top;
    }

    arrows.value.push({ x1, y1, x2, y2, side, color });
  }
}

function scheduleUpdate() {
  requestAnimationFrame(updatePositions);
}

onMounted(() => {
  setTimeout(updatePositions, 100);
  window.addEventListener('resize', scheduleUpdate);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', scheduleUpdate);
});

const setCardRef = (el: HTMLElement | null, idx: number) => {
  cardEls.value[idx] = el;
};

// Функция для получения цвета
const getColorVar = (color: Color): string => {
  return `var(--color-${color}-dark)`;
};
</script>

<template>
  <content-box>
    <div class="adoption-process">
      <div class="adoption-process__steps">
        <svg
          class="adoption-process__arrows"
          :width="svgSize.width"
          :height="svgSize.height"
        >
          <defs>
            <marker
              v-for="color in ['green','blue','pink','yellow'] as Color[]"
              :id="`arrowhead-${color}`"
              :key="`marker-${color}`"
              markerWidth="8"
              markerHeight="8"
              refX="8"
              refY="4"
              orient="auto"
            >
              <polyline
                points="0,0 8,4 0,8"
                :stroke="getColorVar(color)"
                stroke-width="1.5"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </marker>
          </defs>

          <path
            v-for="(arrow, idx) in arrows"
            :key="idx"
            :d="isLargeScreen
              ? `M ${arrow.x1} ${arrow.y1}
               C ${arrow.x1 + 120} ${arrow.y1},
                 ${arrow.x2 - 120} ${arrow.y2},
                 ${arrow.x2} ${arrow.y2}`
              : `M ${arrow.x1} ${arrow.y1}
               C ${arrow.x1 + (arrow.side === 'right' ? -120 : 120)} ${arrow.y1},
                 ${arrow.x2} ${arrow.y2 - 120},
                 ${arrow.x2} ${arrow.y2}`"
            :stroke="getColorVar(arrow.color)"
            stroke-width="2"
            stroke-dasharray="10"
            fill="none"
            :marker-end="`url(#arrowhead-${arrow.color})`"
          />
        </svg>

        <div
          v-for="(step, idx) in steps"
          :key="step.id"
          class="adoption-process__step"
          :class="[
            `adoption-process__step--${step.side}`,
            `adoption-process__step--${step.color}`
          ]"
        >
          <div
            :ref="(el) => setCardRef(el as HTMLElement, idx)"
            class="adoption-process__step-card"
          >
            <div class="adoption-process__step-title">
              {{ step.title }}
            </div>
            <div class="adoption-process__step-desc">
              {{ step.desc }}
            </div>
          </div>

          <component
            :is="images[step.image]"
            class="adoption-process__step-image"
          />
        </div>
      </div>
      <div class="adoption-process__description">
        Став опекуном, вы не останетесь одни — наши волонтёры всегда на связи и помогут советами по кормлению, здоровью
        и уходу.
        Мы поддержим вас в любых вопросах, чтобы адаптация прошла очень комфортно и легко.
      </div>
      <div class="adoption-process__link">
        <btn-default
          to="/animals"
          color="blue"
          style="width: 240px"
        >
          Найти друга
        </btn-default>
        <btn-default
          color="blue"
          circle
          to="/animals"
        >
          <paw-icon width="24" />
        </btn-default>
      </div>
    </div>
  </content-box>
</template>

<style lang="scss">
.adoption-process {
  $this: '.adoption-process';

  &__steps {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 20px;

    @media (min-width: 640px) {
      padding: 80px 50px;
    }

    @media (min-width: $mq-md) {
      flex-direction: row;
      justify-content: center;
      gap: 100px;
      padding: 40px 20px;
    }
  }

  &__arrows {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
  }

  &__step {
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    @media (min-width: 640px) {
      margin: -65px 0;
    }

    @media (min-width: $mq-md) {
      gap: 20px;
      margin: 0;
      padding: 0;
    }

    &--left {
      align-self: flex-start;

      @media (min-width: $mq-md) {
        align-self: auto;
        flex-direction: column-reverse;
        transform: translateY(-50px);
      }
    }

    &--right {
      align-self: flex-end;

      @media (min-width: $mq-md) {
        align-self: auto;
        transform: translateY(50px);
      }
    }

    &--green {
      color: var(--color-green-dark);

      #{$this}__step-card {
        background-color: var(--color-green-light);
      }
    }

    &--blue {
      color: var(--color-blue-dark);

      #{$this}__step-card {
        background-color: var(--color-blue-light);
      }
    }

    &--pink {
      color: var(--color-pink-dark);

      #{$this}__step-card {
        background-color: var(--color-pink-light);
      }
    }

    &--yellow {
      color: var(--color-yellow-dark);

      #{$this}__step-card {
        background-color: var(--color-yellow-light);
      }
    }
  }

  &__step-card {
    max-width: 195px;
    border-radius: 24px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    margin: 0 0 16px;

    @media (min-width: $mq-lg) {
      margin: 0;
    }
  }

  &__step-title {
    font-weight: 700;
    font-size: 20px;

    color: var(--color-text-brown);
    margin: 0 0 4px;

    @media (min-width: $mq-md) {
      font-size: 30px;
    }
  }

  &__step-desc {
    font-weight: 400;
    font-size: 14px;

    color: var(--color-text-brown);
  }

  &__step-image {
    z-index: 1;
    display: flex;
    width: 185px;
    height: 185px;

    mask-image: linear-gradient(
        to top,
        rgba(0, 0, 0, 1) 20%,
        rgba(0, 0, 0, 0.5) 100%);

    filter: brightness(70%);

    @media (min-width: $mq-sm) {
      width: 256px;
      height: 256px;
    }

    @media (min-width: $mq-xl) {
      width: 412px;
      height: 412px;
    }
  }

  &__description {
    display: flex;
    font-weight: 400;

    margin: 0 auto 20px;
    max-width: 460px;

    @media (min-width: $mq-lg) {
      margin: 0 auto 30px;
    }
  }

  &__link {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
