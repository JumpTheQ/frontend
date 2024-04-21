<template>
  <Card class="chat-window">
    <template #content>
      <div
        class="chat-window__conversation"
        ref="chatContainer"
      >
        <div v-if="loading" class="w-full">
          <Skeleton class="mb-2"></Skeleton>
          <Skeleton width="10rem" class="mb-2"></Skeleton>
          <Skeleton width="5rem" class="mb-2"></Skeleton>
          <Skeleton height="2rem" class="mb-2"></Skeleton>
          <Skeleton width="10rem" height="4rem"></Skeleton>
        </div>
        <div
          v-else
          class="chat-window__chat-bubble"
          :class="{
            'chat-window__chat-bubble--ai-generated': true,
          }"
        >
          There were the artifacts I've generated for you fully customized for this job offer! <br>
          <br>
          Feel free to iterate on top of them!
        </div>
        <div
          v-for="prompt in prompts"
          :key="`bubble-${prompt.id}`"
          class="chat-window__chat-bubble"
          :class="{
            'chat-window__chat-bubble--ai-generated': prompt.isAiGenerated,
          }"
        >
          <div class="quote" v-if="prompt.promptable">{{ prompt.promptable.content.substring(0, 50) }}</div>
          {{ prompt.content }}
        </div>
      </div>
    </template>
    <template #footer>
      <div class="relative">
        <div class="absolute bottom-0 mb-28 z-10" v-if="activeSection">
          <span class="absolute right-0 top-0 mr-3 mt-1.5 cursor-pointer z-20" @click="cancelActiveSection">x</span>
          <div class="chat-window__active-section">
            {{ activeSection.content }}
          </div>
        </div>
        <Textarea
          class="input chat-window__textarea"
          v-model="userPrompt"
          placeholder="Type a message and press Shift + Enter to send"
          @keydown.meta.enter.prevent="onPromptSubmit"
          @keydown.ctrl.enter.prevent="onPromptSubmit"
        />
      </div>
    </template>
  </Card>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import usePromptStore from '@/stores/prompt.js'

import Card from 'primevue/card';
import Textarea from 'primevue/textarea';
import Skeleton from 'primevue/skeleton'

const props = defineProps({
  applicationId: {
    type: String,
    default: null
  },
  promptable: {
    type: Object,
    default: () => {}
  }
})

const promptStore = usePromptStore()

// State

const chatContainer = ref(null);

const prompts = computed(() => promptStore.applicationPrompts(props.applicationId) ?? []);
const activeSection = computed(() => promptStore.activeSection)

const loading = ref(false)
const userPrompt = ref('');

// Methods

const onPromptSubmit = async () => {
  const payload = {
    content: userPrompt.value,
    promptable_type: activeSection.value ? 'App\\Models\\Section' : props.promptable.type,
    promptable_id: activeSection.value ? activeSection.value.id : props.promptable.id
  }

  await promptStore.createPrompt(props.applicationId, payload)
};

const scrollToBottom = () => {
  if (chatContainer.value) chatContainer.value.scrollTo(0, chatContainer.value.scrollHeight);
};

const cancelActiveSection = () => {
  promptStore.setActiveSection(null);
}

onMounted(async () => {
  loading.value = true
  await promptStore.fetchPrompts(props.applicationId)
  loading.value = false
})
// Watchers

/* watch(
  () => prompts.value,
  () => {
    nextTick(scrollToBottom);
  }
); */
</script>

<style lang="scss">
.chat-window {
  position: fixed;
  margin-right: 16px;
  height: calc(100vh - 96px);

  .p-card-body, .p-card-content {
    @apply h-full;
  }
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
    max-height: calc(100vh - 240px);
    overflow-y: scroll;
  }

  &__active-section {
    background-color: #F2E9F4;
    padding: 8px 8px 8px 24px;
    border-radius: $base-border-radius;
    opacity: 0.8;
    position: relative;
    &::before {
      content: 'Highlighted section';
      color: #791E94;
      font-weight: 600;
      @apply block -ml-3 mb-2;
    }
    &::after {
      content: ' ';
      display: block;
      top: 46px;
      bottom: 12px;
      left: 12px;
      width: 2px;
      background-color: #791E94;
      position: absolute;
    }
  }

  .quote {
    @apply relative opacity-50 mb-2 pl-2;
    &::before {
      content: ' ';
      display: block;
      background-color: #fff;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 2px;
    }
  }

  // .chat-window__textarea
  &__textarea {
    height: 80px;
    resize: none;
  }
}
</style>
