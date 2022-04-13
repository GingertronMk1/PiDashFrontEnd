<script setup>
import WidgetTemplate from "@/templates/WidgetTemplate.vue";
import { computed } from "vue";
const props = defineProps({
  data: {
    type: [null, Object],
    default: null,
  },
});

const computedData = computed(() => {
  if (Object.keys(props.data).length === 0) {
    return [];
  }
  return Object.entries(props.data).map(([key, value]) => ({
    title: key
      .split("_")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" "),
    temps: value.map(({ current }) => `${current.toFixed(2)}°C`).join(", "),
  }));
});
</script>
<template>
  <WidgetTemplate v-if="data">
    <template #header>Temperatures</template>
    <span v-for="temps in computedData" :key="temps.key">
      <strong v-text="temps.title" />: <span v-text="temps.temps" />
    </span>
  </WidgetTemplate>
</template>

<style lang="scss"></style>
