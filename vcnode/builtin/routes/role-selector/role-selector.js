
const userHandler = require("../../handler/userHandler.js")

module.exports = {
    roleSelector : function(request, response){
        if(request.cookies.deviceID == null){
            response.render('role-selector', {newRandomID: Math.floor(Math.random()*9002)})
        }
        else{
            response.redirect("/")
        }
    },
    select : function(request, response){
        console.log("Node Registeration/Creation Event, {ID:" + request.query.randomID.green + 
            "Role: " + request.query.deviceRole.green+"}");
        userHandler.localDatabase((error, colHandle)=>{
            colHandle.collection("local-nodes").insert({deviceID : request.query.randomID, deviceRole : request.query.deviceRole});
        })
        response.end("200", 200); //200, in data == Success [Jquery, Type inversion is weird..]
    }
}
