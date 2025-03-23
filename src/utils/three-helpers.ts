import * as THREE from 'three'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

export const setupLighting = (scene: THREE.Scene) => {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(5, 5, 5)
  scene.add(ambientLight, directionalLight)
}

export const centerAndScaleModel = (
  model: THREE.Object3D,
  camera: THREE.PerspectiveCamera
) => {
  const box = new THREE.Box3().setFromObject(model)
  const center = box.getCenter(new THREE.Vector3())
  const size = box.getSize(new THREE.Vector3())
  
  const maxDim = Math.max(size.x, size.y, size.z)
  const fov = camera.fov * (Math.PI / 180)
  let cameraZ = Math.abs(maxDim / Math.sin(fov / 2))
  
  camera.position.z = cameraZ * 1.5
  camera.updateProjectionMatrix()
  
  model.position.sub(center)
  
  return { center, size }
}

export const handleModelError = (error: any) => {
  console.error('模型加载错误:', error)
  throw new Error('模型加载失败')
} 