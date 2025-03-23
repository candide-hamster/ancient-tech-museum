interface ErrorReport {
  message: string
  stack?: string
  componentName?: string
  timestamp: number
}

export class ErrorTracker {
  private static readonly MAX_REPORTS = 10
  private static reports: ErrorReport[] = []

  static track(error: Error, componentName?: string) {
    const report: ErrorReport = {
      message: error.message,
      stack: error.stack,
      componentName,
      timestamp: Date.now()
    }

    this.reports.push(report)
    if (this.reports.length > this.MAX_REPORTS) {
      this.sendReports()
    }
  }

  private static async sendReports() {
    if (this.reports.length === 0) return

    try {
      // 这里可以发送到错误追踪服务
      console.log('Sending error reports:', this.reports)
      this.reports = []
    } catch (error) {
      console.error('Failed to send error reports:', error)
    }
  }
} 