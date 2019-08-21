function login(username,password){

    if(username != "" && password != ""){
    $.post("ss/authenticate.php",
    {
        username:username,
        password:password
    },
    function(response,status){
        console.log("status: " + status); 
        console.log("response: " + response); 
        $(".code").html(response);
        setTimeout(function(){window.location.href = "index.php";}, 1000);
    });
    }else{
        $("#logResponse").html("Please Enter username or password");
    }
}

function register(username,password){
    alert(username + password);
    if(username != "" && password != ""){
    $.post("ss/register.php",
    {
        rusername:username,
        rpassword:password
    },
    function(response,status){
        console.log("status: " + status); 
        console.log("response: " + response);
        $("#logResponse").html(response);
    });
    }else{
        $("#logResponse").html("Please Enter username or password");
    }
}


$(document).ready(function(){

    
    $("#loginBtn").click(function(){
        let username = $('#username').val();
        let password = $('#password').val();
        login(username,password);
    });

    $("#registerToggleBtn").click(function(){
        $('#registerBox').toggle();
    });

    $("#registerBtn").on('click',function(){
        let username = $('#usernameReg').val();
        let password = $('#passwordReg1').val();
        let passwordv = $('#passwordReg2').val();
        
        if(password == passwordv){
            register(username,password);
        }else{
            $("#logResponse").html("Passwords do not match.");
        }

        
    });

    var isRegWin = false;
    $("#toRegisterBtn").on('click',function(){
        if (isRegWin == false){
            $("#loginWin").css("animation-name","spinOut");
            $("#login").css("display","none");
            $("#register").css("display","block");
            $("#loginWin").css("animation-name","spinIn");
            isRegWin = true;
        }
    });

    $("#toLoginBtn").on('click',function(){
        
        if (isRegWin == true){
            $("#loginWin").css("animation-name","spinOut");
            $("#register").css("display","none");
            $("#login").css("display","block");
            $("#loginWin").css("animation-name","spinIn");
            isRegWin = false;
        }
    });

});