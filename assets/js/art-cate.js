$(function() {
    var layer = layui.layer
    var form = layui.form
        //1.获取文章分类列表
    initArtCateList()

    function initArtCateList() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    //2. 添加分类事件
    $('#btnAddCate').on('click', function() {
            indexAdd = layer.open({
                type: 1,
                area: ['500px', '250px'],
                title: '添加文章分类',
                content: $('#dialog-add').html()
            });

        })
        //3. 添加文章分类
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
        // 4.修改文章分类，编辑按钮
    var indexEdit = null
    $('body').on('click', '.btn-edit', function(e) {
            indexEdit = layer.open({
                type: 1,
                area: ['500px', '250px'],
                title: '编辑文章分类',
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
        // 5.修改表单分类事件
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
        //6. 删除按钮
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