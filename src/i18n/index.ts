import { createI18n } from 'vue-i18n'

const messages = {
  zh: {
    nav: {
      home: '首页',
      favorites: '收藏夹',
      about: '关于展馆'
    },
    exhibit: {
      loading: '加载中...',
      error: '加载失败',
      noFavorites: '暂无收藏'
    }
  },
  en: {
    nav: {
      home: 'Home',
      favorites: 'Favorites',
      about: 'About'
    },
    exhibit: {
      loading: 'Loading...',
      error: 'Failed to load',
      noFavorites: 'No favorites yet'
    }
  }
}

export const i18n = createI18n({
  legacy: false,
  locale: 'zh',
  fallbackLocale: 'en',
  messages
}) 