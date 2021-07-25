$(function () {
    //调用getUserInfo
    getUserInfo();

    $('#btnLogout').click(function () {
        //提示用户是否确认退出
        var layer = layui.layer
        layer.confirm('确认退出登录?', { icon: 3, title: '提示' },
            function (index) {
                //do something
                //清空token
                localStorage.removeItem('token');
                //页面跳转
                location.href = 'login.html';
                //关闭询问
                layer.close(index);
            })
    })
})
//获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //headers就是请求头需要权限
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        data: {

        },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            //调用renderAvatar渲染用户头像
            renderAvatar(res.data);
        },
        //不论成功失败都会调用
        // complete: function (res) {
        //     //在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         //清空token
        //         localStorage.removeItem('token');
        //         location.href = 'login.html';
        //     }
        // }
    })
}
function renderAvatar(user) {
    //获取用户名称
    var name = user.nickname || user.username;
    //渲染欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    //按需渲染用户头像
    if (user.user_pic !== null) {//渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        //渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}