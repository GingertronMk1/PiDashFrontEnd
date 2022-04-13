<script setup>
import { computed } from "vue";
import WidgetTemplate from "@/templates/WidgetTemplate.vue";

const props = defineProps({
  data: {
    type: [Object, null],
    default: () => ({}),
  },
});

const torrents = computed(() => {
  const { data } = props;
  if (!data) {
    return [];
  }

  const {
    arguments: { torrents },
  } = data;
  return (torrents ?? []).map((torrent) => ({
    ...torrent,
    downloadRateMBPS: (torrent.rateDownload / 1024 / 1024).toFixed(2),
  }));
});
</script>
<template>
  <WidgetTemplate v-if="torrents.length" class="transmission-widget">
    <template #header>Transmission</template>
    <table cellspacing="0">
      <thead>
        <th>Name</th>
        <th>% done</th>
        <th>Download Speed</th>
      </thead>
      <tbody>
        <tr v-for="(torrent, index) in torrents" :key="`torrent${index}`">
          <td v-text="torrent.name" />
          <td
            class="transmission-widget__number-cell"
            v-text="`${(torrent.percentDone * 100).toFixed(2)}%`"
          />
          <td
            class="transmission-widget__number-cell"
            v-text="`${torrent.downloadRateMBPS}MB/s`"
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
    border-bottom: 2px solid white;

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

  th,
  td {
    padding: 0.5rem;

    & + * {
      border-left: 2px solid white;
    }
  }
}
</style>
