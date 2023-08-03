/*
	<action jsname="action_dw98online" description="Server for DW98">
    <property name="P1" type="scenenode" default="Player1" />	
	</action>
*/
const playerModel = require("Models/Player.js");
Player_ID=ccbReadFileContent("dreamIds.o");
EVENT="null";
ALIVE=1;
last_message="lastmessageforcompare";
last_event_recieved = "null";									// the event of the same name executes only once
 
counter_a=0;													//reset double command blocking
my_animation="stand";

action_LaunchDreamServ = function()
{

	if (counter_a > 1) { 										//reset toppeltkäskluse blokeering THIS NEEDS TO BE CHANGED ..												//THIS NEEDS TO BE CHANGED ..
		counter_a-=1;											//THIS NEEDS TO BE CHANGED ..
	}															
	if (counter_a == 1) {
		last_event_recieved="null";									//THIS NEEDS TO BE CHANGED ..
	}																//reset toppeltkäskluse blokeering //THIS NEEDS TO BE CHANGED ..

}

action_LaunchDreamServ.prototype.execute = function() {

	//DISPLAY MY HEALTH

	var my_health_name = "#" + "MPplayer" + parseInt(Player_ID) + ".health";

	var my_health=ccbGetCopperCubeVariable(my_health_name);
	ccbSetSceneNodeProperty(ccbGetSceneNodeFromName("ov1"), "Text", "health " + my_health);

	//AM I ALIVE?
	if (my_health==0) {
		ccbSetSceneNodeProperty(ccbGetSceneNodeFromName( "ov1" ), "Text", "GAME OVER YOU ARE DEAD.");
		ALIVE=0;

		//TO.DO SEND EVENT TO SERVER "I AM DEAD"
		//TO.DO WAIT RESPAWN COMMAND-SETUP RESPAWN
	}


	var i_in = ccbReadFileContent("i_in.o");

	if (i_in==null) {
		print("i_in.o READ ERROR!!! skipping..");
		return 0;															//FileRead error then skip all script.
	}


	var idatablock = i_in.split("&");


	for (i = 0; i < (idatablock.length-1); i++) {								//ALL PLAYERS DATA SPLITTED idatablock[0 to ...]

		var res = idatablock[i].split(",");										// PLAYER i ..spit separated from comma (parameters as res[0 to ..])

//-------------------------------------COMMANDS HERE---------------
		if (res[5] && res[5] != "null" && res[5] != last_event_recieved) {
																			//IF is there any command to check-if not then skip that block of code.
	
																			//this needs some work.. because of communication throu files i cant be sure that message getting to me once.. i need parameter in data or something else for checking it.
			last_event_recieved=res[5];										//toppelt sõnumit ei lase uuesti läbi nullin selle uuesti mõne aja pealt: see meetod pole parim..vaja muuta veel. //THIS NEEDS TO BE CHANGED ..
			counter_a=20;													//reset toppeltkäskluse blokeering //THIS NEEDS TO BE CHANGED ..
																			//this........................ //THIS NEEDS TO BE CHANGED ..

//::::::::::::::::::::::::::::::::::::::::HIT BY BULLET
			if ( res[5].substr(0, 4)=="Hit:" ) {
				var mename=("MPplayer" + parseInt(Player_ID) );
				var inname=( res[5].substr(4, res[5].length) );

				if (inname == mename) {										 // if its me then take health from me-if not me then let other player deal with it.{
					ccbSetCopperCubeVariable(my_health_name, my_health-10);       //remove from my health       //print("Got hit by " + res[0]);
				}
			}


//::::::::::::::::::::::::::::::::::::::::KILLED who
			if ( res[5].substr(0, 7)=="Killed:" ) {
				var inname=( res[5].substr(7, res[5].length) );
			//print(inname +" killed");
			}


//::::::::::::::::::::::::::::::::::::::::LIGHT ON
			if ( res[5].substr(0, 8)=="LightOn:" ) {
				var s = ccbGetSceneNodeFromName( res[5].substr(8, res[5].length) );

				if (s) {
					ccbSetSceneNodeProperty(ccbGetSceneNodeFromName(res[5].substr(8, res[5].length)), "Radius", "50");	
				}
			}


//::::::::::::::::::::::::::::::::::::::::LIGHT OFF
			if ( res[5].substr(0, 8)=="LightOf:" ) {
				var s = ccbGetSceneNodeFromName( res[5].substr(8, res[5].length) );

				if (s) {
					ccbSetSceneNodeProperty(ccbGetSceneNodeFromName(res[5].substr(8, res[5].length)), "Radius", "1");	
				}
			}


//::::::::::::::::::::::::::::::::::::::::REMOVE ITEM
			if ( res[5].substr(0, 7)=="Remove:" ) {
				var s = ccbGetSceneNodeFromName( res[5].substr(7, res[5].length)  );

				if (s) {
					ccbRemoveSceneNode( ccbGetSceneNodeFromName(res[5].substr(7, res[5].length)) );
				}
			}


//::::::::::::::::::::::::::::::::::::::::PLACE ITEM
			if ( res[5].substr(0, 11)=="Place_item:" ) {
				var sourceNode = ccbGetSceneNodeFromName(res[5].substr(11, res[5].length));
				var newscenenode = ccbCloneSceneNode(sourceNode);
				ccbSetSceneNodeProperty(newscenenode, "Position", res[1],res[2],res[3] );
			}

			if (EVENT == res[5]) {							//I cancel it if it was my called event.
				EVENT="null";
			}
			print("Event called by " + parseInt(res[0]) +" "+ res[5]);
						//--------------------------------------------------------------------------------------------------
		}				//ENDIF is there any command to check-if not then skip that block of code.-------------------------
						//-----------------------------------------------------------------------COMMANDS END---------------

//PLAYER X Y Z ROT
		if (parseInt(res[0]) == Player_ID) {

		}
		else {
			if (res[1] == "" || res[2] == "" || res[3] == "" || res[4] == "" || res[5] == "") { //if emty parameter then skip all of it.
				print("Useless data..");
			}
			else {//else

				var MPplayer=ccbGetSceneNodeFromName("MPplayer" + parseInt(res[0]) );
				ccbSetSceneNodeProperty(MPplayer, "Position", res[1],res[2],res[3]);
				var p2rot = ccbGetSceneNodeProperty(MPplayer, 'Rotation');
				p2rot.y=res[4];
				ccbSetSceneNodeProperty(MPplayer, "Rotation", p2rot);

				var anim = ccbGetSceneNodeProperty(MPplayer, 'Animation');

				if (anim != res[6]) {
					ccbSetSceneNodeProperty(MPplayer, "Animation", res[6]);
				}

			}

		}		//elseif

	}//next

//----------------------------------------
//COMPOSE DATA TO SEND OUT..pos rot event
var pos = ccbGetSceneNodeProperty(this.P1, 'Position');
pos.y=pos.y-16;//adjust


var rot = ccbGetSceneNodeProperty(this.P1, 'Rotation');
var anim = my_animation;//ccbGetSceneNodeProperty(this.P1, 'Animation');
//This line will be sent to the server and includes all info i want to share(separated by comma.
var new_message=pos.x.toFixed(2) +","+pos.y.toFixed(2) +","+ pos.z.toFixed(2)  +","+ rot.y.toFixed(2) +"," + EVENT +"," + anim;
if (last_message==new_message) {
//no need to write it into file because message is same

}
else {
	ccbWriteFileContent("i_out.o",new_message );
}
last_message=new_message;


return true;
}





//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//-----------------------------------------
//TODO--some ideas to do.
//Not needed stuff but can be easily add.. 
//-----------------------------------------
//ADD RESPAWN LOCATIONS TO MAP
//IF PLAYER DEAD.. RESPAWN
//IF I AM PLAYER 1 (host usually) I CHOOCE WHEN GAME WILL START.. 
//while wait players will sit in waiting-room or just freezed in spawnpoints.
//SERVER WAIT FOR MORE PLAYERS OR START GAME BY PRESSING BUTTON BY HOST-sending command throu server.
//RESTART GAME BY RELOADING LEVEL AGAIN-by sending command throu server.
//INSTEAD OF SPAWN A BOOK -SPAWN A LANDMINE.

//Kill counter / death counter / killed by who counter

//FPS controller needs work.. 
//Animation setting when key pressed instead of doing it in editor must be done in javascript.

//Needs better 3D soldier model .. with crouch so player doesnt have to stand as a HUGE target on map.

//Code a game launcher in freebasic.. so player will choose to host or join game by executeing only one executable manually.

//not sure about that is it possible but .. trigger 3D sound when other player shoots ( at other player location )
//can be done by custom 3d sound engine anyways.
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++