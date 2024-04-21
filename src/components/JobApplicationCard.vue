<template>
  <Card class="job-application-card">
    <template #title>
      <div class="job-application-card__information">
        <h3 class="job-application-card__title">
          Job Application
        </h3>
        <p class="job-application-card__name">
          {{ application.name }}
        </p>
      </div>
      <Button
        class="job-application-card__toggle-description-button"
        :label="toggleDescriptionButtonLabel"
        text
        @click="toggleDescription"
      />
    </template>
    <template #content>
      <div
        v-if="isDescriptionVisible"
        class="job-application-card__content"
      >
        <h4 class="job-application-card__content-title">
          Description
        </h4>
        <p class="job-application-card__insights">
          {{ application.description }}
        </p>
      </div>
      <div class="job-application-card__content-divider" />
      <div class="job-application-card__content">
        <h4 class="job-application-card__content-title">
          Personalized Insights
        </h4>
        <div class="job-application-card__insights">
          Based on your experience and skills, we decided to highlight the following topics on your CV and Motivation Letter:

          <ul class="list-disc my-4 mx-8">
            <li v-for="(keyword, index) of application.keywords" :key="index">{{ keyword }}</li>
          </ul>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup>
import { computed, ref } from 'vue';

import Button from 'primevue/button';
import Card from 'primevue/card';

defineProps({
  application: {
    default: () => {},
    type: Object
  }
});

// State

const isDescriptionVisible = ref(false);

// Computed

const toggleDescriptionButtonLabel = computed(() => {
  const action = isDescriptionVisible.value ? 'hide' : 'show'

  return `[ ${action} description ]`
});

// Methods

const toggleDescription = () => {
  isDescriptionVisible.value = !isDescriptionVisible.value;
}
</script>

<style lang="scss">
.job-application-card {

  // .job-application-card .p-card-title
  .p-card-title {
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  // .job-application-card__content-divider
  &__content-divider {
    margin: 16px 0;
    width: 100%;
    height: 1px;
    background-color: $color-secondary;
  }

  // .job-application-card__content-title
  &__content-title {
    color: $color-text;
    font-size: $font-size-md;
    font-weight: $font-weight-bold;
  }

  // .job-application-card__insights
  &__insights {
    margin-top: 16px;

    color: $color-text;
    font-size: $font-size-md;
    font-weight: $font-weight-regular;
  }

  // .job-application-card__name
  &__name {
    margin-top: 16px;
    color: $color-text;
    font-size: $font-size-md;
    font-weight: $font-weight-regular;
  }

  // .job-application-card__title
  &__title {
    color: $color-primary;
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
  }

  // .job-application-card__toggle-description-button
  &__toggle-description-button {
    .p-button-label {
      color: $color-primary;
      font-size: $font-size-md;
      font-weight: $font-weight-regular;
    }
  }
}
</style>
