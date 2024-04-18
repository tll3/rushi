<template>
    <div class="card position-fixed m-2 top-0 start-0">
      <button class="btn btn-primary" @click="addTag">打标签</button>
    </div>
    <div v-for="(tag, index) in tags" class="tag" :style="tagStyle(tag)">
      <div class="tag-pannel">
        <span class="tag-content">{{ tag.label }}</span>
      </div>
    </div>
    <div class="tag" :style="newTagStyle(newTag)">
      <div class="tag-pannel">
        <span class="tag-content">{{ newTag?.label }}</span>
      </div>
    </div>
  </template>
  <script setup>
  import { useFiveEventCallback, useFiveProject2d } from "@realsee/five/vue";
  import { ref, reactive } from "vue";
  import { Vector3 } from "three";
  let newTag = ref(null);
  let tags = reactive([]);
  const project2d = useFiveProject2d();
  const intersectPoint = ref(new Vector3(0, 0, 0));
  useFiveEventCallback("intersectionOnModelUpdate", (intersect) => {
    // 更新三维点
    if (newTag.value) {
      intersectPoint.value = intersect.point;
      newTag.value.position = intersect.point;
    }
  });
  // 点击更新数组
  useFiveEventCallback("wantsTapGesture", () => {
    if (newTag.value && newTag.value.position) {
      tags.push(newTag.value);
      newTag.value = null;
      return false;
    }
  });
  const addTag = () => {
  if (!newTag.value) {
    newTag.value = {
      label: window.prompt("添加标签", "") || "未命名",
      position: new Vector3(0, 0, 0),
    };
  }
};
const tagStyle = (tag) => {
  return {
    left: project2d(tag.position, false).value?.x + "px",
    top: project2d(tag.position, false).value?.y + "px",
  };
};
const newTagStyle = (tag) => {
  if (tag) {
    return {
      left: project2d(tag.position, false).value?.x + "px",
      top: project2d(tag.position, false).value?.y + "px",
      display: "block",
    };
  }
  return {
    display: "none",
  };
};
</script>
<style>
.tag {
  position: absolute;
  width: 0;
  height: 0;
  transform: translateZ(0);
}
.tag-pannel {
  position: absolute;
  width: 100px;
  min-height: 20px;
  transform: translate(-50%, 0);
  left: 50%;
  bottom: 10px;
  background: #333;
  color: #fff;
  border-radius: 2px;
  text-align: center;
  line-height: 20px;
  padding: 8px;
  font-size: 14px;
}
.tag-pannel:after {
  content: "";
  display: block;
  position: absolute;
  width: 10px;
  height: 10px;
  left: 50%;
  bottom: -5px;
  transform: translate(-50%, 0) rotate(45deg);
  background: #333;
  pointer-events: none;
}
</style>