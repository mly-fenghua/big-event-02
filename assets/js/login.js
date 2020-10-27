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
        //自定义校验规则
    var form = layui.form
    form.verify({
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            repwd: function(value) {
                var pwd = $('.reg-box [name=password]').val()
                if (value !== pwd) {
                    return '两次密码不一致，请重新输入'
                }
            }
        })
        // 监听表单注册事件
    $('#form-reg').on('submit', function(e) {
            e.preventDefault();
            $.ajax({
                type: "POST",
                url: "/api/reguser",
                data: {
                    username: $('#form-reg [name=username]').val(),
                    password: $('#form-reg [name=password]').val(),
                },
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg("注册成功，请登录")

                    // 清空内容
                    $('#form-reg')[0].reset()
                        // 跳转登录页面
                    $('#link-login').click()
                }

            })
        })
        // 监听登录事件
    $('#form-login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登陆成功!')
                    // 本地存储数据
                localStorage.setItem('token', res.token)
                location.href = "/index.html"

                // 清空内容
                $('#form-login')[0].reset()
            }

        })
    })



})