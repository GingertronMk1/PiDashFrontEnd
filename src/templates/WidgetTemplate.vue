<script setup></script>
<template>
  <div class="widget">
    <div v-if="$slots.header" class="widget__header">
      <slot name="header" />
    </div>
    <div class="widget__body"><slot /></div>
  </div>
</template>

<style lang="scss">
.widget {
  border: 2px solid #606060;
  border-radius: 0.5rem;
  &__header,
  &__body {
    padding: 1rem;
  }

  &__header {
    font-size: 2rem;
  }
}
</style>
