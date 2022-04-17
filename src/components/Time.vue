<script setup>
import WidgetTemplate from "@/templates/WidgetTemplate.vue";
import { ref } from "vue";

const data = ref(null);

function updateData() {
  data.value = new Date().toLocaleString();
}

initialiseWidget(updateData);
</script>
<template>
  <h1 class="time" v-text="data" />
</template>

<style lang="scss">
.time {
  text-align: center;
  font-size: 4rem;
}
</style>
