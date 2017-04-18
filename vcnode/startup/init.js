/*
    init.js Simple Initalization Script for VcNODE 
*/

const masterDescriptor = require('./masterDescriptor.js');
const fs = require('fs');
const https = require('https');
const process = require('process');
const colors = require('colors');
const syncRequest = require('sync-request')

var date = new Date()

var loadedModules = Array();

//Override Handlers Pre-Startup
console.log = function(){
    console.info(("<" + date.getMinutes() + ":" +  date.getSeconds()+ ":" + date.getMilliseconds() + 
        ">" + " " + Array.from(arguments)[0]).bold);
}
console.error = function(){
    console.log(Array.from(arguments)[0].red)
}

module.exports = {
    getConfigParams : function(){
        return require('../modules/remoteBaseDescriptor.js').configParams;
    }
}

initApp();

function initApp(){
    console.log(masterDescriptor.initDescriptor.moduleName + " Version, " +masterDescriptor.initDescriptor.moduleVersion + 
        " (" + date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear() + ")");
    console.log("Remote Origin   =   [" + (masterDescriptor.initDescriptor.remoteOrigin.originBaseURL).green + "]"+
        "\n\t  Descriptor Base =    [" + (masterDescriptor.initDescriptor.remoteOrigin.originBaseDescriptor).green + "]");
    initModules();
}

function initModules(){
    initGETMethod(masterDescriptor.initDescriptor.remoteOrigin.originBaseDescriptor, "")
    initParseModule(loadedModules.pop());
    require(masterDescriptor.initDescriptor.moduleEntryFile).enter();
}
function initParseModule(importedModule){
    console.log("Module Loaded =>, ".green + JSON.stringify(importedModule.thisModule));
    for(var i in importedModule.thisModule.moduleFiles){
        console.log("Required SRC's {".green+ importedModule.thisModule.moduleName.green
            +"} =>, ".green + JSON.stringify(importedModule.thisModule.moduleFiles[i]) );
        initGETMethod(importedModule.thisModule.moduleFiles[i].filePath + "/" + importedModule.thisModule.moduleFiles[i].fileName,
        importedModule.thisModule.moduleFiles[i].filePath)
    }
    for(var i in importedModule.thisModule.requiredModules){
        console.log("Dependencies {".green+ importedModule.thisModule.moduleName.green
            +"} =>, ".green + JSON.stringify(importedModule.thisModule.requiredModules[i]));
        initGETMethod(importedModule.thisModule.requiredModules[i].modulePath + "/" + importedModule.thisModule.requiredModules[i].moduleDescriptor,
            importedModule.thisModule.requiredModules[i].modulePath);
        initParseModule(loadedModules.pop()); //Recursive call, check ft*
    }
}
function initGETMethod(getURLPath, getDestPath){
    console.log("GET=>"+getURLPath.yellow);
    try{
        var response = syncRequest('GET', masterDescriptor.initDescriptor.remoteOrigin.originBaseURL + getURLPath)
        if(response.body == null){
            console.log("Failed To Fetch Remote... Terminating!".red)
            console.log(ex);
            process.exit(-1);
        }
        if(!fs.existsSync("../modules/" + getDestPath + "")){
            fs.mkdirSync("../modules/" + getDestPath + "")
        }
        fs.writeFileSync("../modules/" + getURLPath, response.body, (err) => {
            if(err!=null){
               console.log("IO Failure Terminate, Synchronous....");
               process.exit(-1); 
            }
        });
    }
    catch(ex){
        console.log("Failed To Fetch Remote... Terminating!".red)
        console.log(ex);
        process.exit(-1);
    }
    loadedModules.push(require("../modules/" + getURLPath));
}

