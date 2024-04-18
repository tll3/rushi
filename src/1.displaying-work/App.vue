<template>
    <FiveProvider :work="work">
    <FiveCanvas :width="width" :height="height" />
    <ModeController />
    </FiveProvider>
</template>
<script setup>
    import { FiveProvider, FiveCanvas } from "@realsee/five/vue";
    import { parseWork } from "@realsee/five";
    import { ref } from "vue";
    import { useWindowDimensions } from "./useWindowDimensions";
    import ModeController from "./ModeController.vue";
    const work = ref();
    const workURL = 
        "https://vrlab-public.ljcdn.com/release/static/image/release/five/work-sample/07bdc58f413bc5494f05c7cbb5cbdce4/work.json";
    fetch(workURL)
        .then((response) => response.text())
        .then((text) => (work.value = parseWork(text)));
    const { width, height } = useWindowDimensions();
</script>
