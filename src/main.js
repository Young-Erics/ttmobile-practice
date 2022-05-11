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

// 引入地图
import VueAMap from 'vue-amap';
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
        //申请地址 https://lbs.amap.com/ 选择web端jsAPI
        key: '9f1f02036f41128724854b3dfbb2e1cf',
        // 插件集合，用到什么插件就使用什么插件
        plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
        v: '1.4.4', // 高德sdk版本，最新的sdk已经出到了2.0
        //官网解释：JSAPI 2.0 提供的开发接口与 1.4 版本达到 99%的兼容度，但是为了保证插件的稳定性我们还是选择1.4.4。
    })
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