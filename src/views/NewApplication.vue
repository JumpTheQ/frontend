<template>
  <div class="new-application">
    <h1>New application</h1>

    <label for="">Position</label>
    <InputText v-model="name" />

    <label for="">Paste the position here, please</label>
    <Textarea v-model="description" />
    <Button
      label="Create application"
      @click="submitApplication"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

import useApplicationsStore from '@/stores/applications';

import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';

const { createApplication } = useApplicationsStore();

const description = ref('');
const name = ref('');

const payload = computed(() => {
  const data = {};

  if (name.value) data.name = name.value;
  if (description.value) data.description = description.value;

  if (!Object.keys(data).length) return null;

  return data;
});

const submitApplication = () => {
  if (!payload.value) return;

  console.log(payload.value);

  createApplication(payload.value);
}


</script>

<style lang="scss" scoped>
.new-application {
  @apply flex flex-col gap-4;
}
</style>