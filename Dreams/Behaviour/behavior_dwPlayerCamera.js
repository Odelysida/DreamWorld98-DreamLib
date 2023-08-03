// This is a behavior, that gives a camera, a first person move effect with inverted axis...

/*
<behavior jsname="behavior_fpiaCamera" description="First Person Inverted Axis Camera">
<property name="MovementSpeed" type="float" default="0.1" />
<property name="RotateSpeed" type="float" default="10000" />
</behavior>
*/

behavior_fpiaCamera = function() {
this.LastTime = null;
this.MouseDown = false;
this.MouseDownX = 0;
this.MouseDownY = 0;
this.angle = -90;
this.ForwardKeyDown = false;
this.BackKeyDown = false;

this.leftKeyDown = false;
this.rightKeyDown = false;
this.jumpKeyDown = false;
this.downKeyDown = false;
this.upKeyDown = false;

this.RotateSpeed = 10000;
};

behavior_fpiaCamera.prototype.onAnimate = function(node, timeMs) {
if (this.LastTime == null) {
this.LastTime = timeMs; 
return false;
}

var delta = timeMs - this.LastTime;
this.LastTime = timeMs;
if (delta > 200) delta = 200;
var timeDiff = delta;

var cam = ccbGetActiveCamera();
if (cam == null)
return false;

var rotation = ccbGetSceneNodeProperty(cam, "Rotation");
var posTarget = ccbGetSceneNodeProperty(cam, "Target");
var posCam = ccbGetSceneNodeProperty(cam, "Position");
var moveX = 0;	
var moveY = 0;	

if (this.MouseDown) {
moveX = -(ccbGetMousePosX() - this.MouseDownX) * this.RotateSpeed / 50000;	
moveY = (ccbGetMousePosY() - this.MouseDownY) * this.RotateSpeed / 50000;
} 

if ( !(moveX < 0.0001 && moveX > -0.001) ) {
this.angle = this.angle + moveX * Math.PI / 180;
posTarget.x += (moveX) *Math.sin(this.angle);
posTarget.z += (moveX) *Math.cos(this.angle);
}

if ( !(moveY < 0.0001 && moveY > -0.001)) {
posTarget.y = posTarget.y+ moveY;
}

this.MouseDownX = ccbGetMousePosX();
this.MouseDownY = ccbGetMousePosY();
ccbSetSceneNodeProperty(cam, "Target", posTarget);
var rotCam = ccbGetSceneNodeProperty(cam, 'Rotation');	

var bForward = this.upKeyDown;
var bBackward = this.downKeyDown;
var bLeft = this.leftKeyDown;
var bRight = this.rightKeyDown;

if (bForward==true) {
posCam.x += 0.5;
posCam.y += 0;
posCam.z += 0;
posTarget.x += 0.5;
posTarget.y += 0;
posTarget.z += 0;

ccbSetSceneNodeProperty(cam, "Position", posCam);
ccbSetSceneNodeProperty(cam, "Target", posTarget);
}

if (bBackward==true) {
posCam.x -= 0.5;
posCam.y += 0;
posCam.z += 0;
posTarget.x -= 0.5;
posTarget.y += 0;
posTarget.z += 0;

ccbSetSceneNodeProperty(cam, "Position", posCam);
ccbSetSceneNodeProperty(cam, "Target", posTarget);
}

return true;
}

behavior_fpiaCamera.prototype.onMouseEvent = function(mouseEvent) {
if (mouseEvent == 3) {
this.MouseDown = true;
this.MouseDownX = ccbGetMousePosX();
this.MouseDownY = ccbGetMousePosY();
}
else
if (mouseEvent == 2)
this.MouseDown = false;
else
if (mouseEvent == 5) {
this.MouseDownR = true;
this.MouseDownX = ccbGetMousePosX();
this.MouseDownY = ccbGetMousePosY();
}
else
if (mouseEvent == 4)
this.MouseDownR = false;
}

behavior_fpiaCamera.prototype.onKeyEvent = function(code, down) {
if (code == 37 || code == 65) {
this.leftKeyDown = down;
if (down) this.rightKeyDown = false;
return true;
}

if (code == 39 || code == 68) {
this.rightKeyDown = down;
if (down) this.leftKeyDown = false;
return true;
}

if (code == 38 || code == 87) {
this.upKeyDown = down;
if (down) this.downKeyDown = false;
return true;
}

if (code == 40 || code == 83) {
this.downKeyDown = down;
if (down) this.upKeyDow 
}}