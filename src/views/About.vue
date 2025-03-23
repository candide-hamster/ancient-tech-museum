<script setup lang="ts">
import { ref } from 'vue'

const sections = ref([
  {
    title: '展馆简介',
    content: '溯古·启智是一个致力于展示中国古代物理科技成就的数字展馆。通过现代Web3D技术，我们为观众带来身临其境的互动体验，让古代科技智慧在数字时代焕发新生。'
  },
  {
    title: '技术特色',
    content: '运用Three.js实现高精度3D模型展示，结合WebXR技术提供AR体验，通过AI驱动的智能讲解系统，为观众提供沉浸式的学习体验。'
  },
  {
    title: '展品收录',
    content: '目前收录张衡地动仪、水运仪象台、浑天仪等十余件重要科技文物的数字复原模型，未来将持续扩充馆藏。'
  }
])
</script>

<template>
  <div class="about">
    <header class="about-header">
      <h1>关于展馆</h1>
      <p class="subtitle">传承文明 · 启迪智慧</p>
    </header>

    <div class="sections">
      <div v-for="(section, index) in sections" 
           :key="index"
           class="section">
        <h2>{{ section.title }}</h2>
        <p>{{ section.content }}</p>
      </div>
    </div>

    <div class="contact">
      <h2>联系我们</h2>
      <div class="contact-info">
        <p>邮箱: contact@example.com</p>
        <p>地址: 某某市某某区某某街道123号</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about {
  padding: 80px 20px 40px;
  max-width: 800px;
  margin: 0 auto;
}

.about-header {
  text-align: center;
  margin-bottom: 60px;
}

.subtitle {
  color: var(--text-light);
  margin-top: 10px;
}

.sections {
  display: grid;
  gap: 40px;
}

.section {
  background: white;
  padding: 30px;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.section h2 {
  color: var(--primary-color);
  margin-bottom: 15px;
}

.contact {
  margin-top: 60px;
  text-align: center;
}

.contact-info {
  margin-top: 20px;
  color: var(--text-light);
}
</style> 