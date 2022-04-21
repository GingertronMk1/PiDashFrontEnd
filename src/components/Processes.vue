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
  <WidgetTemplate v-if="data" class="processes">
    <table>
      <thead>
        <th class="processes__column processes__column--pid">PID</th>
        <th class="processes__column processes__column--name">Name</th>
        <th class="processes__column processes__column--user">User</th>
        <th class="processes__column processes__column--cpu">CPU %</th>
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

<style lang="scss">
.processes {
  &__column {
    &--pid {
      width: 12.5%;
    }

    &--name {
      width: 40%;
    }

    &--user {
      width: 22.5%;
    }

    &--cpu {
      width: 12.5%;
    }
  }
}
</style>
