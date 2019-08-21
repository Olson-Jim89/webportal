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
            insert($table,json_decode($data));            
        break;
        case "update":
            update($table,json_decode($data));
        break;
        case "delete":
            delete($table,$data);
        break;  
        default:
        break;   
    }
}

$ConnFailed = false;
function connect()
{
    $servername = "localhost:3306";
    $username = "root";
    $password = "";

    try {
            $conn = new PDO("mysql:host=$servername;dbname=webportal", $username, $password);
        
            // set the PDO error mode to exception
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            //echo "Connected successfully";
        
            return $conn;

        }
    catch(PDOException $e)
        {
            global $ConnFailed;
            $ConnFailed = true;
            echo "Connection failed: " . $e->getMessage();
        }
}

function select($table,$statement){

    global $ConnFailed;

    $conn = connect(); 
    
    if (!$ConnFailed) {

        if($statement == "")
            $sql = "SELECT * FROM $table";
        else
            $sql = $statement;
       
        $select = $conn->prepare($sql);
        $select->execute();

        $result = $select->fetchAll(PDO::FETCH_ASSOC);

        $data = json_encode($result);

        //echo "{\"".$table."\":".$data."}";
        echo $data;
        return $data;
             
    } else {
        echo "Connection Failed";
    }
    
    $conn = null;

}


 
function insert($table,$data){
    session_start();
    $current_user = $_SESSION['current_user'];
    try {
        $conn = connect(); 

        $getCols = "SHOW COLUMNS FROM $table;";

        $colsAndVals = [];

        // output data of each row
        foreach ($conn->query($getCols) as $col) {
            if($col['Extra'] != 'auto_increment')
                $colsAndVals[$col['Field']] = "";
        }

        if(isset($colsAndVals['created_by']))
            $colsAndVals['created_by'] = strval($current_user);

        if(isset($colsAndVals['last_updated_by']))
            $colsAndVals['last_updated_by'] = strval($current_user);

        if(isset($colsAndVals['created_date']))
            $colsAndVals['created_date'] = "now()"; 

        if(isset($colsAndVals['last_updated']))
            $colsAndVals['last_updated'] = "now()";

        if(isset($colsAndVals['useraccount_id']))
            $colsAndVals['useraccount_id'] = strval($current_user);

            //var_dump($data);

        foreach ($data as $col => $value) {
            if($col != $table."_id")
                $colsAndVals[$col] = "'" . $value . "'";
        }

        //var_dump($colsAndVals);
        
        $columns = "";
        $values = "";
        foreach($colsAndVals as $column => $value){
           // echo $column. ": " . $value;
            $columns .= $column . ", ";
            $values .= $value . ", ";
        }

        //$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        //var_dump($data);

        $columnsClean = rtrim($columns,", ");
        $valuesClean = rtrim($values,", ");
       
        $sql = "INSERT INTO $table ($columnsClean) VALUES ($valuesClean);";

        $conn->exec($sql);      
        //echo "New record created successfully";          
        select($table,"SELECT * FROM $table WHERE useraccount_id = $current_user;");

        //var_dump($returnData);
    }
    catch(PDOException $e)
    {
        echo $sql . "<br>" . $e->getMessage();
    }
    
    $conn = null;

}

function update($table,$data){
    session_start();
    $current_user = $_SESSION['current_user'];
    //var_dump($data);
    $dataArray = (array) $data;
    $id = $dataArray[$table."_id"];
    try {
        $conn = connect(); 

        $colsAndVals = [];

        foreach ($data as $col => $value) {
            if($col != $table."_id")
                $colsAndVals[$col] = "'" . $value . "'";
        }


        if(isset($colsAndVals['last_updated_by']))
            $colsAndVals['last_updated_by'] = strval($current_user);

        if(isset($colsAndVals['last_updated']))
            $colsAndVals['last_updated'] = "now()";

            //var_dump($data);

        foreach ($data as $col => $value) {
            if($col != $table."_id")
                $colsAndVals[$col] = "'" . $value . "'";
        }

        //var_dump($colsAndVals);
        
        $updateValues= "";
        foreach($colsAndVals as $column => $value){
            $updateValues .= $column . "=" . $value . ", ";
        }

        //$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        //var_dump($data);

        $updateValuesClean = rtrim($updateValues,", ");
    
       
        $sql = "UPDATE $table SET $updateValuesClean WHERE ".$table."_id = $id;";

        $conn->exec($sql);      
        //echo "New record created successfully";              
        select($table,"SELECT * FROM $table WHERE useraccount_id = $current_user;");

        //var_dump($returnData);
    }
    catch(PDOException $e)
    {
        echo $sql . "<br>" . $e->getMessage();
    }
    
    $conn = null;

}

function delete($table,$data){
    session_start();
    $current_user = $_SESSION['current_user'];
    try {
        $conn = connect(); 

              
        $sql = "DELETE FROM $table WHERE ".$table."_id = $data";

        $conn->exec($sql);      
        //echo "New record created successfully";              
        select($table,"SELECT * FROM $table WHERE useraccount_id = $current_user;");
    }
    catch(PDOException $e)
    {
        echo $sql . "<br>" . $e->getMessage();
    }
    
    $conn = null;

}

?>