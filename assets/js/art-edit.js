$(function() {


    // 找id
    // alert(location.search.split('=')[1])

    var layer = layui.layer
    var form = layui.form
    var id = location.search.split('=')[1];

    //初始化富文本


    initEdit()
    initEditor()
        // 表单渲染
    function initEdit() {
        // console.log(id)
        $.ajax({
            method: 'GET',
            url: '/my/article/' + id,
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('初始化文章分类失败！')
                }

                form.val('form-edit', res.data);
                // tinyMCE赋值
                // console.log(res.data.content);
                // console.log(tinyMCE.activeEditor.setContent());

                tinyMCE.activeEditor.setContent(res.data.content);

                if (!res.data.cover_img) {
                    return layer.msg('用户未上传头像')
                }
                var newImgURL = baesUrl + res.data.cover_img;
                $image
                    .cropper('destroy') // 销毁旧的裁剪区域
                    .attr('src', newImgURL) // 重新设置图片路径
                    .cropper(options) // 重新初始化裁剪区域
            }
        })
    }
    initCate()
        // 初始化富文本编辑器
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('初始化文章分类失败！')
                }
                // 调用模板引擎，渲染分类的下拉菜单
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                    // 一定要记得调用 form.render() 方法
                form.render()
                initEdit()
            }
        })
    }



    // 实现基本裁剪效果

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)


    // 为选择封面的按钮，绑定点击事件处理函数
    $('#btnChooseImage').on('click', function() {
        $('#coverFile').click()
    })

    // 监听 coverFile 的 change 事件，获取用户选择的文件列表
    $('#coverFile').on('change', function(e) {
            // 获取到文件的列表数组
            var files = e.target.files
                // 判断用户是否选择了文件
            if (files.length === 0) {
                return
            }
            // 根据文件，创建对应的 URL 地址
            var newImgURL = URL.createObjectURL(files[0])
                // 为裁剪区域重新设置图片
            $image
                .cropper('destroy') // 销毁旧的裁剪区域
                .attr('src', newImgURL) // 重新设置图片路径
                .cropper(options) // 重新初始化裁剪区域
        })
        // 为 存为草稿 按钮添加绑定事件
    var art_state = '已发布'
        // $('#btnSave1').on('click', function() {
        //     art_state = '已发布'
        // })
    $('#btnSave2').on('click', function() {
            art_state = '草稿'
        })
        // 为表单绑定 submit 提交事件
    $('#form-edit').on('submit', function(e) {
        // 1. 阻止表单的默认提交行为
        e.preventDefault()
            // 2. 基于 form 表单，快速创建一个 FormData 对象
        var fd = new FormData(this)
            // 3. 将文章的发布状态，存到 fd 中
        fd.append('state', art_state)
            // 4. 将封面裁剪过后的图片，输出为一个文件对象
        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5. 将文件对象，存储到 fd 中
                fd.append('cover_img', blob)
                    // 6. 发起 ajax 数据请求

                // console.log(...fd);
                // 6. 发起 ajax 数据请求
                publishArticle(fd)
            })
            // 发起Ajax请求实现修改文章的功能
        function publishArticle(fd) {
            // console.log(fd)
            $.ajax({
                method: 'POST',
                url: '/my/article/edit',
                data: fd,
                // 注意：如果向服务器提交的是 FormData 格式的数据，
                // 必须添加以下两个配置项
                contentType: false,
                processData: false,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('修改文章失败！')
                    }
                    layer.msg('修改文章成功！')
                        // 发布文章成功后，跳转到文章列表页面
                        // location.href = '/article/art-list.html'

                    setTimeout(function() {
                        window.parent.document.getElementById('art-list').click()
                    }, 2000)
                }
            })
        }
    })

})