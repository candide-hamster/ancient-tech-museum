interface ExhibitRecord {
  id: string
  visitTime: number
  favorite: boolean
  lastPosition?: {
    x: number
    y: number
    z: number
  }
}

class StorageManager {
  private readonly STORAGE_KEY = 'exhibit_records'
  private readonly PREFS_KEY = 'user_preferences'
  private db: IDBDatabase | null = null
  
  constructor() {
    this.initIndexedDB()
  }
  
  private async initIndexedDB() {
    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.open('ExhibitDB', 1)
      
      request.onerror = () => reject(request.error)
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains('exhibits')) {
          db.createObjectStore('exhibits', { keyPath: 'id' })
        }
      }
      
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }
    })
  }
  
  public async saveExhibitRecord(record: ExhibitRecord) {
    if (!this.db) await this.initIndexedDB()
    
    return new Promise<void>((resolve, reject) => {
      const transaction = this.db!.transaction(['exhibits'], 'readwrite')
      const store = transaction.objectStore('exhibits')
      const request = store.put(record)
      
      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }
  
  public savePreferences(prefs: object) {
    try {
      localStorage.setItem(this.PREFS_KEY, JSON.stringify(prefs))
    } catch (error) {
      console.error('保存偏好设置失败:', error)
    }
  }
  
  public getPreferences(): object {
    try {
      const prefs = localStorage.getItem(this.PREFS_KEY)
      return prefs ? JSON.parse(prefs) : {}
    } catch {
      return {}
    }
  }
  
  public async cleanupOldRecords() {
    if (!this.db) return
    
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000)
    
    const transaction = this.db.transaction(['exhibits'], 'readwrite')
    const store = transaction.objectStore('exhibits')
    const request = store.openCursor()
    
    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest).result
      if (cursor) {
        if (cursor.value.visitTime < thirtyDaysAgo) {
          cursor.delete()
        }
        cursor.continue()
      }
    }
  }
  
  public async getFavoriteRecords(): Promise<ExhibitRecord[]> {
    if (!this.db) await this.initIndexedDB()
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['exhibits'], 'readonly')
      const store = transaction.objectStore('exhibits')
      const request = store.getAll()
      
      request.onsuccess = () => {
        const records = request.result as ExhibitRecord[]
        resolve(records.filter(record => record.favorite))
      }
      
      request.onerror = () => reject(request.error)
    })
  }
  
  public async getVisitHistory(): Promise<ExhibitRecord[]> {
    if (!this.db) await this.initIndexedDB()
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['exhibits'], 'readonly')
      const store = transaction.objectStore('exhibits')
      const request = store.getAll()
      
      request.onsuccess = () => {
        const records = request.result as ExhibitRecord[]
        resolve(records.sort((a, b) => b.visitTime - a.visitTime))
      }
      
      request.onerror = () => reject(request.error)
    })
  }
}

export const storageManager = new StorageManager() 