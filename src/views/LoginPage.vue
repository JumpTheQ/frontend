<template>
  <div class="login-page">
    <a :href="url">
      <Button
        label="LinkedIn Log In"
        icon="pi pi-linkedin"
      />
    </a>
  </div>
</template>

<script setup>
import authAxios from '@/shared/axios/auth-axios';
import { onMounted, onBeforeMount, ref } from 'vue';

import Button from 'primevue/button';

const url = ref('');


onBeforeMount(() => {
  const params = new URLSearchParams(window.location.search)

  if (params.get('callback') === 'linkedin' && params.has('code')) {
    const code = params.get('code');

    authAxios.post('/auth/linkedin/callback', { code })
      .then(async () => {
        const response = await authAxios.get('/auth/me');

        console.log(response);
        // TODO: store user
      })
  }
});

onMounted(async () => {
  const { data } = await authAxios.get('/auth/linkedin');

  url.value = data;
});
</script>

<style lang="scss" scoped>
.login-page {
  @apply flex justify-center items-center h-screen;
}
</style>