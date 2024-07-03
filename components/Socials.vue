<script setup lang="ts"></script>

<template>
  <nav class="socials">
    <a href="https://www.instagram.com/sk8.it" target="_blank">
      <Icon icon="instagram-o" />
    </a>
    <a href="https://www.facebook.com/esk8it" target="_blank">
      <Icon icon="facebook-o" />
    </a>
  </nav>
</template>

<style lang="scss" scoped>
.socials {
  margin-left: auto;
  display: flex;
  gap: pxToRem(10);
  a {
    padding: 0;
    color: white;
  }
  .icon {
    width: pxToRem(24);
    height: pxToRem(24);
  }
}
</style>
