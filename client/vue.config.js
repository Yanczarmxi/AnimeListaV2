const { defineConfig } = require('@vue/cli-service')
//module.exports = defineConfig({
//  transpileDependencies: true
//})
module.exports = {
  devServer: {
    proxy: {
      '/user/valid': {
        target: 'http://localhost:8000', // Adres backendu
        changeOrigin: true, // Zmień pochodzenie żądania na backend
        secure: false, // Nie weryfikuj certyfikatów SSL w środowisku developerskim
        pathRewrite: { '^/user/valid': '/user/valid' }, // Przepisywanie ścieżek (opcjonalne)
      },
      '/user/checksession': {
        target: 'http://localhost:8000', // Adres backendu
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/user/checksession': '/user/checksession' },
      },
    },
  },
};