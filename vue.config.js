const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        // 设置主机地址
        host: 'localhost',
        // 设置端口
        port: '8090',
        // 运行自动打开浏览器网页
        open: true
    }

})