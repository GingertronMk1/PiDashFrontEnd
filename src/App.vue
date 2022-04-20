<script setup>
import { ref } from "vue";
import Time from "@/components/Time.vue";
import CPU from "@/components/CPU.vue";
import Memory from "@/components/Memory.vue";
import Disk from "@/components/Disk.vue";
import Temperatures from "@/components/Temperatures.vue";
import Transmission from "@/components/Transmission.vue";
import Weather from "@/components/Weather.vue";
import Processes from "@/components/Processes.vue";

setInterval(() => {
  if (document.hasFocus()) {
    document.querySelector("title").innerText = "Pi Dashboard";
  } else {
    document.querySelector("title").innerText = "Pi Dashboard (idle)";
  }
}, 1000);
</script>
<template>
  <div class="widgets">
    <Time />
    <CPU />
    <Processes />
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
  $widget-margin: 0.5rem;
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  align-items: stretch;
  height: 100%;
  width: 100%;
  padding: $widget-margin;

  .widget {
    max-width: calc(50% - calc($widget-margin * 2));
    margin: $widget-margin;
  }
}
</style>
