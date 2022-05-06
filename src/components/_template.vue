<script setup lang="ts">
import WidgetTemplate from "@/templates/WidgetTemplate.vue";
import { ref } from "vue";

const data = ref(null);

async function updateData() {
  data.value = await axios
    .get("/<ROUTE>")
    .then(({ data }) => data)
    .catch((err) => {
      console.error(err);
      return null;
    });
}

initialiseWidget(updateData);
</script>
<template>
  <WidgetTemplate v-if="data"> </WidgetTemplate>
</template>
