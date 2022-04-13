<script setup>
import { computed } from "vue";
import WidgetTemplate from "@/templates/WidgetTemplate.vue";

const props = defineProps({
  data: {
    type: [null, Object],
    default: null,
  },
});

const computedData = computed(() => {
  const { data } = props;
  if (!data) {
    return {};
  }

  return {
    available: (Number.parseInt(data.available) / 1024 / 1024).toFixed(2),
    total: (Number.parseInt(data.total) / 1024 / 1024).toFixed(2),
  };
});
</script>
<template>
  <WidgetTemplate v-if="data">
    <template #header>Memory</template>
    <span
      v-text="
        `${computedData.available}MB available of ${computedData.total}MB`
      "
    />
  </WidgetTemplate>
</template>
