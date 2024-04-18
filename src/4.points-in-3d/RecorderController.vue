<template>
    <div class="card position-fixed m-2 top-0 start-0">
      <div class="btn-group align-items-center">
        <button class="btn btn-light " v-show="recordStart" @click="startRecord">
          <i class="bi bi-record-fill"></i>
        </button>
        <button class="btn btn-light " v-show="recordEnd" @click="stopRecord">
          <i class="bi bi-stop-fill"></i>
        </button>
        <button class="btn btn-light " v-show="playingStart" @click="playRecord">
          <i class="bi bi-play-fill"></i>
        </button>
        <p class="badge bg-primary m-2 " v-show="recording" @click="">录制中</p>
        <p class="badge bg-primary m-2 " v-show="playing" @click="">播放中</p>
      </div>
    </div>
</template>
<script setup>
  import { ref } from "vue";
  import { Recorder } from "./recorder";
  import { useFiveState, useFiveEventCallback } from "@realsee/five/vue";
  const recorder = new Recorder();
  const [state, setState] = useFiveState();
  const recordStart = ref(true);
  const recordEnd = ref(false);
  const playingStart = ref(true);
  const recording = ref(false);
  const playing = ref(false);
  useFiveEventCallback("stateChange", (state) => {
    if (recording.value === true) {
      recorder.record(state);
    }
  });
  const startRecord = () => {
  recorder.startRecording();
  recordStart.value = false;
  recordEnd.value = true;
  recording.value = true;
  playingStart.value = false;
};
const stopRecord = () => {
  recorder.endRecording();
  recordStart.value = true;
  recordEnd.value = false;
  recording.value = false;
  playingStart.value = true;
};
const playRecord = () => {
  recordStart.value = false;
  recordEnd.value = false;
  recording.value = false;
  playingStart.value = false;
  playing.value = true;
  const hasRecrod = recorder.play((state, isFinal) => {
    setState(state);
    if (isFinal) {
      recordStart.value = true;
      recordEnd.value = false;
      recording.value = false;
      playingStart.value = true;
      playing.value = false;
    }
  });
  if (!hasRecrod) {
    recordStart.value = true;
    recordEnd.value = false;
    recording.value = false;
    playingStart.value = true;
    playing.value = false;
  }
};
</script>  