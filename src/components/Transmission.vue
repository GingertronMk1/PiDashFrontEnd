<script setup>
import { computed } from "vue";
import WidgetTemplate from "@/templates/WidgetTemplate.vue";

const props = defineProps({
  data: {
    type: [Array, null],
    default: () => [],
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
  return torrents ?? [];
});
</script>
<template>
  <WidgetTemplate v-if="torrents.length">
    <template #header>Transmission</template>
    <table>
      <thead>
        <th>Name</th>
        <th>% done</th>
      </thead>
      <tbody>
        <tr v-for="(torrent, index) in torrents" :key="`torrent${index}`">
          <td v-text="torrent.name" />
          <td v-text="`${(torrent.percentDone * 100).toFixed(2)}%`" />
        </tr>
      </tbody>
    </table>
  </WidgetTemplate>
</template>
