// 这是路由器
import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入登录页面组件
import Login from '../views/login/LoginIndex'

// 注册引入的路由器
Vue.use(VueRouter)
    // 配置路由规则
const routes = [{
            path: "/login",
            name: "login",
            component: Login
        },
        {
            path: "/",
            // name: 'layout', // 如果父路由有默认子路由，那它的 name 没有意义
            component: () =>
                import ("@/views/layout/LayoutIndex"),
            children: [{
                    path: "", //默认子路由，只能有一个
                    name: "home",
                    component: () =>
                        import ("../views/home/HomeIndex")
                },
                {
                    path: "qa",
                    name: "qa",
                    component: () =>
                        import ("@/views/qa/QaIndex")
                },
                {
                    path: "video",
                    name: "video",
                    component: () =>
                        import ("@/views/video/VideoIndex")
                },
                {
                    path: "my",
                    name: "my",
                    component: () =>
                        // @是src文件的绝对路径
                        import ("@/views/my/MyIndex")
                }
            ]
        }
    ]
    // 由规则生成路由对象
const router = new VueRouter({
    routes
})

export default router