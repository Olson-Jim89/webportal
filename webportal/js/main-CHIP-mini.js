function select(table,statement,responseArea){
    console.log("table: " + table + ", statement: " + statement + ", responseArea: " + responseArea);
    callCrudAjax(table,statement,"select",responseArea);
}

function dump(obj) {
    var out = '';
    for (var i in obj) {
    out += i + ": " + obj[i] + "\n";
    }
   alert(out);
   }

function insert(button){
       let table = $(button).prev(".values").attr("table");
       let columns = "";
       let formData = $(button).prev("form").serializeArray();
       let data = {};
       let responseArea = $(button).prev(".values").attr("responseArea"); 

       for(var i = 0; i < formData.length; i++){
          data[formData[i].name] = formData[i].value;
          console.log("Data: " + data[formData[i].name]); 
       }

       dump(data);

       console.log("insertData: " + table +", "+ data['categoryName'] +", "+responseArea);

       callCrudAjax(table,JSON.stringify(data),"insert",responseArea);
}



function assignEvents(){
    
    $("button.toggle").off().on("click", function(){
        //alert($(this).prev(".edits").css("display"));
        $(this).prev(".edits").toggle()
        /*
        if($(this).prev(".edit").css("display") == "none")
            $(this).prev(".edit").css("display","inline-block");
        else if ($(this).prev(".edit").css("display") == "inline-block")
            $(this).prev(".edit").css("display","none");*/            
            
    });
    
    $(".insertBtn").off().on("click", function(){
       insert(this);
    });
    $(".updateBtn").on("click", function(){
        
    });
    $(".deleteBtn").on("click", function(){
        
    });
}

function categoryTemplete(json){

    console.log("ran");

    let templete = "";
    let columns = "";
    let values = "";

    for (x in json) {
        console.log("templete: "+templete);
        templete += '<div id="category" class="category">\
                        <h3>' + json[x].categoryName + '</h3>\
                        <div class="categoryUpdateWrapper"><div class="edits"><form id="categoryUpdateForm" class="values" table="category" responseArea=".links" ><input class="value" type="text" name="categoryName"></form><button class="updateBtn">update</button><button class="deleteBtn">Delete</button></div><button class="toggle">' + json[x].categoryName + '</button></div>\
                        <ul id="' + json[x].categoryName + json[x].idCategory + '">\
                        </ul>\
                    </div>\
                    <script> select("link","SELECT * FROM link WHERE category_idCategory = \''+ json[x].idCategory + '\';", "#'+json[x].categoryName + json[x].idCategory+'");\
                    </script>';
        
    }
/*
    for (key in json) {
        if(json.hasOwnProperty(key)){
             columns += key+", "; 
             console.log(key);
        }
       
    }*/

    templete += '<div class="categoryInsertWrapper"><div class="edits"><form id="categoryInsertForm" class="values" table="category" responseArea=".links" ><input class="value" type="text" name="categoryName"></form><button class="insertBtn">Insert</button></div><button class="toggle">+</button></div>';
    
    //console.log("columns: " + columns);

    console.log("templeteCategory: " + templete);
    
    return templete;
}

function linkTemplete(json){

    let templete = "";

    for (x in json) {
        templete += '<li><div><a href="' + json[x].linkURL + '">' + json[x].linkName + '</a></div></li>';
    }

    templete += '<li><button>+</button></li>';

    console.log("templeteLink: " + templete);
    return templete;

}

function parseData(table,data,responseArea){
    
    console.log();

    let json = JSON.parse(data);
    
    switch(table){
        case "category":
            let templete = categoryTemplete(json)
            $(responseArea).html(templete);
            assignEvents();
        break;
        case "link":
            $(responseArea).html(linkTemplete(json));
            assignEvents();
        break;
        default:
           // $(responseArea).html(json);
        break;

    }

    //$("#code").html(test.category[0].categoryName);
    //$(".code").html(json[0].categoryName);
    //$(responseArea).html(data);
}


function callCrudAjax(table, data, action, responseArea){

    $.post("ss/server.php",
    {
        table:table,
        action:action,
        data:data
    },
    function(response,status){
        ///console.log("response: " + response); 
        console.log("status: " + status); 
        console.log("table: " + table,"response: " + response,"responseArea: " + responseArea); 
        $(".code").html(response);
       // if(action != "insert"){
            parseData(table,response,responseArea);
       // }else{
            //$(".code").html(response);
        //}
        
    });
     
} 


$(document).ready(function(){
    assignEvents();

    $("#toggleEdits").click(function(){
        let toggleState = $(this).html()
        alert(toggleState);
        
    if(toggleState == "Edit Mode:off"){

        $(".edit").css("display","inline-block");
        $(this).html("Edit Mode:on");

    }else if(toggleState == "Edit Mode:on"){

        $(".edit").css("display","none");
        $(this).html("Edit Mode:off");

    }
    });

    $("button.toggle").click(function(){
        alert($(this).prev(".edit").css("display"));
        $(this).prev(".edits").toggle()
        /*
        if($(this).prev(".edit").css("display") == "none")
            $(this).prev(".edit").css("display","inline-block");
        else if ($(this).prev(".edit").css("display") == "inline-block")
            $(this).prev(".edit").css("display","none");*/            
            
    });
});