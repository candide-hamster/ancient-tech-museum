# 溯古·启智 - 中国古代物理科技互动展馆

## 项目简介

溯古·启智是一个基于Web3D技术的虚拟展馆，致力于展示中国古代物理科技成就。项目采用Vue 3 + TypeScript技术栈，结合Three.js实现3D模型展示，通过WebXR提供AR体验，让古代科技智慧在数字时代焕发新生。

## 技术特点

- **前端框架**: Vue 3 + TypeScript
- **3D渲染**: Three.js
- **AR体验**: WebXR API
- **状态管理**: Pinia
- **本地存储**: IndexedDB + LocalStorage
- **国际化**: Vue I18n
- **PWA支持**: 离线访问、自动更新
- **自动化部署**: GitHub Actions

## 展品列表

- **地动仪**
  - 创建年代: 公元132年
  - 发明者: 张衡
  - 特点: 世界上最早的地震仪器

- **候风铜鸟**
  - 创建年代: 公元前2世纪
  - 发明者: 马钧
  - 特点: 古代气象观测仪器

## 快速开始

### 环境要求

- Node.js >= 16
- npm >= 7
- 现代浏览器（支持WebGL和WebXR）

### 安装与运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 运行测试
npm test
```

## 项目结构

```
src/
├── assets/          # 静态资源
│   ├── images/      # 图片资源
│   ├── models/      # 3D模型文件
│   └── styles/      # 全局样式
├── components/      # 通用组件
├── views/           # 页面视图
├── stores/          # Pinia状态管理
├── utils/           # 工具函数
├── types/           # TypeScript类型
├── i18n/            # 国际化配置
└── router/          # 路由配置
```

## 核心功能

### 3D展示功能
- 高精度3D模型展示
- 模型旋转、缩放、平移
- 自动相机位置调整
- 光照效果优化

### AR体验
- 基于WebXR的AR功能
- 真实场景中的模型放置
- 模型尺寸调整
- 交互操作支持

### 本地存储
- 展品浏览历史记录
- 收藏夹功能
- 用户偏好设置
- 定期数据清理

### 性能优化
- 3D模型懒加载
- 资源预加载
- 代码分割
- PWA离线支持

## 开发指南

### 添加新展品

1. 准备3D模型文件
```bash
src/assets/models/[exhibit-id].glb
```

2. 添加展品信息
```json
{
  "id": "exhibit-id",
  "name": "展品名称",
  "description": "展品描述",
  "modelPath": "/models/exhibit-id.glb",
  "yearCreated": "创建年代",
  "creator": "发明者",
  "details": [
    "详细信息1",
    "详细信息2"
  ]
}
```

3. 添加展品缩略图
```bash
src/assets/images/[exhibit-id]-thumb.jpg
```

### 国际化支持

在语言文件中添加翻译：

```typescript
// src/i18n/index.ts
const messages = {
  zh: {
    exhibit: {
      newKey: '中文描述'
    }
  },
  en: {
    exhibit: {
      newKey: 'English Description'
    }
  }
}
```

## 部署流程

项目使用GitHub Actions自动部署：

1. 推送代码到main分支
2. 自动运行测试
3. 构建生产版本
4. 部署到GitHub Pages

## 错误处理

使用内置的错误追踪系统：

```typescript
import { ErrorTracker } from '@/utils/error-tracking'

try {
  // 业务代码
} catch (error) {
  ErrorTracker.track(error, '组件名称')
}
```

## 性能监控

使用性能监控工具：

```typescript
import { PerformanceMonitor } from '@/utils/performance'

const monitor = PerformanceMonitor.getInstance()
monitor.trackModelLoadTime('exhibit-id', startTime)
```

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交变更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建Pull Request

## 注意事项

- 3D模型文件需要使用glb或gltf格式
- AR功能需要支持WebXR的设备
- 建议使用Chrome或Firefox最新版本
- 首次加载可能需要较长时间

## 许可证

MIT License

## 联系方式

- 项目主页: [Project URL]
- 问题反馈: [Issues Page]
- 技术支持: [Support Email]

## 致谢

感谢以下开源项目的支持：

- Vue.js
- Three.js
- Pinia
- Vue Router
- Vue I18n 