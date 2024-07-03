<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const props = defineProps({
  model: {
    type: String,
    required: true,
  },
  texture: {
    type: String,
    required: true,
  },
});

const canvas = ref<HTMLDivElement>();

const scene = new THREE.Scene();

const shadowSkew = ref(0);

const frontLight = new THREE.AmbientLight(0xffffff, 1);
frontLight.position.set(0, 0, 10);

const backLight = new THREE.AmbientLight(0xffffff, 2);
backLight.position.set(-30, 0, -30);

const leftLight = new THREE.DirectionalLight(0x404040, 5);
leftLight.position.set(-10, 0, 10);
leftLight.target.position.set(0, 0, 0);

const rightLight = new THREE.DirectionalLight(0x404040, 5);
rightLight.position.set(10, 0, 10);
rightLight.target.position.set(0, 0, 0);

const loader: any = new GLTFLoader();

const boardTexture = computed(() => {
  return new THREE.TextureLoader().load(props.texture);
});

const enableRotation = ref(false);

let renderer: any,
  controls: any,
  skateboard: any,
  camera: any,
  width: number,
  height: number;

onMounted(() => {
  width = document.documentElement.clientWidth - 50;
  height = document.documentElement.clientHeight - 50;

  camera = new THREE.PerspectiveCamera(90, width / height, 0.1, 1000);
  camera.position.set(0, 0, 1.3);
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  //controls = new OrbitControls(camera, renderer.domElement);
  //controls.enableMapping = false;
  //controls.target.set(0, 0, 0);

  if (canvas.value) {
    loader.load(
      props.model,
      (object: any) => {
        skateboard = object.scene.children[0];
        //scene.add(new THREE.AxesHelper());
        scene.add(frontLight);
        scene.add(leftLight);
        scene.add(rightLight);
        scene.add(backLight);

        skateboard.scale.set(2, 2, 2);
        skateboard.position.set(0, 0, 0);
        skateboard.rotation.set(THREE.MathUtils.degToRad(-90), 0, 0);
        skateboard.totalRotation = 0;

        skateboard.children[1].material.map = new THREE.TextureLoader().load(
          "./textures/Deck_Side/Deck_Side_Diffuse4k.png"
        );
        skateboard.children[1].material.needsUpdate = true;

        switchBoard();

        scene.add(skateboard);
      },
      (xhr) => {
        console.log("loading", xhr);
      },
      (e: any) => {
        console.log("error", e);
      }
    );

    renderer.setSize(width, height);
    renderer.setAnimationLoop(animation);
    canvas.value.appendChild(renderer.domElement);
  }
});

const switchBoard = () => {
  boardTexture.value.flipY = false;
  boardTexture.value.colorSpace = THREE.SRGBColorSpace;
  skateboard.children[2].material.map = boardTexture.value;
  skateboard.children[2].needsUpdate = true;
};

const animation = () => {
  if (enableRotation.value) {
    skateboard.rotation.z += 0.15;
    skateboard.totalRotation += 0.15;

    if (skateboard.totalRotation >= THREE.MathUtils.degToRad(180)) {
      switchBoard();

      if (skateboard.totalRotation >= THREE.MathUtils.degToRad(360)) {
        enableRotation.value = false;
        skateboard.rotation.z = 0;
        skateboard.totalRotation = 0;
      }
    }
  }
  renderer.render(scene, camera);
};

const mouseMoveHandler = (e: MouseEvent) => {
  if (!skateboard) return;
  const mouseX = e.clientX;
  shadowSkew.value = mouseX / width - 0.5;
  skateboard.rotation.z = shadowSkew.value;
};

watch(boardTexture, () => {
  enableRotation.value = true;
});
</script>

<template>
  <div class="canvas" @mousemove="mouseMoveHandler" ref="canvas"></div>
  <span class="shadow" :style="{ '--skew': -shadowSkew * 50 + 'deg' }"></span>
</template>

<style scoped>
.canvas {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  z-index: 3;
}
.shadow {
  position: absolute;
  z-index: 100;
  bottom: 15vh;
  left: 50%;
  transform: translateX(-50%) skewY(var(--skew));
  width: 8vw;
  height: 10px;
  border-radius: 50%;
  filter: blur(8px);
  background-color: #000;
}
</style>
