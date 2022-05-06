<script setup lang="ts">
import { inject, ref, Ref } from "vue";
import WidgetTemplate from "@/templates/WidgetTemplate.vue";
import { AxiosKey, BytesToOtherKey, InitialiseWidgetKey } from "@/symbols";

type DiskInfoResponse = {
  [mountpoint: string]: DiskInfoPart;
};

type DiskInfoPart = {
  total: number;
  free: number;
  used: number;
  percent: number;
};

type DiskInfoProcessedResponse = {
  [mountpoint: string]: DiskInfoProcessedPart;
};

type DiskInfoProcessedPart = {
  total: string;
  free: string;
  used: string;
  percent: string;
};

const data: Ref<DiskInfoProcessedResponse> = ref({});

const bytesToOther = inject(BytesToOtherKey);

const diskInfoToHuman = ({ used, free, total, percent }: DiskInfoPart) => {
  return {
    used: bytesToOther?.(used),
    free: bytesToOther?.(free),
    total: bytesToOther?.(total),
    percent: `${percent}%`,
  } as DiskInfoProcessedPart;
};

function updateData() {
  inject(AxiosKey)
    ?.get("/disk")
    ?.then(({ data: newData }: { data: DiskInfoResponse }) => {
      Object.keys(newData).forEach((mountpoint: string) => {
        if (mountpoint !== null && newData[mountpoint] !== null) {
          data.value[mountpoint] = diskInfoToHuman(newData[mountpoint]);
        }
      });
    });
}

inject(InitialiseWidgetKey)?.(updateData);
</script>
<template>
  <WidgetTemplate v-if="data">
    <template #header>Disk</template>
    <table>
      <thead>
        <th>Mount Point</th>
        <th>Used</th>
        <th>Free</th>
        <th>Total</th>
        <th>% Used</th>
      </thead>
      <tbody>
        <tr v-for="(stats, mountpoint) in data" :key="mountpoint">
          <td v-text="mountpoint" />
          <td v-text="stats.used" />
          <td v-text="stats.free" />
          <td v-text="stats.total" />
          <td v-text="stats.percent" />
        </tr>
      </tbody>
    </table>
  </WidgetTemplate>
</template>
