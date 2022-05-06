<script setup lang="ts"></script>
<template>
  <div class="widget">
    <h3 v-if="$slots.header" class="widget__header">
      <slot name="header" />
    </h3>
    <div class="widget__body"><slot /></div>
  </div>
</template>
