const { defineConfig } = require('@vue/cli-service')
const serverUrl = 'http://localhost:8000'
//module.exports = defineConfig({
//  transpileDependencies: true
//})
module.exports = {
  devServer: {
    proxy: {
      '/user/valid': {
        target: serverUrl, // Adres backendu
        changeOrigin: true, // Zmień pochodzenie żądania na backend
        secure: false, // Nie weryfikuj certyfikatów SSL w środowisku developerskim
        pathRewrite: { '^/user/valid': '/user/valid' }, // Przepisywanie ścieżek (opcjonalne)
      },
      '/user/checksession': {
        target: serverUrl, // Adres backendu
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/user/checksession': '/user/checksession' },
      },
      '/anime/result': {
        target: serverUrl, // Adres backendu
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/anime/result': '/anime/result' },
      },
      '/anime/description': {
        target: serverUrl, // Adres backendu
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/anime/description': '/anime/description' },
      },
      '/anime/update': {
        target: serverUrl, // Adres backendu
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/anime/update': '/anime/update' },
      },
      '/user/logout': {
        target: serverUrl, // Adres backendu
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/user/logout': '/user/logout' },
      },
      '/anime/addimg': {
        target: serverUrl, // Adres backendu
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/anime/addimg': '/anime/addimg' },
      },
    },
  },
};