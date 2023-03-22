<template>
  <div ref="tiles" class="tiles">
    <div
      v-for="num in rows * cols"
      :key="num"
      ref="tile"
      class="tileyolo"
      @click="handleClick(num)"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import anime from "animejs";

const { $anime } = useNuxtApp();

const rows = ref(4);
const cols = ref(4);

const tiles = ref(null);

const colors = ["rgb(33, 235, 87)", "rgb(235, 50, 33)", "rgb(33, 232, 235)"];
const currentColor = ref(0);
const randomColor = ref(colors[currentColor.value]);

const handleClick = (index: number) => {
  currentColor.value = currentColor.value + 1;

  $anime({
    targets: ".tileyolo",
    background: colors[currentColor.value % 3],
    delay: $anime.stagger(50, { grid: [cols.value, rows.value], from: index }),
    duration: 3000,
  });
  // };

  // const showAnimation = () => {
  //   $anime({
  //     targets: "tileyolo",
  //     backgroundColor: colors[currentColor.value % 3],
  //     // delay: $anime.stagger(50, { grid: [cols.value, rows.value], from: index }),
  //     duration: 800,
  //   });
};

onMounted(() => {
  //   $anime({
  //     targets: ".tileyolo",
  //     width: "10px",
  //     // background: "rgb(255,255,255)",
  //     // delay: $anime.stagger(50, { grid: [cols.value, rows.value], from: 1 }),
  //     duration: 800,
  //   });
});
</script>

<style>
.tiles {
  width: calc(100% - 20px);
  height: 100%;
  /* background-color: transparent; */
  padding: 1px;
  position: relative;

  display: grid;
  grid-template-columns: repeat(v-bind(rows), 1fr);
  grid-template-rows: repeat(v-bind(cols), 1fr);
  grid-column-gap: 7.5%;
  grid-row-gap: 7.5%;
}

.tileyolo {
  background-color: v-bind(randomColor);
  cursor: pointer;
  position: relative;
}
/* .tileyolo:before {
  background-color: green;
  content: "";
  inset: 0.5px;
  position: absolute;
} */

.tileyolo:nth-child(16) {
  opacity: 0;
}
.tileyolo:nth-child(15) {
  opacity: 0;
}

.tileyolo:nth-child(14) {
  opacity: 0;
}

.tileyolo:nth-child(12) {
  opacity: 0;
}

.tileyolo:nth-child(11) {
  opacity: 0;
}

.tileyolo:nth-child(8) {
  opacity: 0;
}

.tileyolo:hover {
  opacity: 0.8;
}
</style>
