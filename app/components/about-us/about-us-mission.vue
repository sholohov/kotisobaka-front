<script setup lang="ts">

</script>

<template>
  <content-box>
    <div class="about-us-mission">
      <about-us-quote class="about-us-mission__intro">
        Мы сообщество единомышленников, где обычные люди объединяются ради одной цели — дарить бездомным животным
        заботу и надежду
      </about-us-quote>
      <div class="about-us-mission__description">
        В нашем сообществе собрались самые разные люди — учителя, врачи, студенты, пенсионеры, специалисты разных профессий. У каждого есть своя работа, семья и заботы, но после рабочих дел и домашних хлопот они находят время, чтобы помогать животным каждый день. Мы вместе лечим, выгуливаем, социализируем и ищем для хвостиков новые дома, потому что верим: маленькие добрые дела меняют большие судьбы.
      </div>
    </div>
  </content-box>
</template>

<style lang="scss">
.about-us-mission {
  $this: '.about-us-mission';

  @media (min-width: $mq-md) {
    padding: 40px 0;
  }

  &__description {

    @media (min-width: $mq-sm) {
      width: 50%;
      margin: 0 0 0 auto;
      max-width: 670px;
    }

    @media (min-width: $mq-md) {
      max-width: 800px;
      padding: 0 200px 0 0;
    }
  }
}
</style>
