<script setup>
import { ref } from "vue";
import CPU from "@/components/CPU.vue";
import Memory from "@/components/Memory.vue";
import Disk from "@/components/Disk.vue";
import Temperatures from "@/components/Temperatures.vue";
import Transmission from "@/components/Transmission.vue";
import Weather from "@/components/Weather.vue";

let locationData = null;
const getLocationData = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => (locationData = coords),
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
          case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            break;
        }
      }
    );
  }
};
getLocationData();

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
  weather: {
    data: null,
    secondsBetween: 60,
    function: async () => {
      const pus = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = pus.coords;

      return await axios
        .get("https://api.openweathermap.org/data/2.5/weather", {
          params: {
            lat: latitude,
            lon: longitude,
            appid: process.env.VUE_APP_OPENWEATHERMAP_API_KEY,
          },
        })
        .then(({ data }) => data);
    },
  },
});

const updateData = () => {
  Object.entries(data.value).forEach(async ([key, value]) => {
    if (value.secondsBetween !== undefined) {
      if (value.secondsSince !== undefined) {
        if (value.secondsSince >= value.secondsBetween) {
          data.value[key].secondsSince = 0;
        } else {
          data.value[key].secondsSince += 1;
          return;
        }
      } else {
        data.value[key].secondsSince = 0;
      }
    }
    if (value.url) {
      axios
        .get(value.url)
        .then(({ data: returnedData }) => (data.value[key].data = returnedData))
        .catch(console.error);
    } else if (value.function) {
      if (value.function.constructor.name === "AsyncFunction") {
        data.value[key].data = await value.function();
      } else {
        data.value[key].data = value.function();
      }
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
      <Weather :data="data.weather.data" />
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
    justify-content: flex-start;
    padding: 0 1rem;

    & > * + * {
      margin-top: 1rem;
    }
  }
}
</style>
