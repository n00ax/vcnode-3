/*
    server-start.js Simple Server Init for VcNODE 
*/

const https = require('https')
const http = require('http')

const mustache = require('mustache-express')
const cookieParser = require('cookie-parser')
const express = require('express')
const expressInstance = express();

const dispatchMap = require('./dispatch-map.js')
const init = require('../../startup/init.js')

module.exports = {
    enter : function(){
        startServer(0,0)
    }
}
function startServer(port, bindIP){
    bindMiddleware(expressInstance)
    for(var i in dispatchMap.getMap){
        expressInstance.get(dispatchMap.getMap[i].destinationPath, dispatchMap.getMap[i].destinationHandler)
        console.log("GET Route Registered, " + dispatchMap.getMap[i].destinationPath.green);
        for(var a in dispatchMap.getMap[i].destinationSubroutes){
            expressInstance.get(dispatchMap.getMap[i].destinationSubroutes[a].destinationPath,
                dispatchMap.getMap[i].destinationSubroutes[a].destinationHandler)
            console.log("GET Route Registered, " + dispatchMap.getMap[i].destinationSubroutes[a].destinationPath.green);
       }
    }
    for(var i in dispatchMap.postMap){
        expressInstance.get(dispatchMap.postMap[i].destinationPath, dispatchMap.postMap[i].destinationHandler)
        console.log("GET Route Registered, " + dispatchMap.postMap[i].destinationPath.green);
        for(var a in dispatchMap.postMap[i].destinationSubroutes){
            expressInstance.get(dispatchMap.postMap[i].destinationSubroutes[a].destinationPath,
                dispatchMap.postMap[i].destinationSubroutes[a].destinationHandler)
            console.log("GET Route Registered, " + dispatchMap.postMap[i].destinationSubroutes[a].destinationPath.green);
       }
    }
    for(var i in dispatchMap.putMap){
        expressInstance.get(dispatchMap.putMap[i].destinationPath, dispatchMap.putMap[i].destinationHandler)
        console.log("GET Route Registered, " + dispatchMap.putMap[i].destinationPath.green);
        for(var a in dispatchMap.putMap[i].destinationSubroutes){
            expressInstance.get(dispatchMap.putMap[i].destinationSubroutes[a].destinationPath,
                dispatchMap.putMap[i].destinationSubroutes[a].destinationHandler)
            console.log("GET Route Registered, " + dispatchMap.putMap[i].destinationSubroutes[a].destinationPath.green);
       }
    }
    for(var i in dispatchMap.staticMap){
        console.log(__dirname + "../" +dispatchMap.staticMap[i])
        expressInstance.use(express.static(__dirname + "/../" +dispatchMap.staticMap[i]))
    }
    bindViews(expressInstance)
    http.createServer(expressInstance).listen( init.getConfigParams().serverHttpPort, 
        init.getConfigParams().serverHttpBindIP);
    https.createServer(expressInstance).listen(init.getConfigParams().serverHttpsPort, 
        init.getConfigParams().serverHttpsBindIP);
    console.log("HTTP/IPv4: " + init.getConfigParams().serverHttpBindIP.green + ", HTTP/Port: " + (init.getConfigParams()
        .serverHttpPort).toString().green);
    console.log("HTTPS/IPv4: " + init.getConfigParams().serverHttpsBindIP.green + ", HTTPS/Port: " + (init.getConfigParams()
        .serverHttpsPort).toString().green);
}
function bindViews(appInstance){
    appInstance.engine('mustache', mustache())
    appInstance.set('view engine', 'mustache')
    appInstance.set('views', __dirname + '/../ui/dynamic/')
}
function bindMiddleware(appInstance){
    appInstance.use(cookieParser());
}