$(function() {
    // 点击注册账号，隐藏登录，显示注册
    $('#link-reg').on('click', function() {
            $('.login-box').hide()
            $('.reg-box').show()
        })
        // 点击登录，隐藏注册，显示登录
    $('#link-login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })
})