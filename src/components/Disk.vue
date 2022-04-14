<script setup>
import { computed } from "vue";
import WidgetTemplate from "@/templates/WidgetTemplate.vue";

const props = defineProps({
  data: {
    type: [null, Object],
    default: null,
  },
});

const bytesToGigaBytes = (bytes) => (bytes / 1024 ** 3).toFixed(2);

const diskInfoToHuman = ({ used, free, total, percent }) => {
  return {
    used: `${bytesToGigaBytes(used)}GB`,
    free: `${bytesToGigaBytes(free)}GB`,
    total: `${bytesToGigaBytes(total)}GB`,
    percent: `${percent}%`,
  };
};

const computedData = computed(() => {
  const { data } = props;
  const ret = {};
  if (!data) {
    return ret;
  }

  Object.entries(data).forEach(([key, value]) => {
    ret[key] = diskInfoToHuman(value);
  });
  return ret;
});
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
        <tr v-for="(stats, mountpoint) in computedData" :key="mountpoint">
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
