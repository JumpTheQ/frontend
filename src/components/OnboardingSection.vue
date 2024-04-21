<template>
  <div class="onboarding-section">
    <h2 class="onboarding-section__title">
      {{ title }}
    </h2>
    <p class="onboarding-section__disclaimer">
      {{ disclaimer }}
    </p>
    <Textarea
      class="input onboarding-section__textarea"
      v-model="value"
      auto-resize
      @keyup.shift.enter.prevent="fireNextStepEvent"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';

import Textarea from 'primevue/textarea';

const props = defineProps({
  disclaimer: {
    default: null,
    type: String
  },

  modelValue: {
    default: null,
    type: String
  },

  title: {
    default: null,
    type: String
  },
});

const emit = defineEmits(['update:modelValue']);

// Computed

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const fireNextStepEvent = () => { };
</script>

<style lang="scss">
.onboarding-section {

  // .onboarding-section__disclaimer
  &__disclaimer {
    margin-top: 11px;
    font-size: $font-size-md;
    font-weight: $font-weight-regular;
  }

  // .onboarding-section__textarea
  &__textarea {
    margin-top: 18px;
    min-height: 280px;
    max-height: 300px;

    resize: none;
  }

  // .onboarding-section__title
  &__title {
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
  }
}
</style>