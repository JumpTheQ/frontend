<template>
  <RouterView />
</template>

<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'

import authAxios from './shared/axios/auth-axios';

onMounted(() => {
  authAxios.get('http://localhost/sanctum/csrf-cookie');
})
</script>

<style scoped></style>
