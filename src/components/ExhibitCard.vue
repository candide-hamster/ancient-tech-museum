<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'
import { useRouter } from 'vue-router'
import * as THREE from 'three'

const props = defineProps<{
  exhibit: {
    id: string
    name: string
    brief: string
    modelPath: string
  }
}>()

const router = useRouter()
const canvas = ref<HTMLCanvasElement>()

const navigateToDetail = () => {
  router.push(`/exhibit/${props.exhibit.id}`)
}

onMounted(() => {
  // Three.js 预览渲染逻辑将在这里实现
})
</script>

<template>
  <div class="exhibit-card" @click="navigateToDetail">
    <div class="exhibit-preview">
      <canvas ref="canvas"></canvas>
    </div>
    <div class="exhibit-info">
      <h3>{{ exhibit.name }}</h3>
      <p>{{ exhibit.brief }}</p>
    </div>
  </div>
</template>

<style scoped>
.exhibit-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s;
}

.exhibit-card:hover {
  transform: translateY(-5px);
}

.exhibit-preview {
  height: 200px;
  background: #f5f5f5;
}

.exhibit-preview canvas {
  width: 100%;
  height: 100%;
}

.exhibit-info {
  padding: 1rem;
}

.exhibit-info h3 {
  margin: 0;
  color: #2c3e50;
}

.exhibit-info p {
  margin: 0.5rem 0 0;
  color: #666;
  font-size: 0.9rem;
}
</style> 