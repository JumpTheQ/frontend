<template>
  <div class="onboarding-experience-section">
    <div
      v-for="subSection in Object.values(subSections)"
      :key="subSection.id"
      class="onboarding-experience-section__sub-section"
    >
      <div class="onboarding-experience-section__sub-section-header">
        <h2 class="onboarding-experience-section__sub-section-title">
          {{ subSection.title }}
        </h2>
        <Button
          class="button"
          label="Add"
          @click="expandSubSection(subSection.id)"
        />
      </div>
      <div
        v-if="expandedSubSectionId === subSection.id"
        class="onboarding-experience-section__sub-section-content"
      >
        <div
          v-for="field in subSections[expandedSubSectionId].fields"
          :key="field.name"
          class="labeled-input"
        >
          <label :for="field.id">
            {{ field.label }}
          </label>
          <InputText
            v-if="field.type === 'text'"
            v-model="model"
            class="input"
            :id="field.id"
          />
          <Calendar
            v-else-if="field.type === 'calendar'"
            class="input"
            v-model="model"
            :id="field.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import InputText from 'primevue/inputtext';


// State

const expandedSubSectionId = ref(null);

const model = ref('');

const subSections = ref({
  experience: {
    fields: [
      {
        label: 'Job title',
        id: 'job',
        type: 'text'
      },
      {
        label: 'Company',
        id: 'company',
        type: 'text'
      },
      {
        label: 'Start Date',
        id: 'startDate',
        type: 'calendar'
      },
      {
        label: 'End Date',
        id: 'endDate',
        type: 'calendar'
      },
      {
        label: 'Description (Tell us what was your data-to-day like)',
        id: 'description',
        type: 'textarea'
      }
    ],
    id: 'experience',
    title: 'Experience',
  },
  education: {
    fields: [
      {
        name: '',
        type: ''
      }
    ],
    id: 'education',
    title: 'Education',
  },
  skills: {
    fields: [
      {
        name: '',
        type: ''
      }
    ],
    id: 'skills',
    title: 'Skills',
  },
  languages: {
    fields: [
      {
        name: '',
        type: ''
      }
    ],
    id: 'languages',
    title: 'Languages',
  }
})

// Methods

const expandSubSection = (subSectionId) => {
  expandedSubSectionId.value = subSectionId;
}
</script>

<style lang="scss" scoped>
.onboarding-experience-section {

  // .onboarding-experience-section__sub-section
  &__sub-section {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 48px;

    // .onboarding-experience-section__sub-section:not(:first-child)
    &:not(:first-child) {
      margin-top: 24px;
    }

    // .onboarding-experience-section__sub-section:not(:last-child)
    &:not(:last-child) {
      padding-bottom: 24px;

      // .onboarding-experience-section__sub-section:after
      :after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        display: block;
        width: 100%;
        height: 1px;
        background-color: $color-secondary;
      }
    }
  }

  // .onboarding-experience-section__sub-section-content
  &__sub-section-content {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: max-content;
    column-gap: 16px;
    row-gap: 32px;

  }

  // .onboarding-experience-section__sub-section-header
  &__sub-section-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
  }

  // .onboarding-experience-section__sub-section-title
  &__sub-section-title {
    font-size: $font-size-lg;
    color: $color-text;
    font-weight: $font-weight-bold;
  }
}
</style>