<script setup lang="ts">
import { onMounted } from 'vue'
import { useExhibitStore } from '../stores/exhibit'
import ExhibitCard from '../components/ExhibitCard.vue'

const exhibitStore = useExhibitStore()

onMounted(async () => {
  await exhibitStore.loadExhibits()
})
</script>

<template>
  <div class="home">
    <header class="header">
      <h1>溯古·启智</h1>
      <p>中国古代物理科技互动展馆</p>
    </header>
    
    <main class="exhibit-grid">
      <div v-if="exhibitStore.loading" class="loading">
        加载中...
      </div>
      <div v-else-if="exhibitStore.error" class="error">
        {{ exhibitStore.error }}
      </div>
      <template v-else>
        <ExhibitCard
          v-for="exhibit in exhibitStore.exhibits"
          :key="exhibit.id"
          :exhibit="exhibit"
          @click="$router.push(`/exhibit/${exhibit.id}`)"
        />
      </template>
    </main>
  </div>
</template>

<style scoped>
.home {
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.exhibit-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.loading, .error {
  text-align: center;
  grid-column: 1 / -1;
  padding: 40px;
}
</style> 