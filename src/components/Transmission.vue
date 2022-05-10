<script setup lang="ts">
import { inject, Ref, ref } from "vue";
import WidgetTemplate from "@/templates/WidgetTemplate.vue";
import { AxiosKey, BytesToOtherKey, InitialiseWidgetKey } from "@/symbols";

class TorrentResponse {
  constructor(
    public addedDate: string = "",
    public id: number = -1,
    public name: string = "",
    public eta: number = -1,
    public etaIdle: number = -1,
    public leftUntilDone: number = -1,
    public percentDone: number = -1,
    public rateDownload: number = -1,
    public isFinished: string = "",
    public magnetLink: string = ""
  ) {}
}

type TorrentProcessed = TorrentResponse & {
  downloadRateHumanReadable: string;
  etaHumanReadable: string;
  percentDoneHumanReadable: string;
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
const $bytesToOther = inject(BytesToOtherKey);
function updateData() {
  $axios
    ?.get("/transmission", {
      params: {
        fields: Object.keys(new TorrentResponse()),
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
            downloadRateHumanReadable: `${$bytesToOther?.(
              torrent.rateDownload
            )}/s`,
            percentDoneHumanReadable: `${(torrent.percentDone * 100).toFixed(
              2
            )}%`,
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
    <template #header>
      <span>Transmission</span>
      <i class="fa-solid fa-cloud-arrow-down" />
    </template>
    <table class="w-full">
      <thead>
        <th class="w-3/4">Name</th>
        <th class="w-1/8">% done</th>
        <th class="w-1/8"><i class="fa-solid fa-arrow-down mr-2" />Speed</th>
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
          <td class="text-center" v-text="torrent.percentDoneHumanReadable" />
          <td class="text-center" v-text="torrent.downloadRateHumanReadable" />
        </tr>
      </tbody>
    </table>
  </WidgetTemplate>
</template>
