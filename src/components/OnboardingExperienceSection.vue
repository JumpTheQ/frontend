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
            v-model="dataModel[subSection.id][field.id]"
            class="input"
            :id="field.id"
            @blur="onBlur"
          />
          <Calendar
            v-else-if="field.type === 'calendar'"
            class="input"
            v-model="dataModel[subSection.id][field.id]"
            :id="field.id"
            @blur="onBlur"
          />
          <Textarea
            v-else-if="field.type === 'textarea'"
            class="input onboarding-experience-section__textarea"
            v-model="dataModel[subSection.id][field.id]"
            :id="field.id"
            @blur="onBlur"
          />
          <Dropdown
            v-else-if="field.type === 'select'"
            class="input"
            v-model="dataModel[subSection.id][field.id]"
            option-label="label"
            option-value="value"
            :options="field.options"
            :id="field.id"
            @blur="onBlur"
          />
          <div
            v-else-if="field.type === 'tagsInput'"
            class="onboarding-experience-section__tags-input"
          >
            <div class="onboarding-experience-section__tags-list">
              <Tag
                v-for="tag in modelValue.skills"
                :key="tag"
                class="onboarding-experience-section__tag"
                :value="tag"
              />
            </div>
            <InputText
              class="input"
              :value="dataModel[skills]"
              option-label="label"
              :options="field.options"
              :id="field.id"
              placeholder="Skill 1, Skill 2, Skill 3..."
              @blur="onTagBlur"
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


defineProps({
  modelValue: {
    default: null,
    type: Object
  }
});

const emit = defineEmits(['update:modelValue']);

// State

const expandedSubSectionId = ref(null);

const dataModel = ref({
  experiences: {
    companyName: '',
    description: '',
    endDate: '',
    startDate: '',
    title: ''
  },
  courses: {
    description: '',
    endDate: '',
    institution: '',
    name: '',
    startDate: ''
  },
  skills: [],
  languages: {
    name: '',
    level: ''
  }
});

const subSections = ref({
  experiences: {
    fields: [
      {
        label: 'Job title',
        id: 'title',
        type: 'text'
      },
      {
        label: 'Company',
        id: 'companyName',
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
    id: 'experiences',
    title: 'Experience',
  },
  courses: {
    fields: [
      {
        label: 'Course',
        id: 'name',
        type: 'text'
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
      },
      {
        label: 'End Date',
        id: 'endDate',
        type: 'calendar'
      },
      {
        label: 'Description',
        id: 'description',
        size: 'large',
        type: 'textarea'
      }
    ],
    id: 'courses',
    title: 'Education',
  },
  skills: {
    fields: [
      {
        name: 'skills',
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
        label: 'Language',
        id: 'name',
        type: 'text'
      },
      {
        label: 'Level',
        id: 'level',
        options: [
          { label: 'Beginner', value: 'beginner' },
          { label: 'Intermediate', value: 'intermediate' },
          { label: 'Advanced', value: 'advanced' }
        ],
        type: 'select',
      }
    ],
    id: 'languages',
    title: 'Languages',
  }
})

// Computed

const onTagBlur = (event) => {
  const { value } = event.target;

  const tags = value.split(',');

  dataModel.value.skills = tags.map(tag => tag.trim())
    .filter(Boolean);

  return onBlur();
}

const onBlur = () => {
  const data = {};

  for (const subSectionId in dataModel.value) {
    if (!data[subSectionId]) data[subSectionId] = [];

    if (Array.isArray(dataModel.value[subSectionId])) {
      data[subSectionId] = dataModel.value[subSectionId];
    } else if (Object.values(dataModel.value[subSectionId]).some(Boolean)) {
      data[subSectionId].push(dataModel.value[subSectionId]);
    }
  }

  if (Object.keys(data).length === 0) return null;

  return emit('update:modelValue', data);
}

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
    gap: 8px;
  }

  // .onboarding-experience-section__textarea
  &__textarea {
    resize: none;
    height: 100px;
  }
}
</style>
