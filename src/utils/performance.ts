export class PerformanceMonitor {
  private static instance: PerformanceMonitor

  private constructor() {
    this.initObserver()
  }

  static getInstance() {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  private initObserver() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.reportMetric(entry)
        }
      })

      observer.observe({ entryTypes: ['largest-contentful-paint', 'fid', 'cls'] })
    }
  }

  private reportMetric(entry: PerformanceEntry) {
    // 这里可以发送到分析服务
    console.log(`Performance metric: ${entry.entryType}`, entry)
  }

  public trackModelLoadTime(modelId: string, startTime: number) {
    const loadTime = performance.now() - startTime
    console.log(`Model ${modelId} load time: ${loadTime}ms`)
  }
} 