<template>
  <Stepper
    class="profiling-steps"
    v-model:activeStep="activeStep"
    linear
  >
    <StepperPanel
      v-for="step in steps"
      :key="step.id"
      :header="step.header"
    >
      <template #content="{ nextCallback }">
        <component
          :is="step.content.component"
          v-bind="step.content.props"
          v-model="userInput"
        />
        <div class="profiling-steps__action-buttons">
          <Button
            label="Skip"
            text
            @click="nextCallback"
          />
          <Button
            :disabled="!userInput"
            :label="nextButtonText"
            @click="() => onNextButtonClick(step.id)"
          />
        </div>
      </template>
    </StepperPanel>
  </Stepper>
</template>

<script setup>
import { computed, ref } from 'vue';

import Button from 'primevue/button';

import Stepper from 'primevue/stepper';
import StepperPanel from 'primevue/stepperpanel';

import OnboardingSection from './OnboardingSection.vue';

// State

const activeStep = ref(0);

const aboutYouText = ref('');
const ambitionsText = ref('');

const userInput = ref('');;

// Computed

const isLastStep = computed(() => steps.value[activeStep.value]?.id === 'experience');

const nextButtonText = computed(() => isLastStep.value ? 'Submit' : 'Next');

const payload = computed(() => {
  const data = {};


  if (aboutYouText.value) data.about = aboutYouText.value;
  if (ambitionsText.value) data.ambitions = ambitionsText.value;

  if (Object.keys(data).length === 0) return null;

  return data;
})

const steps = computed(() => [
  {
    content: {
      component: OnboardingSection,
      props: {
        title: 'Tell us something about you',
        disclaimer: 'What makes you stand out? What are you passionate about?',
      }
    },
    header: 'Something about you',
    id: 'something-about-you',
  },
  {
    content: {
      component: OnboardingSection,
      props: {
        title: 'Where does your journey takes you?',
        disclaimer: 'What are your ambitions? Where do you see yourself in a few years?',
      }
    },
    header: 'Your ambitions',
    id: 'your-ambitions',
  },
  {
    content: {
      component: 'div',
      props: {
        title: 'Title',
        disclaimer: 'disclaimer',
        placeholder: 'Enter your text'
      },
    },
    header: 'Your experience',
    id: 'experience',
  },
]);

// Methods

const submitData = () => {
  console.log('Submit Data', payload.value);
};

const onNextButtonClick = (stepId) => {
  console.log(stepId, isLastStep.value)
  if (isLastStep.value) {
    submitData();
    return;
  }

  if (stepId === 'something-about-you') aboutYouText.value = userInput.value;
  else if (stepId === 'your-ambitions') ambitionsText.value = userInput.value;

  userInput.value = '';
  activeStep.value++;
};

</script>

<style lang="scss">
.profiling-steps {

  // .profiling-steps__action-buttons
  &__action-buttons {
    margin-top: 35px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 50px;
  }

  // Prime Vue Overrides

  .p-button:not(.p-button-text) {
    padding: 18px 32px;
    background-color: $color-primary;
    color: $color-white;
    border-radius: 5px;
  }

  .p-button-text .p-button-label {
    text-decoration: underline;
    font-size: $font-size-lg;
    color: $color-text;
    font-weight: $font-weight-regular;
  }

  .p-highlight {
    .p-stepper-number {
      border-color: $color-primary;
      color: $color-primary;
    }

    .p-stepper-title {
      color: $color-primary;
    }
  }

  .p-stepper-action {
    @apply flex flex-col items-center justify-center gap-5;
  }

  .p-stepper-header {
    @apply flex items-start;
  }

  &.p-stepper .p-stepper-header:has(~ .p-highlight) .p-stepper-separator {
    background-color: $color-primary;
  }

  .p-stepper-nav {
    @apply mx-32;
  }

  .p-stepper-number {
    height: 48px;
    width: 48px;
    background: transparent;
    border: 3px solid $color-light-gray;
    color: $color-text;

    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
  }

  .p-stepper-panels {
    @apply mt-28;
  }

  .p-stepper-separator {
    margin-inline-start: 0;
    background-color: $color-light-gray;
    @apply mt-6;
  }

  .p-stepper-title {
    color: $color-text;
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
  }
}
</style>