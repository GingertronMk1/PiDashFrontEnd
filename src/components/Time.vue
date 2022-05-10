<script setup lang="ts">
import { InitialiseWidgetKey } from "@/symbols";
import WidgetTemplate from "@/templates/WidgetTemplate.vue";
import { inject, Ref, ref } from "vue";

const data: Ref<string> = ref(generateData());

function updateData() {
  data.value = generateData();
}

function generateData() {
  const d = new Date();
  return {
    date: d.toLocaleDateString(),
    time: d.toLocaleTimeString(),
  };
}

inject(InitialiseWidgetKey)?.(updateData, 10, false);
</script>
<template>
  <h1 class="widget text-8xl text-right font-bold">
    {{ data.date }}
    <br />
    {{ data.time }}
  </h1>
</template>
