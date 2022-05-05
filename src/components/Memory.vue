<script setup lang="ts">
import { ref } from "vue";
import WidgetTemplate from "@/templates/WidgetTemplate.vue";

const data = ref({});

function updateData() {
  axios.get("/memory").then(({ data: { available, total } }) => {
    data.value = {
      available: (Number.parseInt(available) / 1024 / 1024).toFixed(2),
      total: (Number.parseInt(total) / 1024 / 1024).toFixed(2),
    };
  });
}

initialiseWidget(updateData);
</script>
<template>
  <WidgetTemplate v-if="data">
    <template #header>Memory</template>
    <span v-text="`${data.available}MB available of ${data.total}MB`" />
  </WidgetTemplate>
</template>
