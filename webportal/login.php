<!DOCTYPE html>
<html lang="en">
<head>
    <title>Login</title>
    
    <?php
        require 'parts/header.php';
    ?>
    <link rel="stylesheet" type="text/css" media="screen" href="css/login.css">
    <script src="js/login.js"></script>
</head>
<body>
<?php
    require 'ss/server.php';
    session_start();
    if (isset($_SESSION["token"])){
        header("Location:index.php");
        exit();
    }   
      ?>
    <h1>Web Portal - Login</h1>
    <h3>The best of the web.</h3>
    <br>
    <div class="code" style="background:white;">

    </div>
    <div id="logResponse">
    </div>
    <div id="loginWin" class="LoginWidget">
        <div id="login">
        <h2 style="text-align:center;">Login</h2>
       <hr> 
        <div style="padding-left:30px">
            <br>
                <label>Email:</label><input id="username" name="username" type="text" value="">
            <br>
            <br>
                <label>Pass:</label><input id="password" name="password" type="password" value="">
            <br>
            <br>
                <div class="RemmeberMe"><input style="width:30px; float:none;" id="remmeberMe" name="remmeberMe" type="checkbox" value="">Remember Me</div>
            <br>
        </div>
        <hr> 
        <div style="margin:auto; margin-top:20px; width:30%;">
            <button id="loginBtn">Login</button>
            <button id="toRegisterBtn">Register</button>
        </div>
        </div>
      <div id="register" class="RegisterWidget">
        <h2 style="text-align:center;">Register</h2>
       <hr> 
        <div style="padding-left:30px">
            <br>
                <label>Username(email):</label> <input id="usernameReg" name="usernameReg" type="text" value="">
            <br>
            <br>
                <label>Password:</label> <input id="passwordReg1" name="passwordReg" type="password" value="">
            <br>
            <br>
                <label>Confirm Password:</label> <input id="passwordReg2" name="passwordReg" type="password" value="">
            <br>
            <br>
        </div>
        <hr>
        <div style="margin:auto; margin-top:20px; width:30%;">
            <button id="registerBtn" >Register</button>
            <button id="toLoginBtn">back</button>
        </div>
    </div>
    </div>
    
</body>
</html>