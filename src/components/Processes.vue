<script setup>
import WidgetTemplate from "@/templates/WidgetTemplate.vue";
import { ref } from "vue";

const data = ref(null);

function updateData() {
  axios
    .get("/processes", {
      params: {
        arguments: ["pid", "name", "username", "cpu_percent"],
      },
    })
    .then(
      ({ data: newData }) =>
        (data.value = newData.sort((a, b) => b.cpu_percent - a.cpu_percent))
    );
}

initialiseWidget(updateData);
</script>
<template>
  <WidgetTemplate v-if="data">
    <table>
      <thead>
        <th>PID</th>
        <th>Name</th>
        <th>User</th>
        <th>CPU %</th>
      </thead>
      <tbody>
        <tr
          v-for="(process, index) in data.filter((item, index) => index < 5)"
          :key="index"
        >
          <td v-text="process.pid" />
          <td v-text="process.name" />
          <td v-text="process.username" />
          <td v-text="process.cpu_percent" />
        </tr>
      </tbody>
    </table>
  </WidgetTemplate>
</template>

<style lang="scss"></style>
