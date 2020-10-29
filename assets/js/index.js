// 入口函数
$(function() {
    getUserInfo()
    $('#btnLogout').on('click', function(e) {
        layer.confirm('确定退出吗?', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 清除本地
            localStorage.removeItem('token')
                // 跳转登录
            location.href = '/login.html'
                // 关闭询问框
            layer.close(index);
        });

    })


})

function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data);
        }

    })
}

function renderAvatar(user) {
    var name = user.nickname || user.username;
    $('.welcome').html("欢迎&nbsp&nbsp" + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').show().attr('src', user.user_pic)
        $('.text-avatar').hide()

    } else {
        $('.layui-nav-img').hide()
        var text = name[0].toUpperCase()
        $('.text-avatar').show().html(text)
    }
}