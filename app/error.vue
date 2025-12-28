<script setup lang="ts">
import { toRaw } from 'vue'

const error = useError()

if (import.meta.client) {
  // снимаем реактивность
  const rawError = toRaw(error.value ?? error)

  // выводим красиво
  console.group('%cNuxt Error', 'color: red; font-weight: bold;')
  console.log('Status:', rawError?.statusCode)
  console.log('Message:', rawError?.message)
  console.log('Stack:', rawError?.stack)
  console.groupEnd()
}

function handleBackEvent() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div
    class="error"
    :class="['error--' + error?.statusCode]"
  >
    <page-not-found
      v-if="error?.statusCode === 404"
      @back="handleBackEvent"
    />
    <page-internal-error
      v-else
      @back="handleBackEvent"
    />
  </div>
</template>

<style lang="scss">

</style>
