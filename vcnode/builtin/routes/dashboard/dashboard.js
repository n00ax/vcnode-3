const userHandler = require("../../handler/userHandler.js") 

module.exports = {
    dashboard : function(request, response){
        routeOnLoad(request, response)
    },
    routeOnLoad_roleSelector : function(request, response){
        routeOnLoad(request, response);
    }
}
function routeOnLoad(request, response){
    userHandler.localDatabase((error, db)=>{
        if((request.cookies.deviceID != null) && 
            db.collection('local-nodes').findOne({deviceID : request.cookies.deviceID}) != null){
            primaryDashboard(request, response)
        }
        else{
            response.redirect("/role-selector")
        }
    })
}
function primaryDashboard(request, response){
    response.render("dashboard")
}