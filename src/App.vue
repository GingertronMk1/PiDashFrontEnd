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
    <Time />
    <CPU />
    <Memory />
    <Disk />
    <Temperatures />
    <Transmission />
    <Weather />
  </div>
</template>
<style lang="scss">
@import "@/assets/style.scss";

h1 {
  text-align: center;
}

.widgets {
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  align-items: stretch;
  height: 100%;
  width: 100%;

  .widget {
    $margin: 0.5rem;
    max-width: calc(50% - calc($margin * 2));
    margin: $margin;
  }
}
</style>
