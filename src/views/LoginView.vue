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
import { onMounted, onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';

import authAxios from '@/shared/axios/auth-axios';

import useAuthStore from '@/stores/auth';

import Button from 'primevue/button';

// Store

const authStore = useAuthStore();

// Router

const router = useRouter();

// State

const url = ref('');

onBeforeMount(() => {
  const params = new URLSearchParams(window.location.search)

  if (params.get('callback') === 'linkedin' && params.has('code')) {
    const code = params.get('code');

    authAxios.post('/auth/linkedin/callback', { code })
      .then(async () => {
        await authStore.fetchUserData();

        router.push('/');
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