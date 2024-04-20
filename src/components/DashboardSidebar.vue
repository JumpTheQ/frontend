<template>
  <div class="dashboard-sidebar">
    <ul class="dashboard-sidebar__actions-list">
      <li
        v-for="action, index in actions"
        :key="`sidebar-action-${index}`"
        class="dashboard-sidebar__action"
      >
        <span v-if="icon">{{ icon }}</span>
        {{ action.text }}
      </li>
    </ul>
  </div>
</template>

<script setup>

const actions = [
  {
    icon: null,
    text: 'Some Text'
  },
  {
    icon: null,
    text: 'Some Text'
  },
  {
    icon: null,
    text: 'Some Text'
  },
  {
    icon: null,
    text: 'Some Text'
  },
];
</script>

<style lang="scss" scoped>
.dashboard-sidebar {
  display: flex;
  flex-direction: column;
  padding: 1rem;

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
}
</style>