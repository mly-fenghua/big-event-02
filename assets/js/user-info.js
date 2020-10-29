$(function() {
    // 1.验证昵称
    var form = layui.form
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return "昵称长度不大于6位"
            }
        }
    })

    // 2.获取用户信息
    initUserInfo();

    function initUserInfo() {
        $.ajax({
            type: "GET",
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                form.val('formUserInfo', res.data)

            }
        })
    }
    // 3.重置按钮
    $('#btnReset').on('click', function(e) {
            // 阻止重置
            e.preventDefault();
            // form重新赋值
            if (confirm('是否重置？')) {
                initUserInfo();
            }
        })
        // 4.修改内容
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败!')
                }
                layer.msg('更新用户信息成功!')
                    // 更新头像
                window.parent.getUserInfo()
            }

        })
    })



})