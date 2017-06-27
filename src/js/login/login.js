(function() {
    //点击登录请求数据
    $(".login-inner form").on("submit", function() {
        //获取表单数据
        var formData = $(this).serialize();

        //调用jquery的ajax方法
        $.ajax({
            url: "http://127.0.0.1:9090/api/login?" + formData,
            type: 'get',
            success: function(res) {
                if (res == "true") {
                    //返回数据正确，进入主页
                    location.href = "index.html"
                } else {
                    alert("登录失败，请重新输入")
                }
            }
        })
        return false;
    })
    $(".register")
        .on("click", function() {
            $("#login-modal").modal();

        });
    $("#login-modal")
        .on("blur", ".userName", function() {
            var regData = $(this).val();
            if (regData.length < 5) {
                $("#login-modal").find(".reminder-less").css("display", "block");

            } else {
                $.ajax({
                    url: "http://127.0.0.1:9090/api/hasregist?account=" + regData,
                    type: "get",
                    success: function(res) {
                        console.log(res);

                        if (res == "true") {
                            $("#login-modal").find(".reminder-reg").css("display", "block")
                        } else {
                            $("#login-modal").find(".reminder-success").css("display", "block");
                        }
                    }
                })
            }


        })
    $(".userName").on("focus", function() {
        $("#login-modal").find(".reminder-reg").css("display", "none")
        $("#login-modal").find(".reminder-less").css("display", "none")
        $("#login-modal").find(".reminder-success").css("display", "none")
        $(this).val("")
    })
    $("#login-modal form").on("submit", function() {
        var personData = $(this).serialize();
        $.ajax({
            url: "http://127.0.0.1:9090/api/regist?" + personData,
            type: "get",
            success: function(res) {
                if (res == "false") {
                    alert("注册失败，请重新输入")
                } else {
                    $("#login-modal").modal("hide");
                }

            }
        })

        return false;
    })
})()