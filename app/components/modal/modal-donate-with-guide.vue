<script setup lang="ts">

import HeartIcon from "~/assets/svg/heart-icon.svg";
</script>

<template>
  <ModalBase
    title="Помощь нашим хвостикам"
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

      <div class="modal-donate-with-guide__thanks">
        <heart-icon
          width="24"
          class="modal-donate-with-guide__thanks-icon"
        />
        <div class="modal-donate-with-guide__thanks-text">
          Спасибо, что делаете мир добрее!
        </div>
      </div>
    </div>
  </ModalBase>
</template>

<style lang="scss">
.modal-donate-with-guide {
  $this: 'modal-donate-with-guide';

  &__title {
    color: var(--color-chocolate);
    text-align: center;
    margin: 0 0 20px;
  }

  &__description {
    padding: 20px;
    border: 1px solid var(--color-white);
    border-radius: 24px;
    background-color: var(--color-beige-lightest);
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
    color: var(--color-dark-pink);
  }

  &__thanks {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  &__thanks-icon {
    display: inline-flex;
    color: var(--color-orange);
    margin: 0 0 10px;
  }

  &__thanks-text {
    color: var(--color-dark-pink);
    font-weight: 700;
    font-size: 16px;
    line-height: 1.2;
    max-width: 216px;
    text-align: center;
  }
}
</style>
