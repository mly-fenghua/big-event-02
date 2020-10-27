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
})