<template>
  <FiveProvider :work="work" :fiveInitArgs="fiveInitArgs">
    <FiveCanvas :width="width" :height="height" />
    <ModeController />
    // highlight-start
    <TaggingController />
    // highlight-end
  </FiveProvider>
</template>
<script setup>
import { FiveProvider, FiveCanvas } from "@realsee/five/vue";
import { parseWork } from "@realsee/five";
import { ref } from "vue";
import { useWindowDimensions } from "./useWindowDimensions";
import ModeController from "./ModeController.vue";
import ModelViewPlugin from "@realsee/dnalogel/libs/ModelViewPlugin"
// highlight-start
import TaggingController from "./TaggingController.vue";
// highlight-end
const fiveInitArgs = {
    plugins: [
        [
            ModelViewPlugin,
            'modelViewPlugin', // 自定义插件名称
            {
                // 参数配置
            }
        ]
    ]
}
const work = ref();
const workURL =
  "https://vrlab-public.ljcdn.com/release/static/image/release/five/work-sample/07bdc58f413bc5494f05c7cbb5cbdce4/work.json";
fetch(workURL)
  .then((response) => response.text())
  .then((text) => (work.value = parseWork(text)));
const { width, height } = useWindowDimensions();
</script>