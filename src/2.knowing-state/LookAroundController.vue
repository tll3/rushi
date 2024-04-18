<template>
    <div class="card position-fixed m-2 top-0 end-0">
      <button class="btn btn-light" v-show="isShow" @click="startFunc">
        <i class="bi bi-arrow-repeat"></i>
      </button>
      <button class="btn btn-light" v-show="!isShow" @click="stopFunc">
        <i class="bi bi-pause"></i>
      </button>
    </div>
  </template>
  <script setup>
  import { ref } from "vue";
  import { useFiveCurrentState } from "@realsee/five/vue";
  const [currentState, setState] = useFiveCurrentState();
  const isShow = ref(true);
  let timer;
  const startFunc = () => {
    window.clearInterval(timer);
    isShow.value = false;
    timer = window.setInterval(() => {
      setState({ longitude: currentState.value.longitude + Math.PI / 360 });
    }, 16);
  };
  const stopFunc = () => {
    window.clearInterval(timer);
    isShow.value = true;
  };
  </script>