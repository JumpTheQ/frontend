<template>
  <NavigationBar class="app_navbar" />
  <main class="app__content">
    <ProfilingSteps />
  </main>
</template>

<script setup>
import NavigationBar from '@/components/NavigationBar.vue';
import ProfilingSteps from '@/components/ProfilingSteps.vue';

</script>

<style lang="scss">
.app__content {
  @apply container mx-auto mt-16;
}
</style>
