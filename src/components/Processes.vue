<script setup>
import WidgetTemplate from "@/templates/WidgetTemplate.vue";
import { ref } from "vue";

const data = ref(null);

function updateData() {
  axios
    .get("/processes", {
      params: {
        arguments: ["name", "username", "cpu_percent", "memory_percent"],
      },
    })
    .then(
      ({ data: newData }) =>
        (data.value = newData
          .map((item) => ({
            ...item,
            cpu_percent_toFixed: item.cpu_percent.toFixed(0) + "%",
            memory_percent_toFixed: item.memory_percent.toFixed(0) + "%",
          }))
          .sort((a, b) => b.cpu_percent - a.cpu_percent))
    );
}

initialiseWidget(updateData);
</script>
<template>
  <WidgetTemplate v-if="data" class="processes">
    <table>
      <thead>
        <th class="processes__column processes__column--name">Name</th>
        <th class="processes__column processes__column--user">User</th>
        <th class="processes__column processes__column--cpu">CPU</th>
        <th class="processes__column processes__column--memory">RAM</th>
      </thead>
      <tbody>
        <tr
          v-for="(process, index) in data.filter((item, index) => index < 5)"
          :key="index"
        >
          <td v-text="process.name" />
          <td v-text="process.username" />
          <td v-text="process.cpu_percent_toFixed" />
          <td v-text="process.memory_percent_toFixed" />
        </tr>
      </tbody>
    </table>
  </WidgetTemplate>
</template>

<style lang="scss">
.processes {
  &__column {
    &--name {
      width: 45%;
    }

    &--user {
      width: 25%;
    }

    &--cpu,
    &--memory {
      width: 15%;
    }
  }
}
</style>
