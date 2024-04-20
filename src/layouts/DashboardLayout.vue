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
  @apply flex flex-col gap-4;

  &__content {
    grid-area: content;
  }

  &__navbar {
    grid-area: navbar;
  }

  &__sidebar {
    grid-area: sidebar;
  }
}
</style>