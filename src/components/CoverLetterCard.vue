<template>
  <Card class="cover-letter-card">
    <template #title>
      <h3 class="cover-letter-card__title ">
        Cover Letter
      </h3>
    </template>
    <template #content>
      <div
        v-if="renderedCoverLetter"
        class="cover-letter-card__content"
        v-html="renderedCoverLetter"
      />
    </template>
  </Card>
</template>

<script setup>
import { computed, watch } from 'vue';

import useApplicationsStore from '@/stores/applications';

import Card from 'primevue/card';

const props = defineProps({
  applicationId: {
    default: null,
    type: String
  },

  coverLetterId: {
    default: null,
    type: String
  }
});

// Store

const applicationStore = useApplicationsStore();

// Computed

const renderedCoverLetter = computed(() => applicationStore.renderedCoverLetterByApplicationId(props.applicationId));

// Watchers

watch(
  () => props.coverLetterId,
  (coverLetterId) => {
    if (!coverLetterId) return;

    applicationStore.fetchRenderedCoverLetter({
      applicationId: props.applicationId,
      coverLetterId
    });
  },
  { immediate: true }
)
</script>

<style lang="scss">
.cover-letter-card {

  // .cover-letter-card__content-section
  &__content-section {
    cursor: pointer;
    padding: 0 8px;
    font-size: $font-size-md;
    font-weight: $font-weight-regular;


  }

  // .cover-letter-card__content p
  &__content {
    p {
      margin-top: 16px;
      color: $color-text;
      font-size: $font-size-md;
      font-weight: $font-weight-regular;

      &:hover {
        background-color: $color-secondary;
      }

      // .cover-letter-card__content-section:not(:first-child)
      &:not(:first-child) {
        margin-top: 8px;
      }
    }
  }

  // .cover-letter-card__title
  &__title {
    color: $color-text;
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
  }
}
</style>