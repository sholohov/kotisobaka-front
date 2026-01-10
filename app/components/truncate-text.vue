<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'

const props = defineProps<{
  text: string
  height: number
}>()

const displayText = ref(props.text)
const container = ref<HTMLDivElement>()

async function truncate() {
  if (!container.value) return
  displayText.value = props.text

  await nextTick()

  // если текст не помещается — обрезаем постепенно
  while (container.value.scrollHeight > props.height && displayText.value.length > 0) {
    displayText.value = displayText.value.slice(0, -10) // режем блоками, а не по одному символу
    await nextTick()
  }

  if (displayText.value !== props.text) {
    displayText.value = displayText.value.trim() + '…'
  }
}

onMounted(truncate)
watch(() => props.text, truncate)
</script>

<template>
  <div
    ref="container"
    class="truncate-text"
    :style="{ maxHeight: props.height + 'px' }"
  >
    {{ displayText }}
  </div>
</template>

<style lang="scss">
.truncate-text {
  overflow: hidden;
}
</style>
