<template>
  <Card class="chat-window">
    <template #content>
      <div
        class="chat-window__conversation"
        ref="chatContainer"
      >
        <div
          v-for="bubble, index in mocked"
          :key="`bubble-${index}`"
          class="chat-window__chat-bubble"
          :class="{
            'chat-window__chat-bubble--ai-generated': bubble.isAiGenerated,
          }"
        >
          {{ bubble.message }}
        </div>
      </div>
    </template>
    <template #footer>
      <Textarea
        class="input chat-window__textarea"
        auto-resize
        v-model="userPrompt"
        placeholder="Type a message and press Shift + Enter to send"
        @keydown.shift.enter.prevent="onPromptSubmit"
      />
    </template>
  </Card>
</template>

<script setup>
import { nextTick, ref, watch } from 'vue';

import Card from 'primevue/card';
import Textarea from 'primevue/textarea';


// Mocked

const mocked = Array.from({ length: 10 }, (_, i) => ({
  message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates eius quisquam natus, mollitia nemo quasi delectus dolore corporis placeat harum dicta molestiae laborum veniam neque nihil vero incidunt! Tenetur, quis.',
  isAiGenerated: i && i % 2 === 0,
}));

// State

const chatContainer = ref(null);

const prompts = ref(mocked);

const userPrompt = ref('');

// Methods

const onPromptSubmit = () => {
  if (!userPrompt.value) return;

  mocked.push({
    message: userPrompt.value,
    isAiGenerated: false,
  })

  prompts.value = JSON.parse(JSON.stringify(mocked))
  userPrompt.value = '';
};

const scrollToBottom = () => {
  if (chatContainer.value) chatContainer.value.scrollTo(0, chatContainer.value.scrollHeight);
};

// Watchers

watch(
  () => prompts.value,
  () => {
    nextTick(scrollToBottom);
  },
  { immediate: true }
);
</script>

<style lang="scss">
.chat-window {

  // .chat-window__chat-bubble
  &__chat-bubble {
    background-color: $color-primary;
    padding: 8px;
    border-radius: $base-border-radius;
    max-width: 80%;
    color: $color-white;
    width: fit-content;

    text-align: right;
    text-wrap: wrap;

    margin-left: auto;

    // .chat-window__chat-bubble--ai-generated
    &--ai-generated {
      text-align: left;
      background-color: $color-secondary;
      color: $color-text;
      margin-left: 0;
      margin-right: auto;
    }

    // .chat-window__chat-bubble--ai-generated:not(:first-child)
    &:not(:first-child) {
      margin-top: 8px;
    }

    // .chat-window__chat-bubble:not(.chat-window__chat-bubble--ai-generated)+.chat-window__chat-bubble--ai-generated
    // .chat-window__chat-bubble--ai-generated+.chat-window__chat-bubble:not(.chat-window__chat-bubble--ai-generated)
    &:not(#{&}--ai)+#{&}--ai-generated,
    &--ai-generated+#{&}:not(#{&}--ai) {
      margin-top: 16px;
    }
  }

  // .chat-window__conversation
  &__conversation {
    width: 100%;
    height: 100%;
    max-height: 600px;
    overflow-y: scroll;
  }

  // .chat-window__textarea
  &__textarea {
    max-height: 120px;
    resize: none;
  }
}
</style>