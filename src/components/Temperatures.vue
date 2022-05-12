<script setup lang="ts">
import { AxiosKey, InitialiseWidgetKey } from "@/bootstrap";
import WidgetTemplate from "@/templates/WidgetTemplate.vue";
import { inject, Ref, ref } from "vue";

type TempsResponse = {
  [key: string]: TempsResponsePart;
};

type TempsResponsePart = {
  current: string;
};

type TempsProcessed = {
  key: string;
  title: string;
  temps: string;
}[];

const data: Ref<TempsProcessed> = ref([]);

const $axios = inject(AxiosKey);
function updateData() {
  $axios
    ?.get("/temperatures")
    ?.then(({ data: newData }: { data: TempsResponse }) => {
      const ret = Object.keys(newData).map((key: string) => {
        const { current }: TempsResponsePart = newData[key];
        return {
          key,
          title: key
            .split("_")
            .map((word) => word[0].toUpperCase() + word.slice(1))
            .join(" "),
          temps: `${Number.parseFloat(current).toFixed(2)}°C`,
        };
      }) as TempsProcessed;
      data.value = ret;
    });
}

inject(InitialiseWidgetKey)?.(updateData);
</script>
<template>
  <WidgetTemplate
    v-if="data"
    header-icon="fa-solid fa-temperature-three-quarters"
  >
    <template #header> Temperatures </template>
    <span v-for="temps in data" :key="temps.key">
      <strong v-text="temps.title" />: <span v-text="temps.temps" />
    </span>
  </WidgetTemplate>
</template>
