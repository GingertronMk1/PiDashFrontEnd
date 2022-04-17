<script setup>
import { ref } from "vue";
import Time from "@/components/Time.vue";
import CPU from "@/components/CPU.vue";
import Memory from "@/components/Memory.vue";
import Disk from "@/components/Disk.vue";
import Temperatures from "@/components/Temperatures.vue";
import Transmission from "@/components/Transmission.vue";
import Weather from "@/components/Weather.vue";
</script>
<template>
  <div class="widgets">
    <div class="widgets__column">
      <CPU />
      <Memory />
      <Disk />
      <Temperatures />
    </div>
    <div class="widgets__column">
      <Time />
      <Transmission />
      <Weather />
    </div>
  </div>
</template>
<style lang="scss">
@import "@/assets/style.scss";

h1 {
  text-align: center;
}

.widgets {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem 0;

  &__column {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 0 1rem;

    & > * + * {
      margin-top: 1rem;
    }
  }
}
</style>
