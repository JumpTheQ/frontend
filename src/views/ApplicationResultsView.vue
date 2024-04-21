<template>
  <div class="application-results">
    <div class="application-results__results">
      <JobApplicationCard
        v-if="application"
        :application="application"
      />
      <div class="application-results__display">
        <TabMenu
          class="application-results__display-header"
          :active-index="activeIndex"
          :model="tabs"
          @tab-change="onTabChange"
        />
        <div class="application-results__display-subheader">
          <p class="text application-results__display-subheader-disclaimer">
            You may ask for improvements in each section by clicking on it. It will be highlighted on
            the chat. You may also use the chat to update the entire Motivation Letter.
          </p>
          <div class="application-results__display-subheader-actions">
            <Button
              class="application-results__display-subheader-action"
              icon="pi pi-search"
            />
            <Button
              class="application-results__display-subheader-action"
              icon="pi pi-download"
            />
          </div>
        </div>
        <ResumeCard
          v-if="isCvTabActive"
          class="application-results__display-content"
          :application-id="applicationId"
          :resume-id="resumeId"
        />
        <CoverLetterCard
          v-if="isLetterTabActive"
          class="application-results__display-content"
          :application-id="applicationId"
          :cover-letter-id="coverLetterId"
        />
      </div>
    </div>
    <div class="application-results__chat">
      <h2 class="label application-results__chat-label">
        Chat
      </h2>
      <ChatWindow class="application-results__chat-window" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import useApplicationsStore from '@/stores/applications';

import TabMenu from 'primevue/tabmenu';
import Button from 'primevue/button';

import CoverLetterCard from '@/components/CoverLetterCard.vue';
import ChatWindow from '@/components/ChatWindow.vue';
import JobApplicationCard from '@/components/JobApplicationCard.vue';
import ResumeCard from '@/components/ResumeCard.vue';

// Store

const applicationStore = useApplicationsStore();

// Router

const route = useRoute();

// State

const activeIndex = ref(0);

const tabs = ref([
  {
    id: 'cv',
    label: 'Curriculum'
  },
  {
    id: 'letter',
    label: 'Motivation Letter'
  }
]);

// Computed

const applicationId = computed(() => route.params.id);

const application = computed(() => applicationStore.records[route.params.id]);

const coverLetterId = computed(() => application.value?.coverLetter?.id);

const resumeId = computed(() => application.value?.resume?.id);

const isCvTabActive = computed(() => tabs.value[activeIndex.value].id === 'cv');

const isLetterTabActive = computed(() => tabs.value[activeIndex.value].id === 'letter');

// Methods

const onTabChange = ({ index }) => {
  activeIndex.value = index;
}

onMounted(() => {
  if (!application.value) applicationStore.fetchApplication(applicationId.value);
});
</script>

<style lang="scss">
.application-results {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: max-content;
  grid-template-areas: 'results chat';
  gap: 16px;

  // .application-results__chat
  &__chat {
    // margin-top = label height (27px) + chat window top margin (16px)
    margin-top: -43px;
    grid-area: chat;
  }

  // .application-results__chat-label
  &__chat-label {
    color: $color-primary;
  }

  // .application-results__chat-window
  &__chat-window {
    margin-top: 16px;
  }


  // .application-results__display
  &__display {
    margin-top: 64px;
    margin-bottom: 16px;
  }

  // .application-results__display-content
  &__display-content {
    margin-top: 32px;
  }

  // .application-results__display-header
  &__display-header {

    // .application-results__display-header .p-tabmenu-nav
    .p-tabmenu-nav {
      background-color: transparent;
      border-bottom: 2px solid $color-secondary;
    }

    // .application-results__display-header .p-tabmenu-ink-bar
    .p-tabmenu-ink-bar {
      border: 2px solid $color-primary;
    }

    // .application-results__display-header .p-menuitem-link
    .p-menuitem-link {
      background-color: transparent;
      font-size: $font-size-lg;
      font-weight: $font-weight-regular;
      color: $color-text;
    }

    // .application-results__display-header .p-tabmenuitem.p-highlight
    .p-tabmenuitem.p-highlight {

      // .application-results__display-header .p-tabmenuitem.p-highlight .p-menuitem-link
      .p-menuitem-link {
        color: $color-primary;
        font-weight: $font-weight-bold;
      }
    }
  }

  // .application-results__display-subheader
  &__display-subheader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;

    margin-top: 30px;
  }

  // .application-results__display-subheader-action
  &__display-subheader-action {
    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 20px;
    background-color: $color-secondary;
    padding: 4px 8px;
  }

  // .application-results__display-subheader-actions
  &__display-subheader-actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 16px;
  }

  // .application-results__results
  &__results {
    grid-area: results;
  }
}
</style>
