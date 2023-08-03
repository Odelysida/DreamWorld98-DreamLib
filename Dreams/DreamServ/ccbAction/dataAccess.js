
//Init RequestUrl for Server and Player properties as Model 
const playerModel = require("Models/Player.js");
var requestUrl = "http://dreams.42web.io/dreamServ/index.php?action="

//Request Callback 
function requestCallback(dataReceived) {
    if (dataReceived) {
        print("finished request! Data size:" + dataReceived.length);
        
    }
    else {
        print("Error in sending Request");
    }
   
}

//test the server response
const testServerResponse = function () {
    ccbDoHTTPRequest("http://dreams.42web.io/dreamServ/index.php?action=startUpServerService", requestCallback);
}


//Cancel all requests
const stopServerResponse = function () {
    ccbCancelHTTPRequest(ccbFileReadContents("dreamIds.o"));
}




//DataAccessLayer for retrieving and posting Data from DB
const PlayerDataAccess = function (requestUrl) {
    PlayerDataAccess.prototype.setId = function(requestUrl) {
        ccbDoHTTPRequest((requestUrl + "setPlayerId"), setPlayerId);
    }

    PlayerDataAccess.prototype.setHealth = function (requestUrl) {
        ccbDoHTTPRequest((requestUrl + "setPlayerHealth"), setPlayerHealth);
    }

    PlayerDataAccess.prototype.setExperience = function (requestUrl) {
        ccbDoHTTPRequest((requestUrl + "setPlayerXp"), setPlayerXp);
    }

    PlayerDataAccess.prototype.setLevel = function (requestUrl) {
        ccbDoHTTPRequest((requestUrl + "setPlayerLevel"), setPlayerLevel);
    }


}

const MapDataAccess = function (requestUrl) {
    MapDataAccess.prototype.setId = function (requestUrl) {
        ccbDoHTTPRequest((requestUrl + "setMapId"), setMapId));
    }
}

//Callback function for setting PlayerId
setPlayerId = function () {
    if (dataReceived) {
        PlayerModel.prototype.setId = dataReceived;
    }
    else {
        requestCallback();
    }
    
}
//Callback for setting PlayerHealth
setPlayerHealth = function () {
    if (dataRecieved) {
        PlayerModel.prototype.setHealth = dataRecieved;
    }
    else {
        requestCallback();
    }
}
//Callback function for setting PlayerExperience
setPlayerId = function () {
    if (dataReceived) {
        PlayerModel.prototype.setExperience = dataReceived;
    }
    else {
        requestCallback();
    }

}
//Callback for setting PlayerLevel
setPlayerHealth = function () {
    if (dataRecieved) {
        PlayerModel.prototype.setLevel = dataRecieved;
    }
    else {
        requestCallback();
    }
}