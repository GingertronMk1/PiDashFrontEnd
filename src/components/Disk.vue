<script setup>
import { ref } from "vue";
import WidgetTemplate from "@/templates/WidgetTemplate.vue";

const data = ref({});

const diskInfoToHuman = ({ used, free, total, percent }) => {
  return {
    used: `${bytesToOther(used, "G")}GB`,
    free: `${bytesToOther(free, "G")}GB`,
    total: `${bytesToOther(total, "G")}GB`,
    percent: `${percent}%`,
  };
};

function updateData() {
  axios.get("/disk").then(({ data: newData }) => {
    Object.entries(newData).forEach(([key, value]) => {
      data.value[key] = diskInfoToHuman(value);
    });
  });
}

updateData();
initialiseWidget(updateData);
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
