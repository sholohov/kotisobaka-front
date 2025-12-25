<template>
  <div class="technical-works">
    <!-- Основной фон -->
    <img
      ref="backgroundImage"
      :src="designImage"
      :alt="imageAlt"
      class="technical-works__background"
      :class="{
        'technical-works__background--loaded': imageLoaded,
        'technical-works__background--mobile': isMobile,
      }"
      @load="onImageLoad"
      @error="onImageError"
    >

    <!-- Загрузка -->
    <div
      class="technical-works__loading"
      :class="{ 'technical-works__loading--hidden': !showLoading }"
    >
      <div class="technical-works__loading-content">
        <div class="technical-works__loading-spinner" />
        <p class="technical-works__loading-text">
          Загрузка...
        </p>
      </div>
    </div>

    <!-- Верхний текст -->
    <div
      class="technical-works__text"
      :class="{ 'technical-works__text--visible': imageLoaded }"
    >
      <h1 class="technical-works__heading">
        Скоро здесь появится сайт, где каждый хвостик найдет свою семью
      </h1>
    </div>

    <!-- Логотип -->
    <div
      class="technical-works__logo"
      :class="{ 'technical-works__logo--visible': imageLoaded }"
    >
      <img
        src="/Logo.svg"
        alt="Logo"
        class="technical-works__logo-image"
        @load="onLogoLoad"
        @error="onLogoError"
      >
    </div>

    <!-- Ошибка -->
    <div
      v-if="showError"
      class="technical-works__error"
    >
      <div class="technical-works__error-content">
        <p>Не удалось загрузить изображение</p>
        <p class="technical-works__error-hint">
          Проверьте путь к файлу: {{ designImage }}
        </p>
        <button
          class="technical-works__error-button"
          @click="retryLoading"
        >
          Попробовать снова
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const designImage = '/coming-soon-design.jpg'
const imageAlt = 'Сайт в разработке'
// Состояния
const showLoading = ref(true)
const imageLoaded = ref(false)
const showError = ref(false)
const logoLoaded = ref(false)
const backgroundImage = ref(null)
const isMobile = ref(false)

// Проверка мобильного устройства
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

const preloadImage = () => {
  const img = new Image()

  img.src = designImage
  img.onload = onImageLoad
  img.onerror = onImageError
}

const onImageLoad = () => {
  console.log('✅ Фоновое изображение загружено')
  imageLoaded.value = true

  setTimeout(() => {
    showLoading.value = false
  }, 500)
}

const onLogoLoad = () => {
  console.log('✅ Логотип загружен')
  logoLoaded.value = true
}

const onImageError = (error) => {
  console.error('❌ Ошибка загрузки фонового изображения:', error)
  showLoading.value = false
  showError.value = true
  imageLoaded.value = false
}

const onLogoError = () => {
  console.error('❌ Ошибка загрузки логотипа')
}

const retryLoading = () => {
  console.log('🔄 Повторная попытка загрузки...')
  showError.value = false
  showLoading.value = true
  imageLoaded.value = false
  logoLoaded.value = false

  if (backgroundImage.value) {
    const timestamp = new Date().getTime()

    backgroundImage.value.src = `${designImage}?t=${timestamp}`
  }

  setTimeout(() => {
    if (showLoading.value && !imageLoaded.value) {
      console.log('⏰ Таймаут повторной загрузки')
      showLoading.value = false
      showError.value = true
    }
  }, 5000)
}

// Ресайз
const handleResize = () => {
  checkMobile()
}

// Таймаут загрузки
setTimeout(() => {
  if (showLoading.value && !imageLoaded.value) {
    console.log('⏰ Таймаут первоначальной загрузки')
    showLoading.value = false
    showError.value = true
  }
}, 8000)

onMounted(() => {
  console.log('🚀 Компонент технических работ монтирован')
  checkMobile()
  preloadImage()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style lang="scss">
.technical-works {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  font-family: 'Nunito', sans-serif;

  &__background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    opacity: 0;
    transform: scale(1.05);
    transition: all 1s ease-out;
    filter: brightness(1);

    &--loaded {
      opacity: 1;
      transform: scale(1);
    }

    &--mobile {
      object-position: 55% center;
    }
  }

  &__loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    transition: all 0.6s ease-out;
    opacity: 1;

    &--hidden {
      opacity: 0;
      pointer-events: none;
    }

    &-content {
      text-align: center;
      color: white;
      font-family: 'Nunito', sans-serif;
    }

    &-spinner {
      width: 50px;
      height: 50px;
      border: 3px solid rgba(255, 255, 255, 0.3);
      border-top: 3px solid white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 20px;
    }

    &-text {
      font-size: 1.2rem;
      font-weight: 300;
      letter-spacing: 2px;
      margin: 0;
      opacity: 0.9;
      animation: pulse 2s ease-in-out infinite;
      font-family: 'Nunito', sans-serif;
    }
  }

  &__text {
    position: absolute;
    top: 4%;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    max-width: 1200px;
    text-align: center;
    z-index: 3;
    opacity: 0;
    transition: opacity 0.8s ease-out 0.3s;

    &--visible {
      opacity: 1;
    }
  }

  &__heading {
    font-size: 50px;
    color: white;
    font-weight: 700;
    margin: 0;
    line-height: 1.2;
    letter-spacing: 0.5px;
    font-family: 'Nunito', sans-serif;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  }

  &__logo {
    position: absolute;
    bottom: 5%;
    left: 5%;
    display: flex;
    align-items: center;
    gap: 20px;
    z-index: 3;
    opacity: 0;
    transition: opacity 0.8s ease-out 0.5s;

    &--visible {
      opacity: 1;
    }

    &-image {
      height: 80px;
      width: auto;
      filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.25));
    }
  }

  &__error {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 20;
    font-family: 'Nunito', sans-serif;

    &-content {
      text-align: center;
      color: white;
      padding: 40px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      backdrop-filter: blur(10px);
      font-family: 'Nunito', sans-serif;
      max-width: 500px;
      margin: 20px;
    }

    p {
      font-size: 1.3rem;
      margin-bottom: 10px;
      opacity: 0.9;
      font-family: 'Nunito', sans-serif;
    }

    &-hint {
      font-size: 1rem;
      opacity: 0.7;
      margin-bottom: 20px;
    }

    &-button {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 12px 30px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
      font-family: 'Nunito', sans-serif;

      &:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: translateY(-2px);
      }
    }
  }
}

// Анимации
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}

// Адаптивность
@media (max-width: 768px) {
  .technical-works {
    &__heading {
      font-size: 32px;
      padding: 0 20px;
    }

    &__logo {
      bottom: 3%;
      left: 3%;
      gap: 15px;

      &-image {
        height: 60px;
      }
    }

    &__loading {
      &-spinner {
        width: 40px;
        height: 40px;
      }

      &-text {
        font-size: 1rem;
      }
    }

    &__background--mobile {
      object-position: 55% center;
    }
  }
}

@media (max-width: 480px) {
  .technical-works {
    &__heading {
      font-size: 24px;
    }

    &__logo {
      flex-direction: column;
      gap: 10px;
      text-align: center;

      &-image {
        height: 50px;
      }
    }

    &__background--mobile {
      object-position: 60% center;
    }
  }
}

@media (max-width: 375px) {
  .technical-works {
    &__background--mobile {
      object-position: 65% center;
    }
  }
}

@media (max-width: 768px) and (orientation: landscape) {
  .technical-works {
    &__background--mobile {
      object-position: 47% center;
    }

    &__text {
      top: 2%;
    }

    &__heading {
      font-size: 24px;
    }

    &__logo {
      bottom: 2%;
    }
  }
}
</style>
