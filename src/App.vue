<script setup lang="ts">
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
  const title = document.querySelector<HTMLTitleElement>("title");
  if (title) {
    if (document.hasFocus()) {
      title.innerText = "Pi Dashboard";
    } else {
      title.innerText = "Pi Dashboard (idle)";
    }
  }
}, 1000);
</script>
<template>
  <Time />
  <CPU />
  <Processes />
  <Temperatures />
  <Memory />
  <Disk />
  <Transmission />
  <Weather />
</template>
