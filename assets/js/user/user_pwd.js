$(function () {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function (value) {
            if (value.length > 6)
                return '昵称长度必须在6位以内'
        },
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (params) {
            var pwd = $('.layui-card-body [name=oldPwd]').val();
            if (pwd === params)
                return '新旧密码不能相同'
        },
        unsamePwd: function (params) {
            var pwd = $('.layui-card-body [name=newPwd]').val();
            if (pwd !== params)
                return '密码输入不一致'
        }
    })
    $('.layui-form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0)
                    return layer.msg('修改密码失败！');
                layer.msg('修改密码成功！');
                //重置表单
                // 即将jQuery元素转化为deom元素
                $('.layui-form')[0].reset();
            }
        })
    })
})