<script setup lang="ts">
import WidgetTemplate from "@/templates/WidgetTemplate.vue";
import { ref } from "vue";

const data = ref(null);

function updateData() {
  data.value = new Date().toLocaleString();
}

initialiseWidget(updateData, 10, false);
</script>
<template>
  <h1 class="time widget" v-text="data" />
</template>

<style lang="scss">
.time {
  text-align: center;
  margin: 0;
  border: none;
}
</style>
