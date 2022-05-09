<script setup lang="ts">
import { AxiosKey, InitialiseWidgetKey } from "@/symbols";
import WidgetTemplate from "@/templates/WidgetTemplate.vue";
import { inject, Ref, ref } from "vue";

type ProcessesResponse = {
  name: string;
  username: string;
  cpu_percent: number;
  memory_percent: number;
};

type ProcessesProcessed = ProcessesResponse & {
  cpu_percent_toFixed: string;
  memory_percent_toFixed: string;
};

const data: Ref<ProcessesProcessed[] | null> = ref(null);

const $axios = inject(AxiosKey);
function updateData() {
  $axios
    ?.get("/processes", {
      params: {
        arguments: ["name", "username", "cpu_percent", "memory_percent"],
      },
    })
    ?.then(
      ({ data: newData }) =>
        (data.value = newData
          .reduce((acc: ProcessesResponse[], item: ProcessesResponse) => {
            if (!acc.map(({ name }) => name).includes(item.name)) {
              acc.push(item);
            } else {
              const index = acc.map(({ name }) => name).indexOf(item.name);
              const currentItem = acc[index];
              acc[index] = {
                ...currentItem,
                cpu_percent: currentItem.cpu_percent + item.cpu_percent,
                memory_percent:
                  currentItem.memory_percent + item.memory_percent,
              };
            }
            return acc;
          }, [])
          .sort((a: ProcessesResponse, b: ProcessesResponse) => {
            const cpu_diff = b.cpu_percent - a.cpu_percent;
            if (cpu_diff !== 0) {
              return cpu_diff;
            }
            return b.memory_percent - a.memory_percent;
          })
          .map((item: ProcessesResponse) => ({
            ...item,
            cpu_percent_toFixed: item.cpu_percent.toFixed(0) + "%",
            memory_percent_toFixed: item.memory_percent.toFixed(0) + "%",
          })))
    );
}

inject(InitialiseWidgetKey)?.(updateData);
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
          v-for="(process, index) in data.filter((item: ProcessesProcessed, index: number) => index < 5)"
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
