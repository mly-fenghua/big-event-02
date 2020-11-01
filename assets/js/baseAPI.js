// 开发环境地址
var baesUrl = "http://ajax.frontend.itheima.net"
    // 测试环境地址
    // var baesUrl = "http://ajax.frontend.itheima.net"
    // 生产环境地址
    // var baesUrl = "http://ajax.frontend.itheima.net"



// $.ajaxPrefilter()绑定在ajax之前,并在ajax请求之后触发，最后ajax才真正发送。
$.ajaxPrefilter(function(options) {
    // console.log(options.url);
    options.url = baesUrl + options.url


    // 统一带my添加请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || ''
        }
    }
    // 登录拦截
    options.complete = function(res) {

        // console.log(res);
        // console.log(res.responseJSON);


        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            localStorage.removeItem("token");
            location.href = "/login.html"
        }
    }


})