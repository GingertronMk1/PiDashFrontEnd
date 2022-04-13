<script setup>
  
  import { ref } from "vue";

  const data = ref({
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
    transmission: {
      url: "/transmission",
      data: null,
    }
  });

const updateData = () => {
  Object.entries(data.value).forEach(([key, { url }]) => {
    axios.get(url).then(({ data: returnedData }) => data.value[key].data = returnedData);
  });
}

updateData();
setInterval(updateData, 1000);

function bytesToMegabytes(bytes) {
  return (Number.parseInt(bytes) / 1024 / 1024).toFixed(2);
}

function bytesToGigabytes(bytes) {
  return (Number.parseFloat(bytesToMegabytes(bytes)) / 1024).toFixed(2);
}
  
</script>
<template>
  Hello world!
  
  <h3>CPU</h3>
  <table id="cpu-table" v-if="data.cpu.data">
    <thead>
      <th v-for="(core, index) in data.cpu.data" :key="index" v-text="index" />
    </thead>
    <tbody>
      <tr>
        <td v-for="(core, index) in data.cpu.data" :key="index" v-text="core.toFixed(0)" />
      </tr>
    </tbody>
  </table>
  <template v-if="data.memory.data">
  <h3>Memory</h3>
  <span v-text="`${bytesToMegabytes(data.memory.data.available)}MB available of ${bytesToMegabytes(data.memory.data.total)}MB`" />
  </template>

<template v-if="data.disk.data">
  <h3>Disk</h3>
  <span v-text="`${bytesToGigabytes(data.disk.data.free)}GB available of ${bytesToGigabytes(data.disk.data.total)}GB`" />
</template>
  <template v-if="data.transmission.data?.arguments?.torrents">
    <table>
      <thead>
        <th>Name</th>
        <th>% done</th>
      </thead>
      <tbody>
        <tr v-for="(torrent, index) in data.transmission.data.arguments.torrents" :key="`torrent${index}`">
          <td v-text="torrent.name" />
          <td v-text="`${(torrent.percentDone * 100).toFixed(2)}%`" />
        </tr>
      </tbody>
    </table>
  </template>


</template>
<style lang="scss">
#cpu-table {
  border-collapse: collapse;
  td {
    min-width: 50px;
    text-align: center;
  }
}
</style>