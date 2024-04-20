<template>
  <nav class="navigation-bar">
    <div class="navigation-bar__logo-container">
      <img
        class="navigation-bar__logo"
        :src="logo"
      >
    </div>
    <div class="navigation-bar__actions">
      <!-- if in dashboard -->
      <!-- <InputText
        class="navigation-bar__search"
        v-model="searchValue"
        placeholder="Search"
      />
      <div>not</div> -->
      <div class="navigation-bar__thumbnail-container">
        <img
          class="navigation-bar__thumbnail"
          src="@/assets/images/avatar.jpeg"
        >
      </div>
    </div>
  </nav>
</template>

<script setup>
import logo from '@/assets/images/logo.svg';
// import { ref } from 'vue';

// import IconField from 'primevue/iconfield';
// import InputText from 'primevue/inputtext';


// const searchValue = ref('');
</script>

<style lang="scss" scoped>
.navigation-bar {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: transparent;

  &__actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  &__thumbnail-container {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    overflow: hidden;
  }

  &__thumbnail {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  // .navigation-bar__logo
  &__logo-container {
    width: 100px;
    height: 50px;
  }

  &__logo {
    width: 100%;
    height: 100%;
  }
}
</style>