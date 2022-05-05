<script setup lang="ts">
import WidgetTemplate from "@/templates/WidgetTemplate.vue";
import { ref } from "vue";

const data = ref([]);

function updateData() {
  axios.get("/temperatures").then(({ data: newData }) => {
    const ret = Object.entries(newData).map(([key, { current }]) => ({
      title: key
        .split("_")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" "),
      temps: `${Number.parseFloat(current).toFixed(2)}°C`,
    }));
    data.value = ret;
  });
}

initialiseWidget(updateData);
</script>
<template>
  <WidgetTemplate v-if="data">
    <template #header>Temperatures</template>
    <span v-for="temps in data" :key="temps.key">
      <strong v-text="temps.title" />: <span v-text="temps.temps" />
    </span>
  </WidgetTemplate>
</template>

<style lang="scss"></style>
