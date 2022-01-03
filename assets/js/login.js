$(function () {
    // 点击注册账号的链接
    $('#link-reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link-login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })
    // 自定义校验规则
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })
    // 监听注册表单提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！')
            // 模拟人的点击行为
            $('#link_login').click()
        })


    })
    // 监听表单的登录事件
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            // success: function (res) {
            //     if (res.status !== 0) {
            //         return layer.msg('登录失败')
            //     }
            //     layer.msg('登录成功')
            //     location.href = '/index.html'
            //     // console.log(res.token)

            // }
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                // localStorage.setItem('token', res.token)
                // 跳转到后台主页
                // location.href = '/index.html' 
                // console.log(res.token)
            }
        })
    })

}) 