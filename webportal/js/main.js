function select(table,statement,responseArea){
    console.log("table: " + table + ", statement: " + statement + ", responseArea: " + responseArea);
    callCrudAjax(table,statement,"select",responseArea);
}

function callCrudAjax(table, data, action, responseArea){

    $.post("ss/server.php",
    {
        table:table,
        action:action,
        data:data
    },
    function(response,status){
      
        console.log("status: " + status); 
        console.log("table: " + table,"response: " + response,"responseArea: " + responseArea); 
        $(".code").html(response);
        parseData(table,response,responseArea);       
    });
     
} 

function parseData(table,data,responseArea){
    
    console.log();

    let json = JSON.parse(data);
    
    switch(table){
        case "category":
            let templete = categoryTemplete(json)
            templete = templete.replace("[catid]",json[x].category_id);
            $(responseArea).html(templete);
            assignEvents();
        break;
        case "link":
            $(responseArea).html(linkTemplete(json));
            assignEvents();
        break;
        default:
            $(responseArea).html(json);
        break;

    }

    //$("#code").html(test.category[0].categoryName);
    //$(".code").html(json[0].categoryName);
    //$(responseArea).html(data);
}

function insertItem(button){
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
       select("category","SELECT * FROM category WHERE useraccount_id =" + current_user + ";",".links");
}

function updateItem(button){

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

    callCrudAjax(table,JSON.stringify(data),"update",responseArea);
}

function deleteItem(button){
    let table = $(button).siblings(".values").attr("table");
    let id = $(button).siblings(".values").attr("sqlid");
    let responseArea = $(button).siblings(".values").attr("responseArea"); 

    /*for(var i = 0; i < formData.length; i++){
       data[formData[i].name] = formData[i].value;
       console.log("Data: " + data[formData[i].name]); 
    }*/

    //dump(data);

    console.log("deleteData: " + table +", "+ id +", "+responseArea);

    callCrudAjax(table,id,"delete",responseArea);
}

function toggleInsertBtn(button){
    
    if($(button).prev().css("display") == "block"){
        $(button).text("+");
        $(button).prev().css("display", "none") 
    }else{
        $(button).text("x");
        $(button).prev().css("display", "block")  
    }
}




function assignEvents(){

    $(".insertBtn").off().on("click", function(){
        var catid = $(this).parents("ul").attr("justid");
        $('input[name="category_idCategory"]').val(catid);
        $(this).parent().css("display", "none");
        insertItem(this);
    });
    $(".toggleInsertBtn").off().on("click", function(){
        toggleInsertBtn(this);
    });




    $(".updateBtn").off().on("click", function(){
        updateItem(this);
        $(this).parent().parent().siblings(".regular").css("display","inline-block");
        $(this).parent().parent(".edit").css("display","none");
    });
    $(".deleteBtn").off().on("click", function(){
        deleteItem(this);           
    });

    $('.regular').bind('contextmenu', function(e) {
        return false;
    }); 
    
        $(".regular").mouseup(function (e) {
            if (e.button == 2) {
                $(this).css("display","none");
                $(this).siblings(".edit").css("display","inline-block");
            }
        });

}

function dump(obj) {
    var out = '';
    for (var i in obj) {
    out += i + ": " + obj[i] + "\n";
    }
   alert(out);
   }


document.oncontextmenu = function() {
       return false;
}


function categoryTemplete(json){

    console.log("ran");

    let templete = "";
    let columns = "";
    let values = "";

    for (x in json) {
        console.log("templete: " + templete);
        templete += '<div id="'+json[x].category_id+'" class="category">\
                        <h3 class="regular">' + json[x].category_name + '</h3>\
                                <div class="edit">\
                                    <form id="categoryUpdateForm" class="values" table="category" sqlid="' + json[x].category_id + '" responseArea=".links" >\
                                        <input class="value" type="hidden" name="category_id" value="' + json[x].category_id + '">\
                                        <input class="value" type="text" name="category_name" value="' + json[x].category_name + '">\
                                    </form>\
                                    <button class="editBtn updateBtn">\
                                        U\
                                    </button>\
                                    <button class="editBtn deleteBtn">\
                                        X\
                                    </button>\
                                </div>\
                            <ul id="' + json[x].category_name + json[x].category_id + '" justid="' + json[x].category_id + '">\
                            </ul>\
                    </div>\
                    <script>\ 
                        select("link","SELECT * FROM link WHERE category_idCategory = \''+ json[x].category_id + '\';", "#'+json[x].category_name + json[x].category_id+'");\
                    </script>';
        
    }
    templete += '<div class="category">\
                    <div class="edit">\
                        <form id="categoryInsertForm" class="values" table="category" responseArea=".links">\
                            <input class="value" type="text" name="category_name">\
                        </form>\
                        <button class="insertBtn">\
                            Insert\
                        </button>\
                    </div>\
                    <button class="toggleInsertBtn editBtn">\
                        +\
                    </button>\
                </div>';

    console.log("templeteCategory: " + templete);
    
    return templete;
}


function linkTemplete(json){

    let templete = "";

    for (x in json) {
        templete += '<li><div><a class="regular" href="' + json[x].linkURL + '">' + json[x].linkName + '</a></div></li>\
                            <div class="edit">\
                                <form id="categoryUpdateForm" class="values" table="category" sqlid="' + json[x].category_id + '" responseArea=".links" >\
                                    <input class="value" type="hidden" name="category_id" value="' + json[x].idlink + '">\
                                Link Name:<input class="value" type="text" name="category_name" value="' + json[x].linkName + '">\
                                Link Url:<input class="value" type="text" name="category_name" value="' + json[x].linkURL + '">\
                                </form>\
                                <button class="editBtn updateBtn">\
                                    U\
                                </button>\
                                <button class="editBtn deleteBtn">\
                                    X\
                                </button>\
                            </div>';
    }

    templete += '<li style="text-align:center;">\
                    <div class="edit">\
                        <form id="linkInsertForm" class="values" table="link" responseArea="" style="text-align:right;">\
                            <input class="value" type="hidden" name="linkOrder" value="0">\
                            Link Name: <input class="value" type="text" name="linkName"><br/>\
                            Link Url: <input class="value" type="text" name="linkURL">\
                            <input class="value" type="hidden" name="linkRating" value="0">\
                            <input class="value" type="hidden" name="linkNumOfClicks" value="0">\
                            <input class="value" type="hidden" name="norepudiation_idnorepudiation" value="1">\
                            <input class="value" type="hidden" name="category_idCategory" value="[catid]">\
                            <input class="value" type="hidden" name="useraccount_id" value="'+ current_user +'">\
                        </form>\
                        <button class="insertBtn">\
                            Insert\
                        </button>\
                    </div>\
                    <button class="editBtn toggleInsertBtn">+</button></li>';
                    

    console.log("templeteLink: " + templete);
    return templete;
  
}






