<script setup lang="ts">
const route = useRoute()
const { history, results, hasResults, loading, query } = useSearch()
const rootRef = useTemplateRef('root')
const inputRef = useTemplateRef('input')
const isOpen = ref(false)

function handleToggleBtn() {
  isOpen.value = !isOpen.value
}

function handleAfterOpen() {
  inputRef.value?.focus()
}

function handleAfterClose() {
  query.value = ''
}

function handleSelectHistory(value: string) {
  query.value = value
}

watch(() => route.path, (newPath, oldPath) => {
  if (oldPath && oldPath !== newPath) {
    isOpen.value = false
  }
})

function handleClickOutside(event: MouseEvent) {
  if (rootRef.value && !rootRef.value.contains(event.target as Node)) {
    // isOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div
    ref="root"
    class="search-panel"
  >
    <transition
      name="search-panel__inner-"
      @after-enter="handleAfterOpen"
      @after-leave="handleAfterClose"
    >
      <div
        v-if="isOpen"
        class="search-panel__inner"
      >
        <div class="search-panel__input">
          <input
            ref="input"
            v-model="query"
            autocomplete="off"
            placeholder="Поиск по сайту"
            class="search-panel__input-element"
            name="search"
          >
        </div>
        <div
          v-if="query.length || history.length"
          class="search-panel__dropdown"
        >
          <search-panel-results
            v-if="query"
            class="search-panel__results"
            :results="results"
            :query="query"
            :has-results="hasResults"
            :loading="loading"
          />
          <search-panel-history
            v-else
            class="search-panel__history"
            :history="history"
            @select="handleSelectHistory"
          />
        </div>
      </div>
    </transition>

    <tooltip-box
      text="Поиск"
      position="bottom"
    >
      <btn-default
        class="search-panel__toggle-btn"
        :class="[{
          'search-panel__toggle-btn--is-open': isOpen
        }]"
        circle
        @click="handleToggleBtn"
      >
        <svg-icon :name="isOpen ? 'close-icon' : 'search-icon'" />
      </btn-default>
    </tooltip-box>
  </div>
</template>
<style lang="scss">
.search-panel {
  $this: '.search-panel';

  &__inner {
    position: absolute;
    inset: 0 0 0 auto;
    display: flex;
    flex-direction: column;
    width: 1000vh;
    max-width: calc(100vw - 20px);

    @media (min-width: $mq-sm) {
      max-width: calc(100vw - 40px);
    }

    @media (min-width: $mq-md) {
      max-width: calc(100vw - 260px);
    }

    @media (min-width: $mq-lg) {
      max-width: calc(100vw - 362px);
    }

    &--enter-active {
      transition: width 0.5s ease, opacity 0.5s ease;

      #{$this}__dropdown {
        transition: opacity 0.5s 0.4s ease, transform 0.5s 0.4s ease;
      }
    }

    &--leave-active {
      transition: width 0.3s 0.2s ease, opacity 0.3s 0.4s ease;

      #{$this}__dropdown {
        transition: opacity 0.3s ease, transform 0.3s ease;
      }
    }

    &--enter-from,
    &--leave-to {
      width: 88px;
      opacity: 0;

      #{$this}__dropdown {
        opacity: 0;
        transform: translateY(-10px);
      }
    }

    &--enter-to,
    &--leave-from {
      width: 1200px;
      opacity: 1;

      #{$this}__dropdown {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }

  &__toggle-btn {
    color: var(--color-beige-light);

    svg {
      color: var(--color-green);
    }

    &--is-open {
      svg {
        color: var(--color-text-chocolate);
      }
    }
  }

  &__input {
    display: flex;
    flex-direction: column;
    position: relative;
    margin: 0 44px 0 0;
  }

  &__input-element {
    display: flex;
    margin: 0 0 10px;
    height: 44px;
    border-radius: 24px;
    padding: 12px 20px;
    border: 1px solid var(--color-beige-light);
    background-color: var(--color-white);
    outline: none;
    font-size: inherit;
    color: inherit;

    &::placeholder {
      color: var(--color-beige-light);
      opacity: 1;
      transition: color 0.3s ease;
    }
  }

  &__input-clear {
    position: absolute;
    inset: 4px 4px 0 auto;
  }

  &__dropdown {
    border-radius: 24px;
    background-color: var(--color-white);
    border: 1px solid var(--color-beige-light);
  }
}
</style>
