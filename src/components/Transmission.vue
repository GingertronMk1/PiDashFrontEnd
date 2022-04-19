<script setup>
import { ref } from "vue";
import WidgetTemplate from "@/templates/WidgetTemplate.vue";

const data = ref([]);

function dateToHumanReadable(date) {
  const dateObj = new Date(date * 1000);
  if (dateObj instanceof Date && !isNaN(dateObj.getTime())) {
    return dateObj.toLocaleString();
  }
  return null;
}

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
            "etaIdle",
            "leftUntilDone",
            "percentDone",
            "rateDownload",
            "isFinished",
            "magnetLink",
            "isFinished",
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
        data.value = (torrents ?? [])
          .filter(({ isFinished }) => !isFinished)
          .map((torrent) => ({
            ...torrent,
            downloadRateMBPS: `${(torrent.rateDownload / 1024 / 1024).toFixed(
              2
            )}MB/s`,
            etaHumanReadable: dateToHumanReadable(torrent.eta) ?? "Unknown",
            torrentNameSplit: torrent.name.split(/([^A-Za-z0-9]+)/g),
          }))
          .sort(({ name: a }, { name: b }) =>
            a.toLowerCase().localeCompare(b.toLowerCase())
          );
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
    $firstN: 58%;
    $otherCols: 3;
    &:nth-of-type(1) {
      width: $firstN;
      min-width: 200px;
    }

    @for $n from 2 through 10 {
      &:nth-of-type(#{$n}) {
        width: calc($firstN / $otherCols);
      }
    }
  }
  td > span {
    display: inline-block;
    white-space: pre;
  }
}
</style>
