/**
 * 用户相关的请求模块
 */
import request from "@/utils/request"

/**
 * 用户登录
 */
// 按需导出
export const login = data => {
    return request({
        method: 'POST',
        url: '/v1_0/authorizations',
        data
    })
}

export const sendCode = mobile => {
    return request({
        method: 'GET',
        // 模板字符串中可以解析变量。
        url: `/v1_0/sms/codes/${mobile}`
    })
}

/**
 * 获取用户自己的信息
 */
export const getUserInfo = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user'
            // 发送请求头数据
            // 注释掉是因为在request.js中使用拦截器统一封装了授权token
            // headers: {
            //   // 注意：该接口需要授权才能访问
            //   //       token的数据格式：Bearer token数据，注意 Bearer 后面有个空格
            //   Authorization: `Bearer ${store.state.user.token}`
            // }
    })
}

/**
 * 获取用户频道列表
 */
export const getUserChannels = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user/channels'
    })
}