<template>
  <NavigationBar class="app_navbar" />
  <div class="create-application">
    <DashboardSidebar />
    <div class="create-application__content">
      <Card>
        <template #title>
          <div class="create-application__card-title">
            <div class="create-application__application-infos">
              <h3 class="create-application__title">Job Application</h3>
              <p class="create-application__description">
                Frontend Developer @ <span>Shift APPens</span>
              </p>
            </div>
            <Button
              class="create-application__view-button"
              label="Show Description"
              link
            />
          </div>
        </template>
        <template #content>
          <div class="create-application__card-content">
            <h3>Persinalize insights</h3>

            <p create-application__job-description>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam voluptas tempore magnam doloribus ab
              libero recusandae facilis ad facere quam soluta dolorem quisquam quia pariatur consectetur illum
              reiciendis,
              maxime suscipit.
            </p>
          </div>
        </template>
      </Card>
      <div class="create-application__targets">
        <TabView class="create-application__display">
          <TabPanel header="Curriculum">
            <div class="create-application__target-sub-header">
              <p class="create-application__disclaimer">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
              <div class="create-application__target-sub-header-actions">
                <Button
                  class="create-application__target-sub-header-action"
                  icon="pi pi-search"
                />
                <Button
                  class="create-application__target-sub-header-action"
                  icon="pi pi-download"
                />
              </div>
            </div>

            <Card>
              <template #content>
                <p>Curriculum</p>
              </template>
            </Card>
          </TabPanel>
          <TabPanel header="Motivation Letter">
            <p class="create-application__disclaimer">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>

            <Card>
              <template #content>
                <p>Motivation Le1tter</p>
              </template>
            </Card>
          </TabPanel>
        </TabView>
        <div class="create-application__chat-container">
          <h2 for="">Label</h2>
          <ChatWindow />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavigationBar from '@/components/NavigationBar.vue';
import DashboardSidebar from '@/components/DashboardSidebar.vue';

import Card from 'primevue/card';
import Button from 'primevue/button';


import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';


import ChatWindow from '@/components/ChatWindow.vue';



</script>

<style lang="scss">
.create-application {
  @apply container mt-16;
  @apply flex;

  // .create-application__card-title
  &__card-title {
    position: relative;
    @apply w-full flex items-start justify-between;
    padding-bottom: 20px;

    .p-button-link .p-button-label {
      text-decoration: underline;
      font-size: $font-size-lg;
      color: $color-primary;
      font-weight: $font-weight-regular;
    }

    &::after {
      position: absolute;
      bottom: -20px;
      left: 0;
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      background-color: $color-primary;
      margin-top: 16px;
    }
  }

  // .create-application__application-infos
  &__application-infos {
    @apply flex flex-col gap-4;
  }

  // .create-application__content
  &__content {
    @apply flex flex-col grow;
  }

  // .create-application__chat-container
  &__chat-container {
    @apply shrink-0;
  }

  // .create-application__card-content
  &__card-content {
    @apply flex flex-col gap-4;
  }

  // .create-application__job-title
  &__job-title {
    @apply flex flex-col gap-4;
  }

  // .create-application__description
  &__description {
    margin: 0;
    margin-top: 16px;
    font-size: $font-size-md;
    color: $color-text;

    span {
      font-weight: $font-weight-bold;
    }
  }

  // .class="create-application__disclaimer"
  &__disclaimer {
    margin-top: 28px;
    font-size: $font-size-md;
    color: $color-text;
    font-weight: $font-weight-regular;
  }

  // .create-application__display
  &__display {
    @apply grow;

    .p-tabview-nav {
      background-color: transparent
    }

    .p-tabview-header .p-tabview-nav-link {
      background-color: transparent;
      font-weight: $font-weight-regular;
      font-size: $font-size-lg;
    }

    .p-tabview-header.p-highlight {
      font-weight: $font-weight-bold;
      color: $color-primary;
    }

    &.p-tabview .p-tabview-nav .p-tabview-ink-bar {
      background-color: $color-primary; // Not working
    }

    &.p-tabview .p-tabview-panels {
      background: transparent;
      padding: 0;
    }
  }

  // .create-application__target-sub-header
  &__target-sub-header {
    @apply flex items-center justify-between;
  }

  // .create-application__target-sub-header-actions
  &__target-sub-header-actions {
    @apply flex gap-4;
  }

  // .create-application__target-sub-header-action
  &__target-sub-header-action {}

  // .create-application__targets
  &__targets {
    @apply flex mt-6 gap-4;
  }

  // .create-application__title
  &__title {
    font-size: 18px;
    color: $color-primary;
    font-weight: $font-weight-bold;
  }
}
</style>