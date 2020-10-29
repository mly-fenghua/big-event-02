// 开发环境地址
var baseUrl = 'http://ajax.frontend.itheima.net'
    // 测试环境地址
    // var baseUrl = 'http://ajax.frontend.itheima.net'
    // 运行环境地址
    // var baseUrl = 'http://ajax.frontend.itheima.net'
$.ajaxPrefilter(function(options) {
    // 拼接地址
    options.url = baseUrl + options.url
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || ''
        }
    }
    // 登录拦截
    options.complete = function(res) {
        // console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === "登录失败！") {
            localStorage.removeItem('token')
            location.href = "/login.html"
        }

    }
})