<script setup>
import WidgetTemplate from "@/templates/WidgetTemplate.vue";
import { ref } from "vue";

const data = ref(null);

function updateData() {
  return;
}

updateData();
setInterval(updateData, 1000);
</script>
<template>
  <WidgetTemplate v-if="data"> </WidgetTemplate>
</template>

<style lang="scss"></style>
