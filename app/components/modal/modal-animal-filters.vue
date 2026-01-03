<script setup lang="ts">
const modalStore = useModalStore()

</script>

<template>
  <modal-base
    width="900"
    title="Расширенный поиск"
    class="modal-animal-filters"
  >
    <animal-filters
      @apply="modalStore.props?.apply"
      @reset="modalStore.props?.reset"
    />
  </modal-base>
</template>

<style lang="scss">

</style>
