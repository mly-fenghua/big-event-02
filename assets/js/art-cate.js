$(function() {
    var layer = layui.layer
    initArtCateList()

    function initArtCateList() {
        $.ajax({
            url: '/my/article/cates',
            method: 'GET',
            success: function(res) {
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    // 添加分类事件
    $('#btnAddCate').on('click', function() {
            indexAdd = layer.open({
                type: 1,
                area: ['500px', '250px'],
                title: '添加文章分类',
                content: $('#dialog-add').html()
            });
        })
        // 添加文章分类
    var indexAdd = null
    $('body').on('submit', '#form-add', function(e) {

            e.preventDefault();
            $.ajax({
                method: "POST",
                url: '/my/article/addcates',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('新增分类失败!')
                    }
                    // 刷新页面
                    initArtCateList()
                    layer.msg('新增分类成功!')
                    layer.close(indexAdd)
                }

            })
        })
        // 修改文章分类
    var form = layui.form
        // 绑定btn-edit事件
    var indexEdit = null
    $('body').on('click', '.btn-edit', function() {

            indexEdit = layer.open({
                type: 1,
                area: ['500px', '250px'],
                title: '修改文章分类',
                content: $('#dialog-edit').html()
            });
            // 显示完毕修改form， 在获取Id对应文章分类信息
            var id = $(this).attr("data-id")
            $.ajax({
                url: '/my/article/cates/' + id,
                success: function(res) {
                    // console.log(res);
                    form.val("form-edit", res.data)
                }
            })
        })
        // 修改表单分类事件
        // 添加文章分类
    var indexEdit = null
    $('body').on('submit', '#form-edit', function(e) {

        e.preventDefault();
        $.ajax({
            method: "POST",
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类失败!')
                }
                // 刷新页面
                initArtCateList()
                layer.msg('更新分类成功!')
                layer.close(indexEdit)
            }

        })
    })

    // 删除按钮
    $('body').on('click', '.btn-delete', function() {
        var Id = $(this).attr("data-id")
        layer.confirm('确定删除吗?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + Id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败！')
                    }
                    layer.msg('删除成功！')
                    initArtCateList()
                    layer.close(index);
                }
            })

        });
    })

})