<template>
  <Card class="resume-card">
    <template #title>
      <h3 class="resume-card__title ">
        Resume
      </h3>
    </template>
    <template #content>
      <div
        class="resume-card__content"
        v-html="renderedResume"
      />
    </template>
  </Card>
</template>

<script setup>
import { computed, watch } from 'vue';

import useApplicationsStore from '@/stores/applications';

import Card from 'primevue/card';
import usePromptStore from '@/stores/prompt.js'

const props = defineProps({
  applicationId: {
    default: null,
    type: String
  },

  resumeId: {
    default: null,
    type: String
  }
});

// Store

const applicationStore = useApplicationsStore();
const promptStore = usePromptStore

// Computed

const renderedResume = computed(() => applicationStore.renderedResumeByApplicationId(props.applicationId));

// Watchers

watch(
  () => props.resumeId,
  (resumeId) => {
    if (!resumeId) return;

    applicationStore.fetchRenderedResume({
      applicationId: props.applicationId,
      resumeId
    });
  },
  { immediate: true }
)
</script>

<style lang="scss">
.resume-card {

  // .resume-card__content-section
  &__content-section {
    cursor: pointer;
    padding: 0 8px;
    font-size: $font-size-md;
    font-weight: $font-weight-regular;


  }

  // .resume-card__content p
  &__content {
    p {
      margin-top: 16px;
      color: $color-text;
      font-size: $font-size-md;
      font-weight: $font-weight-regular;

      &:hover {
        background-color: $color-secondary;
      }

      // .resume-card__content-section:not(:first-child)
      &:not(:first-child) {
        margin-top: 8px;
      }
    }
  }

  // .resume-card__title
  &__title {
    color: $color-text;
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
  }
}
</style>
