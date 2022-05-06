<script setup lang="ts">
import WidgetTemplate from "@/templates/WidgetTemplate.vue";
import { inject, ref, Ref } from "vue";
import { InitialiseWidgetKey, AxiosKey } from "@/symbols";

const data: Ref<number[]> = ref([]);

const $axios = inject(AxiosKey);

function updateData() {
  $axios?.get("/cpu")?.then(({ data: newData }) => {
    data.value = newData;
  });
}

inject(InitialiseWidgetKey)?.(updateData);

const defineBarColour = (core: number) => {
  if (core > 75) {
    return "red";
  }
  if (core > 50) {
    return "orange";
  }
  if (core > 25) {
    return "yellow";
  }
  return "green";
};
</script>
<template>
  <WidgetTemplate v-if="data" class="cpu-widget">
    <template #header>CPU</template>
    <div class="cpu-widget__graph">
      <div
        v-for="(core, index) in data"
        :key="`core${index}`"
        class="cpu-widget__line"
      >
        <span class="cpu-widget__cpu-number" v-text="index" />
        <span
          class="cpu-widget__bar"
          :style="{
            width: `${core}%`,
            backgroundColor: defineBarColour(core),
          }"
        />
        <span class="cpu-widget__cpu-percent" v-text="`${core.toFixed(0)}%`" />
      </div>
    </div>
  </WidgetTemplate>
</template>
