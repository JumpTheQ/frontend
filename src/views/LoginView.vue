<template>
  <div class="login-page">
    <div class="flex items-center w-full mx-6">
      <img src="@/assets/images/login.png" alt="">
      <div class="flex items-center justify-center flex-col w-full">
        <img src="@/assets/images/login-illustration.png" alt="" class="max-w-xs">
        <a :href="url">
          <Button
            :loading="loading"
            class="button mt-8"
            label="LinkedIn Log In"
            icon="pi pi-linkedin"
          />
        </a>
        <p class="mt-8 w-96 text-center">By sign in with LinkedIn you are providing us with information such as name, email, and photo. Your data will not be shared with third party entities.</p>
      </div>
    </div>
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

const loading = ref(false)

onBeforeMount(async () => {
  const params = new URLSearchParams(window.location.search)

  if (params.get('callback') === 'linkedin' && params.has('code')) {
    const code = params.get('code');

    loading.value = true
    await authAxios.post('/auth/linkedin/callback', { code })
    await authStore.fetchUserData();

    loading.value = false
    router.push('/');
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
