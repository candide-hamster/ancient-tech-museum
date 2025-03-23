<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue'

const error = ref<Error | null>(null)

onErrorCaptured((err: Error) => {
  error.value = err
  return false
})

const reload = () => {
  error.value = null
  window.location.reload()
}
</script>

<template>
  <div v-if="error" class="error-boundary">
    <h2>抱歉，出现了一些问题</h2>
    <p>{{ error.message }}</p>
    <button class="btn" @click="reload">
      重新加载
    </button>
  </div>
  <slot v-else></slot>
</template>

<style scoped>
.error-boundary {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 20px;
  text-align: center;
}

.error-boundary h2 {
  color: #f44336;
  margin-bottom: 15px;
}

.error-boundary p {
  color: var(--text-light);
  margin-bottom: 20px;
}
</style> 