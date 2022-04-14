<script setup>
import { ref } from "vue";
import WidgetTemplate from "@/templates/WidgetTemplate.vue";

const data = ref([]);

function updateData() {
  axios.get("/transmission").then(
    ({
      data: {
        arguments: { torrents },
      },
    }) => {
      data.value = (torrents ?? []).map((torrent) => ({
        ...torrent,
        downloadRateMBPS: `${(torrent.rateDownload / 1024 / 1024).toFixed(
          2
        )}MB/s`,
      }));
    }
  );
}

updateData();
setInterval(updateData, 1000);
</script>
<template>
  <WidgetTemplate v-if="data.length" class="transmission-widget">
    <template #header>Transmission</template>
    <table>
      <thead>
        <th>Name</th>
        <th>% done</th>
        <th>Download Speed</th>
      </thead>
      <tbody>
        <tr v-for="(torrent, index) in data" :key="`torrent${index}`">
          <td v-text="torrent.name" />
          <td
            class="transmission-widget__number-cell"
            v-text="`${(torrent.percentDone * 100).toFixed(2)}%`"
          />
          <td
            class="transmission-widget__number-cell"
            v-text="torrent.downloadRateMBPS"
          />
        </tr>
      </tbody>
    </table>
  </WidgetTemplate>
</template>

<style lang="scss">
.transmission-widget {
  &__number-cell {
    text-align: center;
  }

  th {
    &:nth-of-type(1) {
      width: 60%;
      min-width: 400px;
    }

    &:nth-of-type(2),
    &:nth-of-type(3) {
      width: 20%;
      min-width: 100px;
    }
  }
}
</style>
