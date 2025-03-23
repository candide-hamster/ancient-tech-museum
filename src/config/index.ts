interface Config {
  apiBaseUrl: string
  assetsBaseUrl: string
  modelBaseUrl: string
}

const development: Config = {
  apiBaseUrl: 'http://localhost:3000',
  assetsBaseUrl: '/assets',
  modelBaseUrl: '/models'
}

const production: Config = {
  apiBaseUrl: 'https://api.example.com',
  assetsBaseUrl: 'https://cdn.example.com/assets',
  modelBaseUrl: 'https://cdn.example.com/models'
}

export const config = process.env.NODE_ENV === 'production' ? production : development 