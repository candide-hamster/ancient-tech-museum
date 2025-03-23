<template>
  <div class="exhibits">
    <h2>展品陈列</h2>
    <div class="exhibits-grid">
      <ExhibitCard
        v-for="exhibit in exhibits"
        :key="exhibit.id"
        :exhibit="exhibit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ExhibitCard from '../components/ExhibitCard.vue'

const exhibits = ref([
  {
    id: 'sundial',
    name: '日晷',
    brief: '中国古代测量时间的重要发明',
    modelPath: '/models/sundial.gltf'
  },
  {
    id: 'seismograph',
    name: '地动仪',
    brief: '张衡发明的测量地震的仪器',
    modelPath: '/models/seismograph.gltf'
  },
  {
    id: 'compass',
    name: '司南',
    brief: '世界上最早的指南针',
    modelPath: '/models/compass.gltf'
  }
])
</script>

<style scoped>
.exhibits {
  padding: 2rem;
}

.exhibits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
</style> 