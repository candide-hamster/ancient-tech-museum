<script setup lang="ts">
defineProps<{
  exhibit: {
    id: string
    name: string
    description: string
    thumbnail: string
  }
}>()
</script>

<template>
  <div class="exhibit-card">
    <img :src="exhibit.thumbnail" :alt="exhibit.name">
    <div class="content">
      <h3>{{ exhibit.name }}</h3>
      <p>{{ exhibit.description }}</p>
    </div>
  </div>
</template>

<style scoped>
.exhibit-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s;
  cursor: pointer;
}

.exhibit-card:hover {
  transform: translateY(-4px);
}

.exhibit-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.content {
  padding: 15px;
}

h3 {
  margin: 0 0 10px 0;
}

p {
  margin: 0;
  color: #666;
}
</style> 