$(function () {
  //点击“去注册账号”的连接
  $('#link_register').click(function () {
    //console.log(123)
    $('.login-box').hide();
    $('.register-box').show();
  })

  //点击“去登陆”连接
  $('#link_login').click(function () {
    $('.login-box').show();
    $('.register-box').hide();
  })
  //从layui中获取form对象
  var form = layui.form
  //通过form.verify()函数定义的校验规则
  form.verify({
    //自定义了叫做pwd的校验规则
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    //校验两次密码一致
    repwd: function (value) {
      //通过形参拿到的是确认密码框的内容
      //还需要密码框中的内容
      //然后进行一次判断

      var pwd = $('.register-box [name=password]').val()//获取密码框中的值通过[]属性选择器

      if (pwd !== value) {
        return '两次密码不一致'
      }
    }
  })
  var layer = layui.layer
  //监听注册表单的提交事件
  $('#form_reg').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/reguser',
      data: {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val()
      },
      success: function (res) {
        if (res.status !== 0)
          return layer.msg(res.message);
        layer.msg('注册成功，请登录');
        // 模拟点击事件
        $('#link_login').click()
      }
    })
  })
  $('#form_login').submit(function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0)
          return layer.msg(res.message)
        layer.msg('登录成功！');
        //console.log(res.token);
        //将登录得到的token字符串，保存到localStorage中
        localStorage.setItem('token', res.token);
        //跳转到后台主页
        location.href = 'index.html'
      }
    })
  })
})