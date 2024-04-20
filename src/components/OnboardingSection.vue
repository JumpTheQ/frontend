<template>
  <div class="about-section">
    <h2 class="about-section__title">
      {{ title }}
    </h2>
    <p class="about-section__disclaimer">
      {{ disclaimer }}
    </p>
    <Card>
      <template #content>
        <Textarea
          v-model="value"
          rows="8"
        />
      </template>
    </Card>
  </div>
</template>

<script setup>
import { computed } from 'vue';

import Card from 'primevue/card';
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
</script>

<style lang="scss">
.about-section {
  .about-section__disclaimer {
    margin: 0;
    margin-top: 11px;
    font-size: $font-size-md;
    font-weight: $font-weight-regular;
    margin-bottom: 8px;
  }

  .about-section__title {
    margin: 0;
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    margin-bottom: 8px;
  }

  .p-inputtextarea {
    width: 100%;
    resize: none;
    padding: 8px;
  }

  .p-inputtext {
    box-shadow: none;
  }

  .p-card {
    margin-top: 18px;

    .p-card-body {
      padding: 0;
    }

    box-shadow: 0px 2px 30px 0px #0000001A;
    padding: 16px;
  }
}
</style>