import { defineStore } from 'pinia'
import { storageManager } from '../utils/storage'

interface Exhibit {
  id: string
  name: string
  modelPath: string
  description: string
  yearCreated: string
  creator: string
  details: string[]
  favorite: boolean
}

export const useExhibitStore = defineStore('exhibit', {
  state: () => ({
    exhibits: [] as Exhibit[],
    currentExhibit: null as Exhibit | null,
    loading: false,
    error: null as string | null
  }),
  
  actions: {
    async loadExhibits() {
      this.loading = true
      try {
        // 这里可以从本地JSON加载数据
        const response = await import('../assets/data/exhibits.json')
        this.exhibits = response.default
      } catch (err) {
        this.error = '加载展品失败'
      } finally {
        this.loading = false
      }
    },
    
    setCurrentExhibit(exhibit: Exhibit) {
      this.currentExhibit = exhibit
    },
    
    async loadExhibitDetail(id: string) {
      this.loading = true
      try {
        // 如果已经加载了展品列表,从中查找
        if (this.exhibits.length > 0) {
          this.currentExhibit = this.exhibits.find(e => e.id === id) || null
          if (this.currentExhibit) return
        }
        
        // 否则单独加载该展品数据
        const response = await import(`../assets/data/exhibits/${id}.json`)
        this.currentExhibit = response.default
      } catch (err) {
        this.error = '加载展品详情失败'
        this.currentExhibit = null
      } finally {
        this.loading = false
      }
    },
    
    async toggleFavorite(id: string) {
      const exhibit = this.exhibits.find(e => e.id === id)
      if (!exhibit) return
      
      try {
        await storageManager.saveExhibitRecord({
          id,
          visitTime: Date.now(),
          favorite: !exhibit.favorite
        })
        exhibit.favorite = !exhibit.favorite
      } catch (err) {
        console.error('收藏操作失败:', err)
      }
    }
  }
}) 