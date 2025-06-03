const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
            },
        },
    },
    pages: {
        index: {
            entry: 'src/main.js',
            title: 'Cibo Gustoso',
        },
    },
})
