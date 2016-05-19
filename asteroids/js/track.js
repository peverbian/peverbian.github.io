const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_ROWS = 15;
const TRACK_COLS = 20;
const TRACK_GAP = 2;
var levelOne = [4,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,
				 4,4,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,4,
				 4,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
				 1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,
				 1,0,0,0,1,4,4,4,4,4,4,4,4,4,4,4,1,0,0,1,
				 1,0,0,1,4,4,4,4,4,4,4,4,4,4,4,4,1,0,0,1,
				 1,0,0,1,4,4,4,4,4,4,4,4,4,4,4,4,1,0,0,1,
				 1,0,0,1,4,4,4,4,4,4,4,4,4,4,4,4,1,0,0,1,
				 1,0,0,1,4,4,4,4,4,4,4,4,4,4,4,4,1,0,0,1,
				 1,0,0,1,4,4,4,4,4,4,4,4,4,4,4,4,1,0,0,1,
				 1,2,2,1,4,4,4,4,4,4,4,4,4,4,4,4,1,0,0,1,
				 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,
				 1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
				 1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
				 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

var trackGrid = new Array();

const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYERSTART = 2;
const TRACK_GOAL = 3;
const TRACK_TREES = 4;

function trackAtColRow(col,row) {
	return col + TRACK_COLS * row;
}

function returnTileTypeAtColRow(col, row) {
	if(col >=0 && col < TRACK_COLS &&
	   row >=0 && row < TRACK_ROWS) {
		return (trackGrid[trackAtColRow(col, row)]);
	} else {
		return TRACK_WALL;
	}
}

function carTrackHandling(whichCar) {
	//check for track
	carTrackCol = Math.floor(whichCar.x/TRACK_W);
	carTrackRow = Math.floor(whichCar.y/TRACK_H);


	if(carTrackCol >=0 && carTrackCol < TRACK_COLS &&
	   carTrackRow >=0 && carTrackRow < TRACK_ROWS) {
	   var tileHere = returnTileTypeAtColRow(carTrackCol, carTrackRow);
	   if(tileHere == TRACK_GOAL) {
	   		document.getElementById("debugText").innerHTML = "" + whichCar.carName + " Wins!";
	   		loadLevel(levelOne);
	   }else if(tileHere != TRACK_ROAD) {
			whichCar.bounce();
		}	
	}
}

function drawTrack() {
	var arrayIndex = 0;
	var drawTileX = 0
	for(var eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
		for(var eachCol = 0; eachCol < TRACK_COLS; eachCol++) {
			var tileKindHere = trackGrid[arrayIndex];
			var useImg = trackPics[tileKindHere];
			canvasContext.drawImage(useImg, drawTileX, TRACK_H*eachRow);
			drawTileX += TRACK_W;
			arrayIndex++;
		}
		drawTileX = 0;
	}
}

