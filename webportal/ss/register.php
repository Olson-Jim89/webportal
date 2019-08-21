
<?php
require 'server.php';
var_dump($_POST);
if(isset($_POST['rusername']) && isset($_POST['rpassword'])){
    $username = $_POST['rusername'];
    $password = $_POST['rpassword'];
    $passwordHASH = md5($password);
    register($username,$passwordHASH);
    echo "reg";
}

$current_User;

function register($username, $password){
    $pattern = "/['\;=]/";
    echo "reg";
    if(!preg_match($pattern,$username) || !preg_match($pattern,$password)){
        try {
            $conn = connect(); 
            $sql = "INSERT INTO useraccount (username, password) VALUES ('$username','$password');";
            $conn->exec($sql);      
            echo 'Registration Successfull'; 
        }
        catch(PDOException $e)
        {
            echo $sql . "<br>" . $e->getMessage();
        }

    }else{
        echo "username and password must contains only numbers and letters.";
    }
}


?>