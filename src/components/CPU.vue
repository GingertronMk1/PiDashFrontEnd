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
    <div class="cpu-widget__graph">
      <div
        v-for="(core, index) in data"
        :key="`core${index}`"
        class="cpu-widget__line"
      >
        <span class="cpu-widget__cpu-number" v-text="index" />
        <span
          class="cpu-widget__bar"
          :style="{
            width: `${core}%`,
            backgroundColor: defineBarColour(core),
          }"
        />
        <span class="cpu-widget__cpu-percent" v-text="`${core.toFixed(0)}%`" />
      </div>
    </div>
  </WidgetTemplate>
</template>

<style lang="scss">
.cpu-widget {
  &__graph {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
  }

  &__line {
    height: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;

    & + & {
      margin-top: 1rem;
    }
  }

  &__cpu-number {
    width: 2rem;
    min-width: 2rem;
    max-width: 2rem;
  }

  &__cpu-percent {
    width: 4rem;
    min-width: 4rem;
    max-width: 4rem;
    text-align: right;
  }

  &__bar {
    margin-right: auto;
  }
}
</style>
