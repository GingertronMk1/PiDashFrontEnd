<script setup lang="ts">
import { InitialiseWidgetKey } from "@/symbols";
import WidgetTemplate from "@/templates/WidgetTemplate.vue";
import { inject, Ref, ref } from "vue";

const data: Ref<string> = ref(new Date().toLocaleString());

function updateData() {
  data.value = new Date().toLocaleString();
}

inject(InitialiseWidgetKey)?.(updateData, 10, false);
</script>
<template>
  <h1 class="time widget text-8xl" v-text="data" />
</template>
