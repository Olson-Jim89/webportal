<!DOCTYPE html>
<html>
<head>
<title>Web Portal</title>
<?php
    require 'parts/header.php';
?>
</head>
<body>
<div class="title">
    <h1>Web Portal</h1>
    <h3>The Best of the Web.</h3>
    <!--<div id="toggleEditsBtn" >Edit Mode: off</div>-->
    <a href="ss/logout.php" class="w3-button">Logout</a>
</div>
    <?php 
        session_start();
        if (!isset($_SESSION["token"])){
            header("Location:login.php");
            exit();
        }
          
        require 'ss/server.php';
        require 'parts/links.php'; 
    ?>
</body>
</html>