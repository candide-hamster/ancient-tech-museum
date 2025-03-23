<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const props = defineProps<{
  modelPath: string
  description: string
}>()

const canvas = ref<HTMLCanvasElement | null>(null)
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let controls: OrbitControls
let model: THREE.Group | null = null

const initScene = () => {
  if (!canvas.value) return
  
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  
  renderer = new THREE.WebGLRenderer({ canvas: canvas.value, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  
  // 添加环境光和平行光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  scene.add(ambientLight, directionalLight)
  
  // 设置相机位置
  camera.position.z = 5
  
  // 添加轨道控制
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  
  animate()
}

const loadModel = async (path: string) => {
  const loader = new GLTFLoader()
  try {
    const gltf = await loader.loadAsync(path)
    if (model) scene.remove(model)
    model = gltf.scene
    scene.add(model)
    
    // 自动调整相机位置以适应模型
    const box = new THREE.Box3().setFromObject(model)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    
    const maxDim = Math.max(size.x, size.y, size.z)
    const fov = camera.fov * (Math.PI / 180)
    let cameraZ = Math.abs(maxDim / Math.sin(fov / 2))
    
    camera.position.z = cameraZ * 1.5
    camera.updateProjectionMatrix()
    
    // 将模型居中
    model.position.sub(center)
  } catch (error) {
    console.error('模型加载失败:', error)
  }
}

const animate = () => {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}

// 监听窗口大小变化
const handleResize = () => {
  if (!canvas.value) return
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

watch(() => props.modelPath, (newPath) => {
  if (newPath) loadModel(newPath)
})

onMounted(() => {
  initScene()
  window.addEventListener('resize', handleResize)
  if (props.modelPath) loadModel(props.modelPath)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="exhibit-container">
    <canvas ref="canvas"></canvas>
    <div class="controls">
      <div class="description">{{ description }}</div>
      <div class="buttons">
        <button @click="controls.reset()">重置视角</button>
        <button @click="$emit('enterAR')">进入AR模式</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.exhibit-container {
  position: relative;
  width: 100%;
  height: 100vh;
}

.controls {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  padding: 15px;
  border-radius: 8px;
  color: white;
}

.buttons {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

button {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  background: #4CAF50;
  color: white;
  cursor: pointer;
}

button:hover {
  background: #45a049;
}
</style> 