<script setup lang="ts">
defineProps({
  boardDesigns: {
    type: Array,
    required: true,
  },
});

const list = ref<HTMLUListElement>();

const scroll = (direction: "up" | "down") => {
  if (direction === "down") {
    if (window.matchMedia("(min-width: 768px)").matches) {
      list.value.scrollTop += list.value.scrollTop + list.value.clientHeight;
    } else {
      list.value.scrollLeft += list.value.scrollLeft + list.value.clientWidth;
    }
  } else {
    if (window.matchMedia("(min-width: 768px)").matches) {
      list.value.scrollTop -= list.value.clientHeight;
    } else {
      list.value.scrollLeft -= list.value.clientWidth;
    }
  }
};
</script>

<template>
  <aside class="board-designs">
    <button @click="scroll('up')" class="board-designs__button up">
      <Icon icon="chevron-up-o" />
    </button>
    <ul ref="list" class="board-designs__list">
      <li
        v-for="board in [...boardDesigns, ...boardDesigns, ...boardDesigns]"
        class="board-designs__list-item"
      >
        <button @click="$emit('changePrint', board)">
          <img width="50" :src="board" alt="" />
        </button>
      </li>
    </ul>
    <button @click="scroll('down')" class="board-designs__button down">
      <Icon icon="chevron-down-o" />
    </button>
  </aside>
</template>

<style lang="scss" scoped>
.board-designs {
  position: absolute;
  z-index: 100;
  bottom: 0;
  left: 0;
  width: 100%;
  height: var(--sidebar-width);
  overflow: hidden;

  @media (min-width: pxToRem(768)) {
    bottom: auto;
    top: 0;
    width: var(--sidebar-width);
    height: 100vh;
  }

  &__list-item {
    list-style: none;

    button {
      background-color: transparent;
      border: none;
      cursor: pointer;
      padding: 0;
    }
  }

  &__list {
    display: flex;
    width: 100%;
    margin: 0;
    overflow: auto;
    scroll-behavior: smooth;
    &::-webkit-scrollbar {
      display: none;
    }

    @media (min-width: pxToRem(768)) {
      height: 100%;
      flex-direction: column;
      overflow-x: hidden;
      padding: pxToRem(25) 0;
    }
  }

  &__button {
    position: absolute;
    z-index: 2;
    left: 0;
    width: pxToRem(50);
    height: 100%;
    border-radius: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 pxToRem(10);

    @media (min-width: pxToRem(768)) {
      width: 100%;
      height: pxToRem(50);
      padding: pxToRem(10) 0;
    }

    .icon {
      width: pxToRem(20);
      height: pxToRem(20);
      color: white;
    }

    &.up {
      top: 0;
      left: 0;
      transform: rotate(-90deg);

      @media (min-width: pxToRem(768)) {
        top: 0;
        transform: rotate(0);
      }
    }
    &.down {
      top: 0;
      left: auto;
      right: 0;
      transform: rotate(-90deg);

      @media (min-width: pxToRem(768)) {
        bottom: 0;
        left: 0;
        right: auto;
        top: auto;
        transform: rotate(0);
      }
    }
  }
}
</style>
