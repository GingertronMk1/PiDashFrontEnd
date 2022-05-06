<script setup lang="ts"></script>
<template>
  <div class="widget">
    <h3
      v-if="$slots.header"
      class="flex flex-row justify-between items-center text-3xl"
    >
      <slot name="header" />
    </h3>
    <div class="widget__body"><slot /></div>
  </div>
</template>
