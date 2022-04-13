<script setup>
import WidgetTemplate from "@/templates/WidgetTemplate.vue";
import { computed } from "vue";

const props = defineProps({
  data: {
    type: [null, Array],
    default: null,
  },
});
</script>
<template>
  <WidgetTemplate v-if="data"> </WidgetTemplate>
</template>

<style lang="scss"></style>
