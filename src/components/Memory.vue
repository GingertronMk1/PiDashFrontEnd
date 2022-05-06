<script setup lang="ts">
import { inject, Ref, ref } from "vue";
import WidgetTemplate from "@/templates/WidgetTemplate.vue";
import { AxiosKey, InitialiseWidgetKey } from "@/symbols";

type MemoryData = {
  available: string;
  total: string;
};

type MemoryResponse = {
  available: number;
  total: number;
};

const data: Ref<MemoryData | null> = ref(null);

function updateData() {
  inject(AxiosKey)
    ?.get("/memory")
    ?.then((response: { data: MemoryResponse }) => {
      const { available, total } = response.data;
      data.value = {
        available: (available / 1024 / 1024).toFixed(2),
        total: (total / 1024 / 1024).toFixed(2),
      } as MemoryData;
    });
}

inject(InitialiseWidgetKey)?.(updateData);
</script>
<template>
  <WidgetTemplate v-if="data">
    <template #header>Memory</template>
    <span v-text="`${data.available}MB available of ${data.total}MB`" />
  </WidgetTemplate>
</template>
