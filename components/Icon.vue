<script setup lang="ts">
defineProps({
  icon: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <svg class="icon">
    <use :href="`./icons/${icon}.svg#s`" />
  </svg>
</template>

<style scoped>
.icon {
  display: flex;
  width: 100%;
  fill: currentColor;
}
</style>
