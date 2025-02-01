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
      '/user/preference': {
        target: serverUrl, // Adres backendu
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/user/preference': '/user/preference' },
      },
      '/anime/addimg': {
        target: serverUrl, // Adres backendu
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/anime/addimg': '/anime/addimg' },
      },
      '/anime/delimg': {
        target: serverUrl, // Adres backendu
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/anime/delimg': '/anime/delimg' },
      },
      '/anime/add': {
        target: serverUrl, // Adres backendu
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/anime/add': '/anime/add' },
      },
      '/anime/edit': {
        target: serverUrl, // Adres backendu
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/anime/edit': '/anime/edit' },
      },
      '/anime/getrecord': {
        target: serverUrl, // Adres backendu
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/anime/getrecord': '/anime/getrecord' },
      },
      '/anime/add-group': {
        target: serverUrl, // Adres backendu
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/anime/add-group': '/anime/add-group' },
      },
      '/anime/edit-group': {
        target: serverUrl, // Adres backendu
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/anime/edit-group': '/anime/edit-group' },
      },
      '/anime/get-group-list': {
        target: serverUrl, // Adres backendu
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/anime/get-group-list': '/anime/get-group-list' },
      },
      '/anime/delete': {
        target: serverUrl, // Adres backendu
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/anime/delete': '/anime/delete' },
      },
    },
  },
};