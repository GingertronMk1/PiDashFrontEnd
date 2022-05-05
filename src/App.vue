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
  <div class="widgets">
    <Time />
    <CPU />
    <Processes />
    <Temperatures />
    <Memory />
    <Disk />
    <Transmission />
    <Weather />
  </div>
</template>
<style lang="scss">
@import "@/assets/style.scss";

h1 {
  text-align: center;
}

@mixin smallerScreen() {
  @media (max-width: 1023px) {
    @content;
  }
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
  @include smallerScreen {
    flex-wrap: nowrap;
  }

  .widget {
    max-width: calc(50% - calc($widget-margin * 2));
    margin: $widget-margin;
    display: flex;
    flex-direction: column;

    @include smallerScreen {
      max-width: calc(100% - calc($widget-margin * 2));
      min-width: calc(100% - calc($widget-margin * 2));
    }
  }
}
</style>
