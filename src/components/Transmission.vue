<script setup>
import { ref } from "vue";
import WidgetTemplate from "@/templates/WidgetTemplate.vue";

const data = ref([]);

function updateData() {
  axios
    .get("/transmission", {
      params: {
        arguments: {
          fields: [
            "addedDate",
            "id",
            "name",
            "eta",
            "leftUntilDone",
            "percentDone",
            "rateDownload",
            "isFinished",
            "magnetLink",
          ],
        },
      },
    })
    .then(
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
          etaHumanReadable: Date.parse(torrent.eta)
            ? new Date(torrent.eta).toLocaleString()
            : "",
          torrentNameSplit: torrent.name.split(/([^A-Za-z0-9]+)/g),
        }));
      }
    );
}

initialiseWidget(updateData);
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
          <td>
            <span
              v-for="(part, partIndex) in torrent.torrentNameSplit"
              :key="`${index}${partIndex}`"
              v-text="part"
            />
          </td>
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
      min-width: 200px;
    }

    &:nth-of-type(2),
    &:nth-of-type(3) {
      width: 20%;
    }
  }
  td > span {
    display: inline-block;
    white-space: pre;
  }
}
</style>
