<script setup lang="ts">
import { LazyModalDonateWithQr, LazyModalDonateWithGuide } from '#components'
import type { ModalPropsMap } from '~/stores/modal';
const modalStore = useModalStore()

const components: Record<keyof ModalPropsMap, Component> = {
  'donate-with-qr': LazyModalDonateWithQr,
  'donate-with-guide': LazyModalDonateWithGuide,
}
</script>

<template>
  <component
    :is="components[modalStore.name]"
    v-if="modalStore.name"
    v-bind="modalStore.props ?? {}"
  />
</template>
