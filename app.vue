<script setup>
const boardModel = ref("./models/board.glb");

const boardDesigns = [
  "./textures/boards/board_timmy_texture.png",
  "./textures/boards/board_sr3pp_texture.png",
  "./textures/boards/dollars.png",
  "./textures/boards/board_w8_texture.png",
  "./textures/boards/travel-dogs.png",
];

const getTexture = () => {
  return boardDesigns[Math.floor(Math.random() * boardDesigns.length)];
};

const boardTexture = ref(getTexture());

const changePrint = (board) => {
  if (!board) {
    boardTexture.value = getTexture();
  } else {
    boardTexture.value = board;
  }
};
</script>

<template>
  <main class="main-app">
    <NuxtRouteAnnouncer />

    <Controls @changePrint="changePrint" />

    <BoardGallery :boardDesigns="boardDesigns" @changePrint="changePrint" />

    <ThreeObj :model="boardModel" :texture="boardTexture" />

    <Logo class="logo" />
  </main>
</template>

<style lang="scss">
:root {
  --sidebar-width: 50px;
}

.main-app {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-image: url("/textures/griptape.jpeg");
    background-position: center;
    background-repeat: repeat;
    opacity: 0.3;
    mix-blend-mode: overlay;
  }

  .logo {
    position: fixed;
    bottom: calc(100% - pxToRem(60));
    left: pxToRem(20);
    width: pxToRem(100);
    border-radius: pxToRem(10);

    @media (min-width: pxToRem(768)) {
      bottom: pxToRem(20);
      left: auto;
      right: pxToRem(20);
    }
  }

  .griptape {
    position: absolute;
    z-index: 1;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    opacity: 0.3;
    mix-blend-mode: overlay;
  }
}
</style>
