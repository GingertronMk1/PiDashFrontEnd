<script setup lang="ts">
import WidgetTemplate from "@/templates/WidgetTemplate.vue";
import { inject, ref, Ref } from "vue";
import { InitialiseWidgetKey, AxiosKey } from "@/symbols";
import axios from "axios";

type OpenWeatherResponse = {
  weather: { icon: string }[];
  main: {
    temp: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
    feels_like: number;
  };
  sys: {
    sunrise: string;
    sunset: string;
  };
};

const data: Ref<OpenWeatherResponse | null> = ref(null);

const $axios = inject(AxiosKey);
const { VUE_APP_LATITUDE, VUE_APP_LONGITUDE, VUE_APP_OPENWEATHERMAP_API_KEY } =
  process.env;

console.table({
  $axios,
  VUE_APP_LATITUDE,
  VUE_APP_LONGITUDE,
  VUE_APP_OPENWEATHERMAP_API_KEY,
});

async function updateData() {
  if (
    $axios &&
    VUE_APP_LATITUDE &&
    VUE_APP_LONGITUDE &&
    VUE_APP_OPENWEATHERMAP_API_KEY
  ) {
    $axios
      ?.get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          lat: process.env.VUE_APP_LATITUDE,
          lon: process.env.VUE_APP_LONGITUDE,
          appid: process.env.VUE_APP_OPENWEATHERMAP_API_KEY,
        },
        paramsSerializer: undefined,
      })
      ?.then(
        (response: { data: OpenWeatherResponse }): object =>
          (data.value = response.data)
      );
  } else {
    console.log("No API key or coordinates set");
    data.value = null;
  }
}

const kelvinToCelcius = (kelvin: number) => {
  return `${(kelvin - 273.15).toFixed(1)}°C`;
};

inject(InitialiseWidgetKey)?.(updateData, 60 * 1000);
</script>
<template>
  <WidgetTemplate
    v-if="data"
    class="weather"
    body-classes="flex flex-row justify-around items-center"
  >
    <template #header> Weather </template>
    <template #header_additional>
      <img
        v-for="(item, index) in data.weather"
        :key="index"
        class="w-12 h-12"
        :src="`http://openweathermap.org/img/wn/${item.icon}@2x.png`"
      />
    </template>
    <div class="flex flex-col text-center">
      <span>Current:</span>
      <strong class="text-4xl" v-text="kelvinToCelcius(data.main.temp)" />
    </div>
    <div class="flex flex-col text-center">
      <span>Feels like:</span>
      <strong class="text-4xl" v-text="kelvinToCelcius(data.main.feels_like)" />
    </div>
    <div class="weather__other-info">
      <div
        class="weather__row"
        v-text="`Day min: ${kelvinToCelcius(data.main.temp_min)}`"
      />
      <div
        class="weather__row"
        v-text="`Day max: ${kelvinToCelcius(data.main.temp_max)}`"
      />
      <div
        class="weather__row"
        v-text="
          `Sunrise at ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`
        "
      />
      <div
        class="weather__row"
        v-text="
          `Sunset at ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`
        "
      />
    </div>
  </WidgetTemplate>
</template>
