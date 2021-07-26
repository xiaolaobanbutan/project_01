$(function () {
    var layer = layui.layer;
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
    //绑定上传图片点击事件
    $('#btnChooseImage').click(function () {
        $('#file').click();
    })
    // 为文件选择绑定change事件
    $('#file').change(function (e) {
        var filelist = e.target.files;
        console.log(filelist);
        if (filelist.length === 0)
            return layer.msg('上传失败，请选择照片');
        layer.msg('上传成功');
        //用户拿到文件
        var file = e.target.files[0]
        //将文件转化为路径
        var newImgURL = URL.createObjectURL(file)
        //先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`：
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })
    //为确定按钮绑定点击事件
    $('#btnUpload').click(function (e) {
        // console.log(e);
        //要拿到用户裁减掉之后的头像
        var dataURL = $image
            // 创建一个 Canvas 画布
            .cropper('getCroppedCanvas', {
                width: 100,
                height: 100
            })
            // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
            .toDataURL('image/png')
        //调用接口将投向传到服务器
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0)
                    return layer.msg('更换头像失败！')
                layer.msg('更换头像成功！')
                window.parent.getUserInfo();
            }
        })
    })

})