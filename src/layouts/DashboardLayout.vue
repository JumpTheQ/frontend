<template>
  <div class="dashboard-layout">
    <NavigationBar class="dashboard-layout__navbar" />
    <DashboardSidebar class="dashboard-layout__sidebar" />
    <main class="dashboard-layout__content">
      <slot />
    </main>
  </div>
</template>

<script setup>
import NavigationBar from '@/components/NavigationBar.vue';
import DashboardSidebar from '@/components/DashboardSidebar.vue';

</script>

<style lang="scss" scoped>
.dashboard-layout {
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-template-rows: repeat(2, max-content);
  grid-template-areas: 'navbar navbar' 'sidebar content';
  gap: 24px;

  &__content {
    grid-area: content;
    padding-right: 24px;
  }

  &__navbar {
    grid-area: navbar;
  }

  &__sidebar {
    grid-area: sidebar;
  }
}
</style>