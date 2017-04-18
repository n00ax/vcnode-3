const mongo = require('mongodb').MongoClient

const connectURL = require('../../startup/init.js').getConfigParams().mongoClientURL;

const nodesCollection = "local-nodes"
const usersCollection = "local-users"

module.exports = {
    deviceNode : function(deviceNodeCookieID, callback){ // callback (data)=>{data_.**}
        try{
            mongo.connect(connectURL, (error, db)=>{
                try{
                    db.collection("local-nodes").findOne({deviceID : deviceNodeCookieID}, (err, data)=>{
                        try{
                            callback(error, data);
                        }
                        catch(error){
                            console.error("Element (DeviceID={"+deviceNodeCookieID+"}) Pulled From Document Does Not Exist/or Unidentified Error")
                        }
                    })
                }
                catch(error){
                    console.error("Database Error, Specified Requested Users Collection Not Available")
                }
            })
        }
        catch(error){
            console.error("Database Services Unavailable")
        }
    },
    localDatabase : function(callback){
        try{
            mongo.connect(connectURL, (error, db)=>{
                callback(error, db);
            })
        }
        catch(error){
            console.error("Database Services Unavailable")
        }
    }
}