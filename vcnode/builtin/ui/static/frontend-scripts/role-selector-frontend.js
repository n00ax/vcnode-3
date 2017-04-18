
var roleParams = {
    selectedRole : ""
}

$(document).ready(setupHandlers)
function setupHandlers(){
    transitionHandlers();
    roleSelectorHandlers();
}
function transitionHandlers(){
    $("#id_box_next").click(function(){
        $("#role-box").removeClass('invisible');
        $(this).addClass('invisible');
    });
    $("#role-selector-box-next").click(function(){
        $("#finish-box").removeClass('invisible');
        $("#selected-role").text(roleParams.selectedRole);
        $(this).addClass('invisible');
    });
    //CORS Crap, doesn't allow IET, from dest, so server must proxy
    $("#finish-box-next").click(function(){
        $.get("/role-selector/select?randomID="+$('#random-id').text()+"&deviceRole="+roleParams.selectedRole, 
            (data, status)=>{
                alert(data)
                if(data === "200"){
                    document.cookie = ("deviceID="+$('#random-id').text()+";");
                    document.cookie = ("deviceRole="+roleParams.selectedRole+";"); //Set Cookie
            }
        })
    })
}
function roleSelectorHandlers(){
    $(".list-group-item").click(function(){
        $(this).parent().find(".list-group-item").removeClass('active');
        $(this).addClass('active')
    })
    $("#dashboard-selected-button").click(()=>{roleParams.selectedRole = "dashboard"})
    $("#seatback-selected-button").click(()=>{roleParams.selectedRole = "seatback"})
    $("#centerconsole-selected-button").click(()=>{roleParams.selectedRole = "centerconsole"})
}
