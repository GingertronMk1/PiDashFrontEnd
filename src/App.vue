<script setup>
import { ref } from "vue";
import CPU from "@/components/CPU.vue";
import Memory from "@/components/Memory.vue";
import Disk from "@/components/Disk.vue";
import Temperatures from "@/components/Temperatures.vue";
import Transmission from "@/components/Transmission.vue";

const data = ref({
  time: {
    function: () => new Date().toLocaleString(),
    data: new Date().toLocaleString(),
  },
  cpu: {
    url: "/cpu",
    data: null,
  },
  memory: {
    url: "/memory",
    data: null,
  },
  disk: {
    url: "/disk",
    data: null,
  },
  temperatures: {
    url: "/temperatures",
    data: null,
  },
  transmission: {
    url: "/transmission",
    data: null,
  },
});

const updateData = () => {
  Object.entries(data.value).forEach(([key, value]) => {
    if (value.url) {
      axios
        .get(value.url)
        .then(({ data: returnedData }) => (data.value[key].data = returnedData))
        .catch(console.error);
    } else if (value.function) {
      data.value[key].data = value.function();
    }
  });
};

updateData();
setInterval(updateData, 1000);
</script>
<template>
  <h1 v-text="data.time.data" />

  <div class="widgets">
    <div class="widgets__column">
      <CPU :data="data.cpu.data" />
      <Memory :data="data.memory.data" />
      <Disk :data="data.disk.data" />
      <Temperatures :data="data.temperatures.data" />
    </div>
    <div class="widgets__column">
      <Transmission :data="data.transmission.data" />
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

  &__column {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 1rem;

    & > * + * {
      margin-top: 1rem;
    }
  }
}
</style>
