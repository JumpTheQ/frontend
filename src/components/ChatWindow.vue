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
            'chat-window__chat-bubble--ai': bubble.isAi,
          }"
        >
          {{ bubble.message }}
        </div>
      </div>
    </template>
    <template #footer>
      <!-- <div class="chat-window__footer">
        <div class="chat-window__scroll-bubble">
          <span class="pi pi-angle-down" />
        </div> -->
      <Textarea
        v-model="userPrompt"
        placeholder="Type a message and press Shift + Enter to send"
        @keydown.shift.enter.prevent="onPromptSubmit"
      />
      <!-- </div> -->
    </template>
  </Card>
</template>

<script setup>
import { nextTick, ref } from 'vue';

import Card from 'primevue/card';
import Textarea from 'primevue/textarea';

// State

const chatContainer = ref(null);
const userPrompt = ref('');

const mocked = Array.from({ length: 10 }, (_, i) => ({
  message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates eius quisquam natus, mollitia nemo quasi delectus dolore corporis placeat harum dicta molestiae laborum veniam neque nihil vero incidunt! Tenetur, quis.',
  isAi: i && i % 2 === 0,
}));

// Methods

const onPromptSubmit = () => {
  if (!userPrompt.value) return;

  mocked.push({
    message: userPrompt.value,
    isAi: false,
  })

  mocked.push({
    message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates eius quisquam natus, mollitia nemo quasi delectus dolore corporis placeat harum dicta molestiae laborum veniam neque nihil vero incidunt! Tenetur, quis.',
    isAi: true,
  })

  chatContainer.value.animate({
    scrollTop: chatContainer.value.scrollHeight
  }, 500);

  nextTick(() => {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  });

  userPrompt.value = '';
};
</script>

<style lang="scss">
.chat-window {
  max-width: 360px;

  &__conversation {
    width: 100%;
    height: 100%;
    max-height: 600px;
    overflow-y: scroll;
  }

  &__chat-bubble {
    background-color: $color-primary;
    padding: 8px;
    border-radius: $base-border-radius;
    color: $color-white;
    width: fit-content;

    text-align: right;
    text-wrap: wrap;

    margin-left: auto;

    &--ai {
      text-align: left;
      background-color: $color-secondary;
      color: $color-text;
      margin-left: 0;
      margin-right: auto;
    }

    &:not(:first-child) {
      margin-top: 8px;
    }

    &:not(#{&}--ai)+#{&}--ai,
    &--ai+#{&}:not(#{&}--ai) {
      margin-top: 16px;
    }
  }

  // .chat-window__footer
  &__footer {
    position: relative;
  }

  // .chat-window__scroll-bubble
  &__scroll-bubble {
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: -20px;
    left: 50%;
    transform: translate(-50%, -100%);
    padding: 8px;
    border-radius: 50%;
    background-color: $color-secondary;
    color: $color-primary;
    cursor: pointer;
  }

  .p-inputtext {
    width: 100%;
    min-height: 36px;
    height: 120px;
    padding: 10px 16px;
    color: $color-text;
    font-size: $font-size-md;
    font-weight: $font-weight-regular;

    resize: none;

    border: 1px solid $color-light-gray;
    border-radius: $base-border-radius;

    &::placeholder {
      color: $color-placeholder;
    }
  }

  .p-card-body {
    padding: 16px;
  }
}
</style>