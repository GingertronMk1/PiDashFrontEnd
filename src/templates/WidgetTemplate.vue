<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({
  bodyClasses: {
    type: [String, Array],
    default: "flex flex-col",
  },
});
const computedBodyClasses = computed(() => {
  const { bodyClasses } = props;
  if (Array.isArray(bodyClasses)) {
    return bodyClasses.join(" ");
  }
  return bodyClasses.trim();
});
</script>
<template>
  <div class="widget">
    <h3
      v-if="$slots.header"
      class="flex flex-row justify-between items-center text-3xl"
    >
      <slot name="header" />
    </h3>
    <div :class="computedBodyClasses"><slot /></div>
  </div>
</template>
