/**
 * Zone Loader Service to fetch data from Zone Endpoint of the DW98/xDreams 
 * 
 * implemented by Odelyzid
 */

zoneLoader();


//switch to correspondig Scence/Zone method
const zoneLoader = function(ccbGameSceneName){
    ccbSwitchToScene(ccbGameSceneName);
}

//assign Player to Scene/Zone and Playerspawn
zoneLoader.prototype.assignDataToZoneNode = function(){
    for(i = 1; i<= 10; i++){
        if(ccbGetCopperCubeVariable('game.playerStartLogged_' + i) !== 1){
            playerSpawn = ccbGetSceneNodeFromName("player_camera_" + i);
            ccbSetActiveCamera(playerSpawn);
        }
    }
}


//export the Zoneloader to be used in the init 
modules.exports = {
    zoneLoader,
}