<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useExhibitStore } from '../stores/exhibit'
import ARViewer from '../components/ARViewer.vue'

const route = useRoute()
const router = useRouter()
const exhibitStore = useExhibitStore()

onMounted(async () => {
  const id = route.params.id as string
  await exhibitStore.loadExhibitDetail(id)
  
  if (!exhibitStore.currentExhibit) {
    router.push('/')
  }
})
</script>

<template>
  <div class="ar-view">
    <ARViewer
      v-if="exhibitStore.currentExhibit"
      :model-path="exhibitStore.currentExhibit.modelPath"
    />
    <div v-else class="loading">
      加载中...
    </div>
  </div>
</template>

<style scoped>
.ar-view {
  width: 100vw;
  height: 100vh;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style> 