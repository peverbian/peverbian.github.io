console.log("World.js");
const WORLD_W = 50;
const WORLD_H = 50;
const WORLD_ROWS = 12;
const WORLD_COLS = 15;
const WORLD_GAP = 2;

var whichLevel = 1;
const NUM_LEVELS = 4;
var levelOne =[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
				 1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
				 1,0,2,0,0,0,0,0,0,0,0,0,0,0,1,
				 1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
				 1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
				 1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
				 1,0,0,0,0,0,0,5,0,0,0,0,0,0,1,
				 1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
				 1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
				 1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
				 1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
				 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

var levelTwo = [ 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
				 1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,
				 1,0,3,0,3,0,1,0,2,0,4,0,0,0,1,
				 1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,
				 1,1,1,4,1,1,1,0,3,0,1,1,4,1,1,
				 1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,
				 1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,
				 1,0,1,1,1,1,1,1,1,1,1,0,3,0,1,
				 1,0,1,0,1,0,1,0,0,0,1,0,3,0,1,
				 1,0,4,0,4,0,4,0,5,0,1,0,3,0,1,
				 1,0,1,0,1,0,1,0,0,0,1,0,0,0,1,
				 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

var levelThree = [ 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
				 1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,
				 1,0,3,0,3,0,1,0,2,0,4,0,0,0,1,
				 1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,
				 1,1,1,4,1,1,1,0,3,0,1,1,4,1,1,
				 1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,
				 1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,
				 1,0,1,1,1,1,1,1,1,1,1,0,0,0,1,
				 1,0,1,0,1,0,1,0,0,0,1,0,0,0,1,
				 1,0,4,0,4,0,4,0,5,0,1,3,3,3,1,
				 1,0,1,0,1,0,1,0,0,0,1,0,0,0,1,
				 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

var levelFour =[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
				 1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
				 1,0,2,0,0,0,0,0,0,0,0,0,0,0,1,
				 1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
				 1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
				 1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
				 1,0,0,0,0,0,0,5,0,0,0,0,0,0,1,
				 1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
				 1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
				 1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
				 1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
				 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

var worldGrid = new Array();

const WORLD_FLOOR = 0;
const WORLD_WALL = 1;
const WORLD_PLAYERSTART = 2;
const WORLD_KEY = 3;
const WORLD_DOOR = 4;
const WORLD_STAIRS = 5;

function worldAtColRow(col,row) {
	return col + WORLD_COLS * row;
}

function returnTileTypeAtColRow(col, row) {
	if(col >=0 && col < WORLD_COLS &&
	   row >=0 && row < WORLD_ROWS) {
		return (worldGrid[worldAtColRow(col, row)]);
	} else {
		return WORLD_WALL;
	}
}

function loadNextLevel() {
	console.log("Loading Level " + whichLevel);
	switch(whichLevel) {
		case 1:
			worldGrid = levelOne.slice();
			break;
		case 2:
			worldGrid = levelTwo.slice();
			break;
		case 3:
			worldGrid = levelThree.slice();
			break;
	}
	blueCar.reset(car1Pic, "Bob");
	whichLevel++;
	if(whichLevel > NUM_LEVELS) whichLevel = 1;
}
/*
function loadLevel(whichLevel) {
	console.log("Really Loading Level " + whichLevel[0]);
	worldGrid = whichLevel.slice(); // slice copies arrays
	blueCar.reset(car1Pic, "Bob");
}
*/
function carWorldHandling(player) {
	//check for world
	carWorldCol = Math.floor(player.x/WORLD_W);
	carWorldRow = Math.floor(player.y/WORLD_H);


	if(carWorldCol >=0 && carWorldCol < WORLD_COLS &&
	   carWorldRow >=0 && carWorldRow < WORLD_ROWS) {
	   var tileHere = returnTileTypeAtColRow(carWorldCol, carWorldRow);
	   switch(tileHere) {
	   	case WORLD_STAIRS:
	   		loadNextLevel();
	   		break;
	   	case WORLD_WALL:
			player.bounce();
	   		break;
	   	case WORLD_KEY:
			player.keys++;
			worldGrid[worldAtColRow(carWorldCol,carWorldRow)] = WORLD_FLOOR;
			player.updateKeys();
			break;
	   	case WORLD_DOOR:
	   		if(player.keys == 0) {
				player.bounce();
			} else {
				player.keys--;
				worldGrid[worldAtColRow(carWorldCol,carWorldRow)] = WORLD_FLOOR;
				player.updateKeys();
			}
	   		break;
	   }
	}
}

function drawWorld() {
	var arrayIndex = 0;
	var drawTileX = 0
	for(var eachRow = 0; eachRow < WORLD_ROWS; eachRow++) {
		for(var eachCol = 0; eachCol < WORLD_COLS; eachCol++) {
			var tileKindHere = worldGrid[arrayIndex];
			var useImg = worldPics[tileKindHere];
			if(tileKindHasTransparency(tileKindHere)) {
				canvasContext.drawImage(worldPics[WORLD_FLOOR],drawTileX,WORLD_H*eachRow);
			}
			canvasContext.drawImage(useImg, drawTileX, WORLD_H*eachRow);
			drawTileX += WORLD_W;
			arrayIndex++;
		}
		drawTileX = 0;
	}
}

function tileKindHasTransparency(tileKind) {
	if(tileKind == WORLD_KEY) return true;
	if(tileKind == WORLD_DOOR) return true;
	if(tileKind == WORLD_STAIRS) return true;
	return false;
}
