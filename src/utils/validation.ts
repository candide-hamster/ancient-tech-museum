export const validateExhibit = (exhibit: any): boolean => {
  const requiredFields = [
    'id',
    'name',
    'modelPath',
    'description',
    'thumbnail',
    'yearCreated',
    'creator',
    'details'
  ]

  return requiredFields.every(field => exhibit[field] !== undefined)
}

export const validateModelPath = (path: string): boolean => {
  return path.endsWith('.glb') || path.endsWith('.gltf')
} 