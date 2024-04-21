<template>
  <div class="application-list">
    <div class="flex items-center justify-between mb-6">
      <h3>My Applications</h3>
      <router-link :to="{ name: 'application-new' }">
        <Button
          label="New Application"
          class="button"
        />
      </router-link>
    </div>
    <div class="bg-white rounded-lg overflow-hidden">
      <div v-if="loading" class="p-4">
        <Skeleton class="mb-2"></Skeleton>
        <Skeleton width="10rem" class="mb-2"></Skeleton>
        <Skeleton width="5rem" class="mb-2"></Skeleton>
        <Skeleton height="2rem" class="mb-2"></Skeleton>
        <Skeleton width="10rem" height="4rem"></Skeleton>
      </div>
      <DataTable :value="applicationStore.rows" v-else>
        <Column field="name" header="Application"></Column>
        <Column field="created_at" header="Applied at"></Column>
        <Column field="options" header="">
          <template #body="{ data }">
            <router-link :to="{ name: 'application-view', params: { id: data.id } }" class="text-purple-800">
              View
            </router-link>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import useApplicationStore from '../stores/applications.js'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Skeleton from 'primevue/skeleton'
import { onMounted, ref } from 'vue'
import Button from 'primevue/button'

const applicationStore = useApplicationStore()

const loading = ref(false)

onMounted(async() => {
  loading.value = true
  await applicationStore.fetchApplications()
  loading.value = false
})
</script>

<style lang="scss">
.application-list {
  h3 {
    color: $color-text;
    font-size: $font-size-md;
    font-weight: $font-weight-bold;
  }
}
</style>
