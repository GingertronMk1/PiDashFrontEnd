<script setup>
import WidgetTemplate from "@/templates/WidgetTemplate.vue";
import { ref } from "vue";

const data = ref(null);

function updateData() {
  return;
}

updateData();
initialiseWidget(updateData);
</script>
<template>
  <WidgetTemplate v-if="data"> </WidgetTemplate>
</template>

<style lang="scss"></style>
