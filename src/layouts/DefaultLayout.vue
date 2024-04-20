<template>
  <div class="onboarding-layout">
    <NavigationBar class="onboarding-layout__navbar" />
    <main class="onboarding-layout__content">
      <slot />
    </main>
  </div>
</template>

<script setup>
import NavigationBar from '@/components/NavigationBar.vue';
</script>

<style lang="scss" scoped>
.onboarding-layout {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, max-content);
  grid-template-areas: 'navbar' 'content';

  &__content {
    grid-area: content;
  }

  &__navbar {
    grid-area: navbar;
  }
}
</style>