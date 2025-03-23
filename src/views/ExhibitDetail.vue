<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useExhibitStore } from '../stores/exhibit'
import ExhibitViewer from '../components/ExhibitViewer.vue'
import { storageManager } from '../utils/storage'

const route = useRoute()
const exhibitStore = useExhibitStore()
const showAR = ref(false)

onMounted(async () => {
  const id = route.params.id as string
  await exhibitStore.loadExhibitDetail(id)
  
  // 记录访问历史
  if (exhibitStore.currentExhibit) {
    await storageManager.saveExhibitRecord({
      id,
      visitTime: Date.now(),
      favorite: false
    })
  }
})

const handleEnterAR = () => {
  showAR.value = true
}
</script>

<template>
  <div class="exhibit-detail">
    <div v-if="exhibitStore.loading" class="loading">
      加载中...
    </div>
    <div v-else-if="exhibitStore.error" class="error">
      {{ exhibitStore.error }}
    </div>
    <template v-else-if="exhibitStore.currentExhibit">
      <header class="detail-header">
        <h1>{{ exhibitStore.currentExhibit.name }}</h1>
        <div class="meta">
          <span>创建年代: {{ exhibitStore.currentExhibit.yearCreated }}</span>
          <span>发明者: {{ exhibitStore.currentExhibit.creator }}</span>
        </div>
      </header>

      <div class="viewer-container">
        <ExhibitViewer
          :model-path="exhibitStore.currentExhibit.modelPath"
          :description="exhibitStore.currentExhibit.description"
          @enter-ar="handleEnterAR"
        />
      </div>

      <div class="details">
        <h2>详细介绍</h2>
        <ul>
          <li v-for="(detail, index) in exhibitStore.currentExhibit.details"
              :key="index">
            {{ detail }}
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<style scoped>
.exhibit-detail {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.detail-header {
  text-align: center;
  margin-bottom: 30px;
}

.meta {
  display: flex;
  justify-content: center;
  gap: 20px;
  color: #666;
}

.viewer-container {
  height: 600px;
  margin: 20px 0;
  border-radius: 8px;
  overflow: hidden;
}

.details {
  margin-top: 40px;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
}

.details ul {
  list-style: none;
  padding: 0;
}

.details li {
  margin: 10px 0;
  line-height: 1.6;
}

.loading, .error {
  text-align: center;
  padding: 40px;
}
</style> 