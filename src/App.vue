<template>
  <RouterView />
</template>

<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'

import authAxios from './shared/axios/auth-axios';

// import DashboardLayout from '@/layouts/DashboardLayout.vue';
// import DefaultLayout from '@/layouts/DefaultLayout.vue';

// const route = useRoute();

// Computed

// const isDashboardLayout = computed(() => route.meta.layout === 'dashboard');

// const layout = computed(() => isDashboardLayout.value ? DashboardLayout : DefaultLayout);

// Lifecycle hooks

onMounted(() => {
  authAxios.get('http://localhost/sanctum/csrf-cookie');
})
</script>

<style scoped></style>
