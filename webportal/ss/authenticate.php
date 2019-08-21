<?php
require 'server.php';
$username = cleanInputs($_POST['username']);
$password = cleanInputs($_POST['password']);
$passwordHASH = md5($password);

$current_User;

authenticate($username, $passwordHASH);

function authenticate($username, $password){
    
 
    try{
        $conn = connect(); 

            $sql = "SELECT useraccount_id, username, password FROM useraccount WHERE username = '$username'";

            foreach ($conn->query($sql) as $row){

                $usernamekey = $row["username"];
                $passwordkey = $row["password"];
               // echo $username . " " . $usernamekey;
               // echo $password . " " . $passwordkey;
            }
                
            if($username == $usernamekey && $password == $passwordkey){
                echo "Match";
                session_start();
                $_SESSION["token"] = md5($username . $password);
                $_SESSION['current_user'] = $row['useraccount_id'];
                
            }else{
                echo "username or password dose not match our records.";
            }

    }
    catch(PDOException $e){
        echo "Connection failed: " . $e->getMessage();
    }
}

function cleanInputs($input){
    $cleaninput1 = str_replace("'","",$input);
    $cleaninput2 = str_replace("\"","",$cleaninput1);
    $cleaninput3 = str_replace(";","",$cleaninput2);
    $cleaninput4 = str_replace("=","",$cleaninput3);

    return $cleaninput4;
}

?> 
    