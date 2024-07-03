<script setup lang="ts"></script>

<template>
  <header class="controls">
    <button class="random" @click="$emit('changePrint')">Random</button>
    <Socials />
  </header>
</template>

<style lang="scss" scoped>
.controls {
  height: pxToRem(50);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 100;
  padding: 0 pxToRem(20);

  .random {
    margin-left: auto;
    position: fixed;
    top: pxToRem(80);
    left: 50%;
    transform: translateX(-50%);

    @media (min-width: pxToRem(768)) {
      position: absolute;
      top: pxToRem(10);
    }
  }
}
</style>
