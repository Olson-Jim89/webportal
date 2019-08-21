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
    <div id="toggleEdits" >Edit Mode: off</div>
</div>
    <?php 
        require 'ss/server.php';
        require 'parts/links.php'; 
    ?>
</body>
</html>