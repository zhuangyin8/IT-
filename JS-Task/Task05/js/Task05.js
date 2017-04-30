//匹配字母，数字，长度为5-16
var regUsername = /^([A-Za-z0-9]){5,16}$/;
//匹配字母，数字，非空格的所有字符，长度为6-16
var regPassword = /^([A-Za-z0-9\S]){6,16}$/;
//申明两个全局变量
var userName;
var passWord;
$('#name').mouseleave(function () {
    userName = $('#name').val();
    if (regUsername.test(userName)) {
        $('.remind').eq(0).css('visibility', 'hidden');
    } else {
         $('.remind').eq(0).css('visibility', 'visible');
    }
})
;
$('#pwd').mouseleave(function () {
    passWord = $("#pwd").val();
    if (regPassword.test(passWord)) {
        $('.remind').eq(1).css('visibility', 'hidden');
    } else {
         $('.remind').eq(1).css('visibility', 'visible');
    }
})
;

$("button").click(function () {
    $.post("/carrots-admin-ajax/a/login",
        {
            name: userName,
            pwd: passWord
        },
        function (data) {
            var obj = JSON.parse(data);
            console.log('obj的值', obj);
            if (obj.message == 'success') {
                location.href = 'https://zhuangyin8.github.io/';
            } else {
                $('.warning').text(obj.message);
                $('.warning').css('visibility', 'visible');
            }
        });
});



