import Vue from 'vue'
import App from './App.vue'
// 引入vuex容器
import store from './store'
// 加载 Vant 核心组件库
import Vant from 'vant'

// 加载 Vant 全局样式
import 'vant/lib/index.css'

// 加载全局样式
import './styles/index.less'

// 加载动态设置 REM 基准值
import 'amfe-flexible'

// 加载所有的路由
import router from './router'
window._AMapSecurityConfig = {
        securityJsCode: '52284b7ddb0603575ece27ae05a08378' // 输入你的jscode
    }
    // 阻止启动生产消息
Vue.config.productionTip = false

// 注册使用 Vant 组件库
Vue.use(Vant)
new Vue({
    // 路由对象注入到vue实例中, this可以访问$route和$router
    router,
    // 将创建的 store 提供给 Vue 实例，访问this.$store
    store,
    render: h => h(App),
}).$mount('#app')