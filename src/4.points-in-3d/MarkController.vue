<template>
    <div class="card position-fixed m-2 top-0 start-0">
      <div class="form-check form-switch m-2">
        <input class="form-check-input" type="checkbox" v-model="isSwitch" />
        <label class="form-check-label" for="flexSwitchCheckDefault">标记</label>
      </div>
      <div class="js-marks" v-if="marks.length > 0">
        <p v-for="(v3, index) in marks" calss="badge bg-primary d-block m-2">
          <span
            >x={{ v3.x.toFixed(2) }} y={{ v3.y.toFixed(2) }} z={{
              v3.z.toFixed(2)
            }}</span
          >
          <i
            class="bi bi-x-circle ms-2"
            @click="
              () => {
                removeMark(index);
              }
            "
          ></i>
        </p>
      </div>
    </div>
  </template>
  <script setup>
  import {
    useFiveEventCallback,
    useFiveModelIntersectRaycaster,
  } from "@realsee/five/vue";
  import { Raycaster } from "three";
  import { ref } from "vue";
  const marks = ref([]);
  const isSwitch = ref(false);
  const raycasterRef = ref(new Raycaster());
  const fiveModelIntersectRaycaster = useFiveModelIntersectRaycaster();
  const intersect = fiveModelIntersectRaycaster(raycasterRef);
  useFiveEventCallback("wantsTapGesture", (raycaster, tapPosition) => {
  if (isSwitch.value) {
    raycasterRef.value = raycaster;
    if (intersect.value[0]?.point) marks.value.push(intersect.value[0]?.point);
    return false;
  }
});
const removeMark = (index) => {
  marks.value.splice(index, 1);
};
</script>