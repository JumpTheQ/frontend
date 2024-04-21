<template>
  <div class="dashboard-sidebar">
    <ul class="dashboard-sidebar__actions-list">
      <li
        v-for="action, index in actions"
        :key="`sidebar-action-${index}`"
        class="dashboard-sidebar__action"
      >
        <Button
          link
          class="dashboard-sidebar__action-button"
          :class="{
            'dashboard-sidebar__action-button--active': action.active
          }"
          :label="action.label"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
import Button from 'primevue/button';

const actions = [
  {
    active: true,
    icon: 'pi pi-briefcase',
    label: 'Applications',
    to: '/dashboard'
  },
  {
    active: false,
    icon: 'pi pi-user',
    label: 'Profile',
    // to: '/profile'
    to: '/dashboard'
  },
  {
    active: false,
    icon: 'pi pi-cog',
    label: 'Settings',
    to: '/dashboard'
    // to: '/settings'
  }
];
</script>

<style lang="scss">
.dashboard-sidebar {
  display: flex;
  flex-direction: column;
  padding: 0 1rem;

  &__actions-list {
    list-style-type: none;
    padding: 0;
    margin: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-self: flex-start;
    gap: 2rem;
  }

  // .dashboard-sidebar__action-button
  &__action-button {
    padding: 8px;
    border-radius: $base-border-radius;

    .p-button-icon {
      font-size: 2rem;
    }

    .p-button-label {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100px;

      font-size: $font-size-lg;
      font-weight: $font-weight-regular;
    }

    // .dashboard-sidebar__action-button--active
    &--active {
      background-color: $color-secondary;
      @apply rounded-lg;

      .p-button-icon {
        color: $color-primary;
      }

      .p-button-label {
        font-weight: $font-weight-bold;
      }
    }
  }
}
</style>
