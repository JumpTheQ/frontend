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
        @click="handleContentClick"
      />
    </template>
  </Card>
</template>

<script setup>
import { computed, ref, watch } from 'vue';

import useApplicationsStore from '@/stores/applications';
import usePromptStore from '@/stores/prompt.js'

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
const promptStore = usePromptStore()

// State

const selectedSectionId = ref(null);

// Computed

const renderedCoverLetter = computed(() => applicationStore.renderedCoverLetterByApplicationId(props.applicationId));

// Methods

const handleContentClick = (event) => {
  const { target } = event;
  const targetSectionId = target.getAttribute('data-section-id');

  promptStore.setActiveSection({
    id: targetSectionId,
    content: target.innerHTML
  });

  if (selectedSectionId.value) {
    const previousTarget = document.querySelector(`[data-section-id="${selectedSectionId.value}"]`);

    previousTarget.classList.remove('cover-letter-card__content-section--active');
  }

  if (selectedSectionId.value === targetSectionId) {
    selectedSectionId.value = null;
  } else {
    target.classList.add('cover-letter-card__content-section--active');
    selectedSectionId.value = target.getAttribute('data-section-id');
  }
}

// Watchers

watch(
  () => props.coverLetterId,
  async (coverLetterId) => {
    if (!coverLetterId) return;

    await applicationStore.fetchRenderedCoverLetter({
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

  // .cover-letter-card__content
  &__content {

    // .cover-letter-card__content p
    p {
      position: relative;
      cursor: pointer;
      margin-top: 16px;
      color: $color-text;
      font-size: $font-size-md;
      font-weight: $font-weight-regular;

      // .cover-letter-card__content p:hover
      // .cover-letter-card__content p.cover-letter-card__content-section--active
      &:hover,
      &.cover-letter-card__content-section--active {
        width: calc(100% + 48px);
        background-color: $color-secondary;
        margin-left: -24px;
        padding: 0 24px;

        &::after {
          content: url('@/assets/icons/stars.svg');
          position: absolute;
          top: 0;
          right: 20px;

          transform: translateY(-50%);

          width: 40px;
          height: 40px;

          border: 1px solid $color-primary;
          background-color: $color-secondary;
          border-radius: 50%;
        }
      }

      // .cover-letter-card__content p:not(:first-child)
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
