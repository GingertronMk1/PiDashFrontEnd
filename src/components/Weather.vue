<script setup>
import WidgetTemplate from "@/templates/WidgetTemplate.vue";
import { computed, ref } from "vue";

const data = ref(null);

const coords = {
  latitude: process.env.VUE_APP_LATITUDE,
  longitude: process.env.VUE_APP_LONGITUDE,
};

async function updateData() {
  if (!(coords.latitude && coords.longitude)) {
    console.log("Grabbing coordinates");
    coords = await new Promise(navigator.geolocation.getCurrentPosition).then(
      ({ coords }) => coords
    );
  }
  data.value = await axios
    .get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: coords.latitude,
        lon: coords.longitude,
        appid: process.env.VUE_APP_OPENWEATHERMAP_API_KEY,
      },
    })
    .then(({ data }) => data);
}

const kelvinToCelcius = (kelvin) => {
  return `${(kelvin - 273.15).toFixed(1)}°C`;
};

updateData();
setInterval(updateData, 60000);
</script>
<template>
  <WidgetTemplate v-if="data" class="weather">
    <template #header
      >Weather
      <span>
        <img
          v-for="(item, index) in data.weather"
          :key="index"
          :src="`http://openweathermap.org/img/wn/${item.icon}@2x.png`"
        />
      </span>
    </template>
    <div class="weather__column weather__column--temp-display">
      <span>Current:</span>
      <strong v-text="kelvinToCelcius(data.main.temp)" />
    </div>
    <div class="weather__column weather__column--temp-display">
      <span>Feels like:</span>
      <strong v-text="kelvinToCelcius(data.main.feels_like)" />
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

<style lang="scss">
.weather {
  .widget__header {
    img {
      max-height: 3.5rem;
    }
  }

  .widget__body {
    flex-direction: row;
    justify-content: space-between;
  }

  &__column {
    display: flex;
    flex-direction: column;

    &--temp-display {
      font-weight: bold;
      justify-content: center;
      align-items: center;
      flex: 1;

      font-size: 1.5rem;

      strong {
        font-size: 3rem;
      }
    }

    &--other-info {
      justify-content: flex-start;
      align-items: stretch;
      padding: 0.5rem;
    }
  }

  &__row {
    & + & {
      margin-top: 1rem;
    }
  }
}
</style>
