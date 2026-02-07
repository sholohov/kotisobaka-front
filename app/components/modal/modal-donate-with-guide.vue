<script setup lang="ts">
const ERIP_CODE = '4661641'
const isCopySucces = ref(false)

function handleCopyCodeBtn() {
  if (isCopySucces.value) {
    return
  }

  copyToClipboard(ERIP_CODE)
  isCopySucces.value = true

  setTimeout(() => {
    isCopySucces.value = false
  }, 2000)
}
</script>

<template>
  <modal-base
    title="Помощь нашим хвостикам"
    title-align="center"
    class="modal-donate-with-guide"
  >
    <div class="modal-donate-with-guide__title">
      Инструкция по оплате через ЕРИП
    </div>
    <div class="modal-donate-with-guide__description">
      <div class="modal-donate-with-guide__description-title">
        Как это сделать:
      </div>
      <ul class="modal-donate-with-guide__description-list">
        <li class="modal-donate-with-guide__description-list-item">
          Откройте приложение вашего банка
        </li>
        <li class="modal-donate-with-guide__description-list-item">
          Найдите раздел «ЕРИП»
        </li>
        <li class="modal-donate-with-guide__description-list-item">
          Выберите путь:
          <div
            v-for="item in [
              'Расчёт →',
              'Благотворительность →',
              'Защита животных →',
              'КиС →',
              'Добровольные взносы'
            ]"
            :key="item"
            class="modal-donate-with-guide__path-item"
          >
            {{ item }}
          </div>
        </li>
        <li class="modal-donate-with-guide__description-list-item">
          Введите ваш номер телефона и сумму
        </li>
        <li class="modal-donate-with-guide__description-list-item">
          Подтвердите платёж
        </li>
      </ul>

      <div class="modal-donate-with-guide__copy-code">
        <btn-default
          class="modal-donate-with-guide__copy-code-btn"
          style="flex: 1"
          @click="handleCopyCodeBtn"
        >
          <template v-if="isCopySucces">
            Код скопирован
          </template>
          <template v-else>
            Код услуги {{ ERIP_CODE }}
          </template>
        </btn-default>
        <btn-default
          circle
          class="modal-donate-with-guide__copy-code-btn"
          @click="handleCopyCodeBtn"
        >
          <svg-icon
            v-if="isCopySucces"
            name="checkbox-icon"
          />
          <svg-icon
            v-else
            name="copy-icon"
          />
        </btn-default>
      </div>

      <div class="modal-donate-with-guide__thanks">
        <svg-icon
          name="heart-icon"
          class="modal-donate-with-guide__thanks-icon"
        />
        <div class="modal-donate-with-guide__thanks-text">
          Спасибо, что делаете мир добрее!
        </div>
      </div>
    </div>
  </modal-base>
</template>

<style lang="scss">
.modal-donate-with-guide {
  $this: 'modal-donate-with-guide';

  &__title {
    color: var(--color-text-chocolate);
    text-align: center;
    margin: 0 0 20px;
  }

  &__description {
    padding: 20px;
    border: 1px solid var(--color-white);
    border-radius: 24px;
    background-color: var(--color-background-beige);
  }

  &__description-title {
    font-weight: 700;
  }

  &__description-list {
    list-style: decimal;
    padding: 0 0 0 16px;
    margin: 0 0 20px;
  }

  &__path-item {
    font-weight: 700;
    color: var(--color-pink-dark);
  }

  &__thanks {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  &__thanks-icon {
    display: inline-flex;
    color: var(--color-orange);
  }

  &__thanks-text {
    color: var(--color-pink-dark);
    font-weight: 700;
    font-size: 16px;
    text-align: center;
  }

  &__copy-code {
    display: flex;
    align-items: center;
    margin: 0 0 10px;
  }

  &__copy-code-btn {
    color: var(--color-blue);
  }
}
</style>
