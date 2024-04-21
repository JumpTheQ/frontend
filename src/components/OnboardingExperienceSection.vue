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
          :class="{
            'onboarding-experience-section__labeled-input--large': field?.size === 'large'
          }"
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
          <Textarea
            v-else-if="field.type === 'textarea'"
            class="input onboarding-experience-section__textarea"
            v-model="model"
            :id="field.id"
          />
          <Dropdown
            v-else-if="field.type === 'select'"
            class="input"
            v-model="model"
            option-label="label"
            :options="field.options"
            :id="field.id"
          />
          <div
            v-else-if="field.type === 'tagsInput'"
            class="onboarding-experience-section__tags-input"
          >
            <div class="onboarding-experience-section__tags-list">
              <Tag
                class="onboarding-experience-section__tag"
                value="Fontend"
              />
            </div>
            <InputText
              class="input"
              v-model="model"
              option-label="label"
              :options="field.options"
              :id="field.id"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Tag from 'primevue/tag';


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
        size: 'large',
        type: 'textarea'
      }
    ],
    id: 'experience',
    title: 'Experience',
  },
  education: {
    fields: [
      {
        label: 'Degree',
        id: 'degree',
        options: [
          { label: 'Bachelor', value: 'bachelor' },
          { label: 'Master', value: 'master' },
          { label: 'PhD', value: 'phd' }
        ],
        type: 'select'
      },
      {
        label: 'Institution',
        id: 'institution',
        type: 'text'
      },
      {
        label: 'Start Date',
        id: 'startDate',
        type: 'calendar'
      }
    ],
    id: 'education',
    title: 'Education',
  },
  skills: {
    fields: [
      {
        name: 'tags',
        id: 'skills',
        size: 'large',
        type: 'tagsInput'
      }
    ],
    id: 'skills',
    title: 'Skills',
  },
  languages: {
    fields: [
      {
        name: 'tags',
        id: 'skills',
        size: 'large',
        type: 'tagsInput'
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

<style lang="scss">
.onboarding-experience-section {

  // .onboarding-experience-section__labeled-input--large
  &__labeled-input--large {
    grid-column: span 2;
  }

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
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  // .onboarding-experience-section__sub-section-title
  &__sub-section-title {
    font-size: $font-size-lg;
    color: $color-text;
    font-weight: $font-weight-bold;
  }

  // .onboarding-experience-section__tag
  &__tag {

    // .onboarding-experience-section__tag.p-tag
    &.p-tag {
      background: $color-primary;
      color: $color-white;
    }
  }

  // .onboarding-experience-section__tags-input
  &__tags-input {
    .input {
      margin-top: 16px;
    }
  }

  // .onboarding-experience-section__tags-list
  &__tags-list {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  // .onboarding-experience-section__textarea
  &__textarea {
    resize: none;
    height: 100px;
  }
}
</style>
