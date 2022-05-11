<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({
  bodyClasses: {
    type: [String, Array],
    default: "flex flex-col",
  },
  headerIcon: {
    type: [String, Array],
    default: "",
  },
});

function joinIfArray(classes: string | string[]): string {
  return Array.isArray(classes) ? classes.join(" ") : classes;
}

const computedBodyClasses = computed(() => {
  return joinIfArray(props.bodyClasses);
});

const computedHeaderIcon = computed(() => {
  return joinIfArray(props.headerIcon);
});
</script>
<template>
  <div class="widget">
    <h3
      class="flex flex-row justify-between items-center text-3xl font-bold mb-2"
    >
      <span v-if="$slots.header">
        <slot name="header" />
      </span>
      <i v-if="computedHeaderIcon.length" :class="computedHeaderIcon" />
      <span v-if="$slots.header_additional">
        <slot name="header_additional" />
      </span>
    </h3>
    <div :class="computedBodyClasses"><slot /></div>
  </div>
</template>
