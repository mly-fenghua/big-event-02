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
            url: "http://ajax.frontend.itheima.net/api/reguser",
            data: {
                username: $('#form-reg [name=username]').val(),
                password: $('#form-reg [name=password]').val(),
            },
            success: function(res) {
                if (res.status !== 0) {
                    return alert(res.message)
                }
                alert(res.message)
            }

        })
    })



})