;(function (){
    var baseUri = 'http://'+window.location.host+'/';       /* 全局变量请勿改动 */
    $('.login_form').validate({
            onkeyup: false,
            rules: {
                account: {
                    required: true,
                    isMobile: true,
                },
                password: {
                    required: true,
                    rangelength: [6, 16]
                },
            },
            messages: {
                account: {
                    required: '手机号不能为空',
                    isMobile: '请输入正确的手机号',
                },
                password: {
                    required: '密码不能为空',
                    minlength: '6-16位的字符'
                },
            },
            errorElement: "span",
            focusInvalid: true,
            submitHandler: function(form) {
               $.ajax({url : baseUri + 'm/auth/login',type:'post' ,data : $(form).serialize(), success:function(res) {
                    res = JSON.parse(res);
                    if(res.status == 1){
                        layer.msg(res.message, {
                            icon: 1,
                            time: 2000 
                        });
                        location.href = res.url ? res.url : '/m/index/index';
                    }else{
                        layer.msg(res.message, {
                            icon: 2,
                            time: 2000 
                        });
                    }
                }})
            }
    });
    $('#quick_form').validate({
        onkeyup: false,
        rules: {
            account: {
                required: true 
            },
            phone_code: {
                required: true,
                rangelength: [2, 6]
            }
        },
        messages: {
            account: {
                required: '请填写帐号'
            },
            phone_code: {
                required: '短信验证码必须',
                rangelength: '2-6个字符'
            }
        },
        errorElement: "span",
        focusInvalid: true,
        submitHandler: function(form) {
            $.ajax({url : baseUri + 'm/auth/qlogin',type:'post' ,data : $(form).serialize(), success:function(res) {
                    res = JSON.parse(res);
                    if(res.status == 1){
                        layer.msg(res.message, {
                            icon: 1,
                            time: 2000 
                        });
                        location.href ='/m/index/index';
                    }else{
                        layer.msg(res.message, {
                            icon: 2,
                            time: 2000 
                        });
                    }
            }})
        }
    });
    $('.register_form').validate({
            onkeyup: false,
            rules: {
                phone: {
                    required: true,
                    isMobile: true,
                },
                password: {
                    required: true,
                    rangelength: [6, 16]
                },
            },
            messages: {
                phone: {
                    required: '手机号不能为空',
                    isMobile: '请输入正确的手机号',
                },
                password: {
                    required: '密码不能为空',
                    minlength: '6-16位的字符'
                },
            },
            errorElement: "span",
            focusInvalid: true,
            submitHandler: function(form) {
               $.ajax({url:baseUri + '/m/auth/doregister',type:'post', data : $(form).serialize(), success:function(res) {
                    res = JSON.parse(res);
                    if(res.status == 1){
                        layer.msg(res.message, {
                            icon: 1,
                            time: 2000 
                        });
                        location.href = '/m/index/index';
                    }else{
                        layer.msg(res.message, {
                            icon: 2,
                            time: 2000 
                        });
                    }
                }})
            }
    });
    $('.forget').validate({
            onkeyup: false,
            rules: {
                phone: {
                    required: true,
                    isMobile: true,
                },
                code: {
                    required: true,
                    rangelength: [4, 4]
                },
            },
            messages: {
                phone: {
                    required: '',
                    isMobile: '请输入正确的手机号',
                },
                code: {
                    required: '验证码不能为空',
                    minlength: '4位的字符'
                },
            },
            errorElement: "p",
            focusInvalid: true,
            submitHandler: function(form) {
               $.ajax({url : baseUri + 'm/auth/check',type:'post' ,data : $(form).serialize(), success:function(res) {
                    res = JSON.parse(res);
                    if(res.status == '1'){
                        // layer.msg(res.message, {
                        //     icon: 1,
                        //     time: 2000 
                        // });
                        location.href = res.url ? res.url : '/m/auth/update?phone='+res.phone;
                    }else{
                        // layer.msg(res.message, {
                        //     icon: 2,
                        //     time: 2000 
                        // });
                    }
                }})
            }
    });
    $('.pupdate').validate({
            onkeyup: false,
            rules: {
                password: {
                    required: true,
                    rangelength: [6, 16]
                },
                repassword: {
                    required: true,
                    equalTo:"#npwd",
                    rangelength: [6, 16]
                },
            },
            messages: {
                password: {
                    required: '密码不能为空',
                    rangelength: '密码不能少于6位'
                },
                repassword: {
                    required: '密码不能为空',
                    equalTo: '两次密码输入不一致',
                    rangelength: '密码不能少于6位'
                },
            },
            errorElement: "span",
            focusInvalid: true,
            submitHandler: function(form) {
               $.ajax({url : baseUri + 'm/auth/update',type:'post' ,data : $(form).serialize(), success:function(res) {
                    res = JSON.parse(res);
                    if(res.status == 1){
                        layer.msg(res.message, {
                            icon: 1,
                            time: 2000 
                        });
                        location.href = res.url ? res.url : '/m/index/index';
                    }else{
                        layer.msg(res.message, {
                            icon: 2,
                            time: 2000 
                        });
                    }
                }})
            }
    });
    
    $(".message").click(function (){
        re = /^1\d{10}$/;
        var phone = $("input[name='phone']").val();
        var msg = $("input[name='msg']").val();
        if(!re.test(phone)){
            return false;
        }
        if(msg === 'msg'){
            var data = {'phone':phone,'mark':msg};
        }
        else{
            var data = {'phone':phone};
        }
         $.post(
            '/m/auth/sendMessage',
             data ,  
            function (res){
                if(res.status == '0') {
                    layer.msg(res.message , {
                        icon:5,
                        time:2000
                    });
                }else{
                            var i = 0;
                            var timer = setInterval(function (){
                            i++;
                            if(i <= 90){
                                    $('.send-message').attr("disabled","disabled");
                                    $('.send-message').removeClass('message');
                                    $('.send-message').css("background-color",'#ccc');
                                    $('.send-message').css("border-color",'#ccc');
                                    $('.send-message').text(90-i+'秒重新发送');
                             }else{
                                    $('.send-message').attr("disabled",false);
                                    $('.send-message').addClass('message');
                                    $('.send-message').css("background-color",'#a38a73');
                                    $('.send-message').text('发送验证码');
                                    clearInterval(timer);
                                  }
                             },1000);

                }
                    
                
        },'json');
       
    });
    
})()