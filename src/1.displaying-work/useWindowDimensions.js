import { ref, onBeforeUnmount } from "vue";
function useWindowDimensions() {
  const width = ref(window.innerWidth);
  const height = ref(window.innerHeight);
  const listener = () => {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  };
  window.addEventListener("resize", listener, false);
  onBeforeUnmount(() => {
    window.removeEventListener("resize", listener, false);
  });
  return { width, height };
}
export { useWindowDimensions };