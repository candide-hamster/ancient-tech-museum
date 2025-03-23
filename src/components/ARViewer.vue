<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const props = defineProps<{
  modelPath: string
}>()

const canvas = ref<HTMLCanvasElement | null>(null)
let xrSession: XRSession | null = null
let xrRefSpace: XRReferenceSpace | null = null
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer

const initAR = async () => {
  if (!navigator.xr) {
    console.warn('WebXR不支持')
    return
  }
  
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera()
  
  renderer = new THREE.WebGLRenderer({
    canvas: canvas.value!,
    antialias: true,
    alpha: true
  })
  renderer.xr.enabled = true
  
  // 添加光源
  const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1)
  scene.add(light)
  
  // 加载模型
  const loader = new GLTFLoader()
  try {
    const gltf = await loader.loadAsync(props.modelPath)
    const model = gltf.scene
    // 缩放模型到合适大小
    model.scale.set(0.1, 0.1, 0.1)
    scene.add(model)
  } catch (error) {
    console.error('AR模型加载失败:', error)
  }
}

const startARSession = async () => {
  try {
    const session = await navigator.xr.requestSession('immersive-ar', {
      requiredFeatures: ['hit-test']
    })
    
    session.addEventListener('end', () => {
      xrSession = null
      xrRefSpace = null
    })
    
    await renderer.xr.setSession(session)
    xrSession = session
    xrRefSpace = await session.requestReferenceSpace('local')
    
    renderer.setAnimationLoop((timestamp, frame) => {
      if (!frame) return
      const pose = frame.getViewerPose(xrRefSpace!)
      if (pose) {
        renderer.render(scene, camera)
      }
    })
  } catch (error) {
    console.error('AR会话启动失败:', error)
  }
}

const endARSession = async () => {
  if (xrSession) {
    await xrSession.end()
  }
}

onMounted(() => {
  initAR()
})

onUnmounted(() => {
  endARSession()
})
</script>

<template>
  <div class="ar-container">
    <canvas ref="canvas"></canvas>
    <div class="ar-controls">
      <button @click="startARSession">开始AR体验</button>
      <button @click="endARSession">结束AR体验</button>
    </div>
  </div>
</template>

<style scoped>
.ar-container {
  position: relative;
  width: 100%;
  height: 100vh;
}

.ar-controls {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}

button {
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
  background: #2196F3;
  color: white;
  cursor: pointer;
}

button:hover {
  background: #1976D2;
}
</style> 