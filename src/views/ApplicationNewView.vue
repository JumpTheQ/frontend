<template>
  <div class="new-application">
    <h1 class="page-title">
      New application
    </h1>
    <div class="labeled-input">
      <label
        class="label"
        for="application-name"
      >
        What is the position you are applying to?
      </label>
      <InputText
        class="input"
        v-model="name"
        id="application-name"
      />
    </div>
    <div class="labeled-input">
      <label
        class="label"
        for="application-description"
      >
        Paste the entire job description here, please.
      </label>
      <Textarea
        class="input new-application__description-input"
        v-model="description"
        id="application-description"
      />
    </div>
    <Button
      class="button new-application__submit-button"
      icon="pi pi-sparkles"
      label="Create application"
      :loading="loading"
      :disabled="loading"
      @click="submitApplication"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import useApplicationsStore from '@/stores/applications';

import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';


// Store

const { createApplication } = useApplicationsStore();

// Router

const router = useRouter();

// State

const description = ref('');
const name = ref('');
const loading = ref(false);

const payload = computed(() => {
  const data = {};

  if (name.value) data.name = name.value;
  if (description.value) data.description = description.value;

  if (!Object.keys(data).length) return null;

  return data;
});

const submitApplication = async () => {
  if (!payload.value) return;
  loading.value = true

  const application = await createApplication(payload.value)

  description.value = '';
  name.value = '';
  loading.value = false

  router.push({ name: 'application-view', params: { id: application.id } })
}
</script>

<style lang="scss" scoped>
.new-application {
  display: flex;
  flex-direction: column;
  gap: 40px;

  // .new-application__description-input
  &__description-input {
    height: 440px;

    resize: none;
  }

  // .new-application__submit-button
  &__submit-button {
    align-self: flex-end;
  }
}
</style>
