<script setup lang="ts">
import { inject, Ref, ref } from "vue";
import WidgetTemplate from "@/templates/WidgetTemplate.vue";
import { AxiosKey, BytesToOtherKey, InitialiseWidgetKey } from "@/symbols";

type TorrentResponse = {
  addedDate: number;
  id: number;
  name: string;
  eta: number;
  etaIdle: number;
  leftUntilDone: number;
  percentDone: number;
  rateDownload: number;
  isFinished: string;
  magnetLink: string;
};

type TorrentProcessed = TorrentResponse & {
  downloadRateHumanReadable: string;
  etaHumanReadable: string;
  torrentNameSplit: string[];
};

const data: Ref<TorrentProcessed[]> = ref([]);

function dateToHumanReadable(date: number) {
  const dateObj = new Date(date * 1000);
  if (dateObj instanceof Date && !isNaN(dateObj.getTime())) {
    return dateObj.toLocaleString();
  }
  return null;
}

const $axios = inject(AxiosKey);
function updateData() {
  $axios
    ?.get("/transmission", {
      params: {
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
        ],
      },
    })
    .then(
      ({
        data: {
          arguments: { torrents },
        },
      }) => {
        data.value = (torrents ?? [])
          .filter(({ isFinished }: { isFinished: boolean }) => !isFinished)
          .map((torrent: TorrentResponse) => ({
            ...torrent,
            downloadRateHumanReadable: `${inject(BytesToOtherKey)?.(
              torrent.rateDownload
            )}/s`,
            etaHumanReadable: dateToHumanReadable(torrent.eta) ?? "Unknown",
            torrentNameSplit: torrent.name.split(/([^A-Za-z0-9\[\]\(\)]+)/g),
          }))
          .sort(
            ({ name: a }: TorrentProcessed, { name: b }: TorrentProcessed) =>
              a.toLowerCase().localeCompare(b.toLowerCase())
          );
      }
    );
}

inject(InitialiseWidgetKey)?.(updateData);
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
            v-text="torrent.downloadRateHumanReadable"
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
