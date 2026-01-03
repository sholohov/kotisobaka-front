<script setup lang="ts">
import HeartIcon from '~/assets/svg/heart-icon.svg'
</script>

<template>
  <modal-base
    title="Помощь нашим хвостикам"
    title-align="center"
    class="modal-with-qr"
    width="678"
  >
    <div class="modal-with-qr__title">
      С помощью QR-кода ваше пожертвование дойдёт быстро и безопасно
    </div>

    <img
      src="/img/qr-code.png"
      alt="qr-code"
      class="modal-with-qr__img"
    >

    <div class="modal-with-qr__description">
      <div class="modal-with-qr__details">
        <div class="modal-with-qr__details-title">
          Как это сделать:
        </div>

        <ul class="modal-with-qr__details-list">
          <li class="modal-with-qr__details-list-item">
            Откройте приложение вашего банка
          </li>
          <li class="modal-with-qr__details-list-item">
            Выберите функцию «Сканировать QR-код»
          </li>
          <li class="modal-with-qr__details-list-item">
            Наведите камеру на код ниже.
          </li>
          <li class="modal-with-qr__details-list-item">
            Подтвердите перевод (сумма любая)
          </li>
        </ul>
      </div>

      <div class="modal-with-qr__thanks">
        <heart-icon
          width="24"
          class="modal-with-qr__thanks-icon"
        />
        <div class="modal-with-qr__thanks-text">
          Спасибо, что делаете мир добрее!
        </div>
      </div>
    </div>
  </modal-base>
</template>

<style lang="scss">
.modal-with-qr {
  $this: 'modal-with-qr';

  &__title {
    padding: 0 10px;
    font-size: 18px;
    font-weight: 700;
    line-height: 1;
    color: var(--color-text-chocolate);
    text-align: center;
  }

  &__img {
    display: flex;
    margin: 30px auto;
  }

  &__description {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border: 1px solid var(--color-white);
    border-radius: 24px;
    background-color: var(--color-background-beige);
  }

  &__details {
    color: var(--color-text-brown);
    font-weight: 400;
  }

  &__details-list {
    list-style: decimal;
    margin: 4px 0;
    padding: 0 0 0 16px;
  }

  &__details-list-item {

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
    color: var(--color-pink-dark);
    font-weight: 700;
    font-size: 20px;
    line-height: 1;
    max-width: 216px;
    text-align: center;
  }
}
</style>
