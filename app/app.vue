<template>
  <div class="coming-soon-container">
    <!-- Main background image -->
    <img
      ref="backgroundImage"
      :src="designImage"
      :alt="imageAlt"
      class="background-image"
      :class="{ 'image-loaded': imageLoaded, 'mobile-offset': isMobile }"
      @load="onImageLoad"
      @error="onImageError"
    />

    <!-- Loading overlay -->
    <div
      class="loading-overlay"
      :class="{ 'loading-hidden': !showLoading }"
    >
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <p class="loading-text">Загрузка...</p>
      </div>
    </div>

    <!-- Top centered text -->
    <div class="top-text" :class="{ 'text-visible': imageLoaded }">
      <h1 class="main-heading">Скоро здесь появится сайт, где каждый хвостик найдет свою семью</h1>
    </div>

    <!-- Bottom logo and text -->
    <div class="bottom-section" :class="{ 'logo-visible': imageLoaded }">
      <img
        src="/Logo.svg"
        alt="Logo"
        class="logo"
        @load="onLogoLoad"
        @error="onLogoError"
      />
    </div>

    <!-- Error message -->
    <div
      v-if="showError"
      class="error-overlay"
    >
      <div class="error-content">
        <p>Не удалось загрузить изображение</p>
        <p class="error-hint">Проверьте путь к файлу: {{ designImage }}</p>
        <button @click="retryLoading" class="retry-button">Попробовать снова</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Path to your background image - проверьте правильность пути!
const designImage = '/coming-soon-design.jpg'
const imageAlt = 'Сайт в разработке'

// States
const showLoading = ref(true)
const imageLoaded = ref(false)
const showError = ref(false)
const logoLoaded = ref(false)
const backgroundImage = ref(null)
const isMobile = ref(false)

// Check if mobile device
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

// Preload image to avoid caching issues
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

// Handle resize for mobile detection
const handleResize = () => {
  checkMobile()
}

// Auto-hide loading after shorter timeout
setTimeout(() => {
  if (showLoading.value && !imageLoaded.value) {
    console.log('⏰ Таймаут первоначальной загрузки')
    showLoading.value = false
    showError.value = true
  }
}, 8000)

// Preload image on component mount
onMounted(() => {
  console.log('🚀 Компонент монтирован, начинаем загрузку...')
  checkMobile()
  preloadImage()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style>
/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap');
</style>

<style scoped>
.coming-soon-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  font-family: 'Nunito', sans-serif;
}

/* Background image */
.background-image {
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
}

.background-image.image-loaded {
  opacity: 1;
  transform: scale(1);
}

/* Mobile offset - смещение на 5% влево относительно центра */
.background-image.mobile-offset {
  object-position: 55% center; /* 50% - 5% = 45% */
}

/* Loading overlay */
.loading-overlay {
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
}

.loading-overlay.loading-hidden {
  opacity: 0;
  pointer-events: none;
}

.loading-content {
  text-align: center;
  color: white;
  font-family: 'Nunito', sans-serif;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

.loading-text {
  font-size: 1.2rem;
  font-weight: 300;
  letter-spacing: 2px;
  margin: 0;
  opacity: 0.9;
  animation: pulse 2s ease-in-out infinite;
  font-family: 'Nunito', sans-serif;
}

/* Top text section */
.top-text {
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
}

.top-text.text-visible {
  opacity: 1;
}

.main-heading {
  font-size: 50px;
  color: white;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
  letter-spacing: 0.5px;
  font-family: 'Nunito', sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

/* Bottom section with logo and text */
.bottom-section {
  position: absolute;
  bottom: 5%;
  left: 5%;
  display: flex;
  align-items: center;
  gap: 20px;
  z-index: 3;
  opacity: 0;
  transition: opacity 0.8s ease-out 0.5s;
}

.bottom-section.logo-visible {
  opacity: 1;
}

.logo {
  height: 80px;
  width: auto;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.25));
}

/* Error overlay */
.error-overlay {
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
}

.error-content {
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

.error-content p {
  font-size: 1.3rem;
  margin-bottom: 10px;
  opacity: 0.9;
  font-family: 'Nunito', sans-serif;
}

.error-hint {
  font-size: 1rem !important;
  opacity: 0.7 !important;
  margin-bottom: 20px !important;
}

.retry-button {
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
}

.retry-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

/* Animations */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}

/* Responsive design */
@media (max-width: 768px) {
  .main-heading {
    font-size: 32px;
    padding: 0 20px;
  }

  .bottom-section {
    bottom: 3%;
    left: 3%;
    gap: 15px;
  }

  .logo {
    height: 60px;
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
  }

  .loading-text {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .main-heading {
    font-size: 24px;
  }

  .bottom-section {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }

  .logo {
    height: 50px;
  }
}

/* Альтернативный вариант смещения для очень маленьких экранов */
@media (max-width: 375px) {
  .background-image.mobile-offset {
    object-position: 40% center; /* Еще больше смещение для очень узких экранов */
  }
}

/* Для ландшафтной ориентации на мобильных */
@media (max-width: 768px) and (orientation: landscape) {
  .background-image.mobile-offset {
    object-position: 47% center; /* Меньшее смещение в ландшафте */
  }

  .top-text {
    top: 2%;
  }

  .main-heading {
    font-size: 24px;
  }

  .bottom-section {
    bottom: 2%;
  }
}
</style>