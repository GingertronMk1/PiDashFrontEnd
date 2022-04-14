<script setup></script>
<template>
  <div class="widget">
    <h3 v-if="$slots.header" class="widget__header">
      <slot name="header" />
    </h3>
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
    margin: 0;
    padding-bottom: 0;
  }

  &__body {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
  }
}
</style>
