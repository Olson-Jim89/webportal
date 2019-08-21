<?php
/****************************************************************************
| CHECK FOR POST DATA
|****************************************************************************
|   Summarry: checks to see if the user POST or request data from the database
|
|  To do:   *Phase out select specific
            *Phase out select other
******************************************************************************/ 
if (isset($_POST["table"]) && isset($_POST["action"]) && isset($_POST["data"])){
    $table = $_POST["table"];
    $action = $_POST["action"];
    $data = $_POST["data"];

    switch ($action){
        case "select":
            select($table,$data);
        break;
        case "insert":
    //        insert($table,$data);            
        break;
        case "update":
    //        update($table,$data);
        break;
        case "delete":
    //        delete($table,$data);
        break;  
        default:
        break;   
    }
}
?>