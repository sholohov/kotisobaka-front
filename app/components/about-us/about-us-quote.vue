<template>
  <h2 class="about-us-quote">
    <slot />
  </h2>
</template>

<style lang="scss">
.about-us-quote {
  $this: '.about-us-quote';

  font-weight: 800;
  font-size: 26px;

  text-transform: uppercase;
  color: var(--color-green-dark);
  margin: 0 0 20px;

  @media (min-width: $mq-sm) {
    font-size: 30px;
    margin: 0 0 30px auto;
    max-width: 1024px;
    text-indent: 2em;
  }

  @media (min-width: $mq-md) {
    text-indent: 4em;
    max-width: 1200px;
  }
}
</style>
