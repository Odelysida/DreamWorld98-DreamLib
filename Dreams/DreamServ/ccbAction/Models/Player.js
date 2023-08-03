//Player Class - Definition of Properties for Player in Db
function Player(id, experience, level, health, mana, ownedByUserId, worldId, wPositionX, wPositionY, wPositionZ, inventoryId) {
    this.id = id;
    this.experience = experience;
    this.level = level;
    this.health = health;
    this.mana = mana;
    this.ownedByUserId = ownedByUserId;
    this.worldId = worldId;
    this.wPositionX = wPositionX;
    this.wPositionY = wPositionY;
    this.wPositionZ = wPositionZ;
    this.inventoryId = inventoryId;
}

//Getter-Functions for getting PlayerData

Player.prototype.getId = function() {
    this.id = ccbGetCopperCubeVariable("player_id");
}

Player.prototype.getHealth = function() {
    this.helath = ccbGetCopperCubeVariable("player_health"); 
}

Player.prototype.getExperiece = function () {
    this.experience = ccbGetCopperCubeVariable("player_xp");
}

Player.prototype.getLevel = function () {
    this.level = ccbGetCopperCubeVariable("player_level");
}

Player.prototype.getMana = function () {
    this.mana = ccbGetCopperCubeVariable("player_mana");
}

Player.prototype.getOwnerId = function () {
    this.ownedByUserId = ccbGetCopperCubeVariable("player_ownedById");
}

Player.prototype.getWorldId = function () {
    this.worldId = ccbGetCopperCubeVariable("player_worldId");
}

Player.prototype.getWpositionX = function () {
    this.getWpositionX = ccbGetCopperCubeVariable("player_posX");
}

Player.prototype.getWpositioY = function () {
    this.getWpositionY = ccbGetCopperCubeVariable("player_posY");
}

Player.prototype.getWpositionZ = function () {
    this.getWpositionZ = ccbGetCopperCubeVariable("player_posZ");
}


//Setter-Function for setting PlayerData

Player.prototype.setId = function () {
    ccbSetCopperCubeVariable("player_id", this.id);
}

Player.prototype.setHealth = function () {
    ccbSetCopperCubeVariable("player_health", this.health);
}

Player.prototype.setExperiece = function () {
    ccbSetCopperCubeVariable("player_Experience", this.experience);
}

Player.prototype.setLevel = function () {
    ccbSetCopperCubeVariable("player_level", this.level);
}

Player.prototype.setMana = function () {
    ccbSetCopperCubeVariable("player_mana", this.mana);
}

Player.prototype.setOwnerId = function () {
    ccbSetCopperCubeVariable("player_ownedById", this.ownedByUserId);
}

Player.prototype.setWorldId = function () {
    ccbSetCopperCubeVariable("player_worldId", this.worldId);
}

Player.prototype.setWpositionX = function () {
    ccbSetCopperCubeVariable("player_wPositionX", this.wPositionX);
}

Player.prototype.setWpositioY = function () {
    ccbSetCopperCubeVariable("player_wPositionX", this.wPositionX);
}

Player.prototype.setWpositionZ = function () {

}
