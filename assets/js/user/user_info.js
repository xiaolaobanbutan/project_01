$(function () {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function (value) {
            if (value.length > 6)
                return '昵称长度必须在6位以内'
        }
    })
    initUserInfo()
})
//初始化用户信息
function initUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0)
                return layer.msg('获取用户信息失败');
            // 调用form.val()快速赋值表单
            var form = layui.form;
            form.val('formUserInfo', res.data);
        }
    })
}
//重置表单的数据
$('#btnReset').click(function (e) {
    e.preventDefault();
    //重新获得信息
    initUserInfo();
})
//监听表单提交
$(".layui-form").submit(function (e) {
    e.preventDefault();
    $.ajax({
        method: 'POST',
        url: '/my/userinfo',
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0)
                return layer.msg('更新用户失败信息');
            layer.msg('更新用户信息成功！');
            //调用父页面中的方法，重新渲染用户的信息
            window.parent.getUserInfo();
        }
    })
})