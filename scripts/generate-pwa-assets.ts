import { writeFile } from 'fs/promises'
import { resolve } from 'path'

async function generatePlaceholderIcon(size: number, filename: string) {
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#2196F3"/>
      <text x="50%" y="50%" font-family="Arial" font-size="${size/4}px" 
            fill="white" text-anchor="middle" dy=".3em">溯古</text>
    </svg>
  `
  
  await writeFile(resolve(__dirname, '../public', filename), svg)
}

async function main() {
  await generatePlaceholderIcon(192, 'pwa-192x192.svg')
  await generatePlaceholderIcon(512, 'pwa-512x512.svg')
}

main().catch(console.error) 