<template>
  <DashboardLayout class="dashboard-view">
    <RouterView />
  </DashboardLayout>
</template>

<script setup>
import { RouterView } from 'vue-router';

import DashboardLayout from '@/layouts/DashboardLayout.vue';
</script>

<style lang="scss" scoped></style>