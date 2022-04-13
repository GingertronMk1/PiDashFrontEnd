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
    available: (Number.parseInt(data.free) / 1024 ** 3).toFixed(2),
    total: (Number.parseInt(data.total) / 1024 ** 3).toFixed(2),
  };
});
</script>
<template>
  <WidgetTemplate v-if="data">
    <template #header>Disk</template>
    <span
      v-text="
        `${computedData.available}GB available of ${computedData.total}GB`
      "
    />
  </WidgetTemplate>
</template>
