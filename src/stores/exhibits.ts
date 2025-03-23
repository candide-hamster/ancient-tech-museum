import { defineStore } from 'pinia'

interface Exhibit {
  id: string
  name: string
  brief: string
  description: string
  modelPath: string
  dynasty: string
  inventor: string
}

export const useExhibitsStore = defineStore('exhibits', {
  state: () => ({
    exhibits: [] as Exhibit[],
    loading: false,
    error: null as string | null,
  }),
  
  actions: {
    async fetchExhibits() {
      this.loading = true
      try {
        // 这里将来会从API获取数据
        this.exhibits = [
          {
            id: 'sundial',
            name: '日晷',
            brief: '中国古代测量时间的重要发明',
            description: '日晷是利用太阳投影的变化测定时刻的仪器，是中国古代重要的天文计时器具。',
            modelPath: '/models/sundial.gltf',
            dynasty: '周朝',
            inventor: '未知'
          },
          // 其他展品数据...
        ]
      } catch (error) {
        this.error = '获取展品数据失败'
      } finally {
        this.loading = false
      }
    }
  }
}) 