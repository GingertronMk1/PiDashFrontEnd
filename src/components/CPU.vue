<script setup>
import WidgetTemplate from "@/templates/WidgetTemplate.vue";
defineProps({
  data: {
    type: [null, Array],
    default: null,
  },
});

const defineBarColour = (core) => {
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
    <table>
      <thead>
        <th v-for="(core, index) in data" :key="index" v-text="index" />
      </thead>
      <tbody>
        <tr class="cpu-widget__graph-row">
          <td v-for="(core, index) in data" :key="`bar${index}`">
            <span
              class="cpu-widget__graph-bar"
              :style="{
                height: `${core}%`,
                backgroundColor: defineBarColour(core),
              }"
            />
          </td>
        </tr>
        <tr>
          <td
            v-for="(core, index) in data"
            :key="index"
            v-text="`${core.toFixed(0)}%`"
          />
        </tr>
      </tbody>
    </table>
  </WidgetTemplate>
</template>

<style lang="scss">
.cpu-widget {
  th {
    min-width: 3rem;
  }
  td {
    text-align: center;
  }

  &__graph-row > td {
    height: 5rem;
    min-height: 5rem;
    vertical-align: bottom;
  }

  &__graph-bar {
    display: flex;
    background-color: white;
    height: 100%;
    width: 100%;
    margin-top: auto;
  }
}
</style>
