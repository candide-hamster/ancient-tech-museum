<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useExhibitStore } from '../stores/exhibit'
import { storageManager } from '../utils/storage'
import ExhibitCard from '../components/ExhibitCard.vue'

const exhibitStore = useExhibitStore()
const favoriteExhibits = ref<any[]>([])

const loadFavorites = async () => {
  const records = await storageManager.getFavoriteRecords()
  favoriteExhibits.value = exhibitStore.exhibits.filter(exhibit => 
    records.some(record => record.id === exhibit.id && record.favorite)
  )
}

onMounted(async () => {
  if (exhibitStore.exhibits.length === 0) {
    await exhibitStore.loadExhibits()
  }
  await loadFavorites()
})
</script>

<template>
  <div class="favorites">
    <h1>我的收藏</h1>
    
    <div v-if="favoriteExhibits.length === 0" class="empty-state">
      <img src="../assets/images/empty-favorites.png" alt="暂无收藏">
      <p>您还没有收藏任何展品</p>
      <router-link to="/" class="browse-link">浏览展品</router-link>
    </div>
    
    <div v-else class="favorites-grid">
      <ExhibitCard
        v-for="exhibit in favoriteExhibits"
        :key="exhibit.id"
        :exhibit="exhibit"
        @click="$router.push(`/exhibit/${exhibit.id}`)"
      />
    </div>
  </div>
</template>

<style scoped>
.favorites {
  padding: 80px 20px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 40px;
}

.empty-state {
  text-align: center;
  padding: 40px;
}

.empty-state img {
  width: 200px;
  margin-bottom: 20px;
}

.browse-link {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background: #2196F3;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background 0.3s;
}

.browse-link:hover {
  background: #1976D2;
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
</style> 