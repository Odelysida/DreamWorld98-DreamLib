/**
 * Connect to Server Action for use with CC
 */


//Include DreamLib base Libraray
const dreamLibBehaviours = require("./../../initDreamLib.js").dwBehave;

//targetServerIpAddress from game.serverIpAddress Variable
var targetServerIpAddress = ccbGetCopperCubeVariable('game.serverIpAddress');


const connector = function(){
    print("dwCOnnectorInit")
}

//match controller routes to gain desired data from webservice
connector.prototype.controllerRoutes = {
    playerController: '?controller=player&action=getPlayer',
    zoneController: '?controller=zone&action=getZoneForPlayer&id=',
    missionController: '?controller=mission&action=getMissionsForPlayer&id=',
}

//connect to remote ip address
connector.prototype.connectToRemoteDwServer = function(targetServerIpAddress) {
    ccbDoHTTPRequest(targetServerIpAddress, this.connection);
}


//
connector.prototype.connection(dataReceived, dreamLibBehaviours){
    if(dataReceived){
        print("Connection established: " + dataReceived);
        var player = ccbDoHTTPRequest(targetServerIpAddress + this.controllerRoutes.playerController, loginPlayer);
        ccbDoHTTPRequest(targetServerIpAddress + this.controllerRoutes.zoneController + player.id, loadZoneForPlayer);
    }else{
        print("Connection could not be established");
    }
}

connector.prototype.disconnectFromRemoteDwServer = function(){

}

connector.prototype.loginPlayer = function(dreamLibBehaviours){
    return dataReceived.data;
}

//Instantiate zone loader and corresponding methods
connector.prototype.loadZoneForPlayer = function(dreamLibBehaviours){
    return dreamLibBehaviours.zoneLoaderBehavoiur(dataReceived.data.zoneName);
}

connectToRemoteDwServer(targetServerIpAddress);

modules.exports = {
    connector: connector
}
