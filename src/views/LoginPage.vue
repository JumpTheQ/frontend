<template>
  <div class="login-page">
    <a :href="url">
      <Button label="LinkedIn Log In" />
    </a>
  </div>
</template>

<script setup>
import authAxios from '@/shared/axios/auth-axios';
import { onMounted, ref } from 'vue';

import Button from 'primevue/button';

const url = ref('');

onMounted(async () => {
  const { data } = await authAxios.get('/auth/linkedin');

  url.value = data;
});
</script>

<style lang="scss" scoped></style>