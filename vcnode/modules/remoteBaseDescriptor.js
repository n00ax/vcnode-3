module.exports = {
    thisModule : {
        moduleName : "Base Descriptor",
        moduleVersion : "1.0.0",
        moduleFiles : [
		       ],
        requiredModules : [
	{
    		modulePath : "testModule",
    		moduleDescriptor : "testModuleDescriptor.js"
	}
        ]
   },
    configParams : {
        serverHttpBindIP : "0.0.0.0",
        serverHttpsBindIP : "0.0.0.0",
        serverHttpPort : 4000,
        serverHttpsPort : 4001,
	mongoClientURL : "mongodb://localhost:27017/vcnode-local"
    }
}
