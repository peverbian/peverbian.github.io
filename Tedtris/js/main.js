
var canvas;
var canvasContext;
var tiles = new Array();
var count = 0;
var numCols = 10;
var numRows = 20;
const size = 30;
const speed = 4;
var timePerDrop = 20;
var bottomRect;

var score = 0;
var level = 0;
var comboCount = 0;
var board = new Array();
var droppingTile = {type: 0, tiles: new Array()};
var playing = true;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	colorRect(0,0,canvas.width, canvas.height, "black");
	//loadImages();
	startGame();
}

function startGame() {
	bottomRect = {x: 0, y: canvas.height, width: canvas.width, height: 100};

	var framesPerSecond = 30;
	setInterval(function() {
				updateEverything();
				drawEverything(); 
			}, 1000/framesPerSecond);
//	resizeCanvas();
	setupInput();
	resetGame();
}

function resetGame() {
	score = 0;
	level = 0;
	comboCount = 0;
	delete board;
	board = new Array();
	playing = true;
	for (var i = 0; i < numCols; i++) {
		board[i] = new Array();
		for (var j = 0; j < numRows+2; j++) {
			board[i][j] = null;
		}
	}
	droppingTile = spawnTile();
}

function updateEverything() {
	if(playing) {
		count++;
		if(count >= timePerDrop) {
			count = 0;
			dropTile();
		}
		updateScore();
	}
}

function updateScore() {
	document.getElementById("scoreDiv").innerHTML = "Score: " + score;
}

function drawEverything() {
	drawBackground();
/*	for (var i = tiles.length - 1; i >= 0; i--) {
		tiles[i].draw();
	}*/
	for (var i = 0; i < numCols; i++) {
		for (var j = 0; j < numRows; j++) {
			if(board[i][j]) {
				board[i][j].draw();
			}
		}
	}
	if(playing && droppingTile.tiles) {
		//console.log("Drawing Tiles");
		for (var i = droppingTile.tiles.length - 1; i >= 0; i--) {
			droppingTile.tiles[i].draw();
		}
	} 
}

function drawBackground() {
	colorRect(0,0,canvas.width, canvas.height, "gray");

}

function resizeCanvas() {
	console.log("Resizing Canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	canvas.style.boarder = "1px solid #000";
}

function dropTile() {
	//check to see if it can drop
	var canDrop = true;
	for (var i = droppingTile.tiles.length - 1; i >= 0; i--) {
		if(board[droppingTile.tiles[i].x][droppingTile.tiles[i].y + 1] || droppingTile.tiles[i].y >= numRows-1 ) {
			canDrop = false;
		}
	}
	//if they can drop, drop.
	if(canDrop == true) {
		console.log("Dropping Tile" + droppingTile.tiles[0].y);
		for (var i = droppingTile.tiles.length - 1; i >= 0; i--) {
			droppingTile.tiles[i].y++;
		}
	} else { //otherwise they get stuck.
		console.log("sticking tiles");
		placeTiles();
		checkForLine();
		droppingTile = spawnTile();
	}
}

function validSpawn(newTiles) {
	var valid = true;
	for (var i = newTiles.tiles.length - 1; i >= 0; i--) {
		if(board[newTiles.tiles[i].x][newTiles.tiles[i].y]) {
			valid = false;
		}
	}
	return valid	
}

function moveTile(direction) {
	var canMove = true;
	for (var i = droppingTile.tiles.length - 1; i >= 0; i--) {
		var newIndex = {x: 0, y: 0};
		newIndex.x = droppingTile.tiles[i].x + direction;
		newIndex.y = droppingTile.tiles[i].y;
		if(!validIndex(newIndex) || getTileAtIndex(newIndex)) {
			canMove = false;
		}
	}
	if(canMove) {
		for (var i = droppingTile.tiles.length - 1; i >= 0; i--) {
			droppingTile.tiles[i].x += direction;
		}
	}
}

function rotateTile() {
	var canRotate = true;
	var rotatedTile = new Array();
	var rootIndex = {x:0, y:0};
	var index = {x:0, y:0};
	rootIndex.x = droppingTile.tiles[0].x;
	rootIndex.y = droppingTile.tiles[0].y;
	console.log("Trying to rotate Tiles around " + rootIndex.x + "," + rootIndex.y);
	for (var i = droppingTile.tiles.length - 1; i >= 0; i--) {
		index.x = rootIndex.x -(rootIndex.y - droppingTile.tiles[i].y);
		index.y = rootIndex.y + rootIndex.x - droppingTile.tiles[i].x;
		console.log("Testing " + index.x + "," + index.y);
		if(!validIndex(index) || board[index.x][index.y]) {
			console.log("Something can't rotate")
			canRotate = false;
		} 
	}
	if(canRotate) {
		for (var i = droppingTile.tiles.length - 1; i >= 0; i--) {
			index.x = rootIndex.x -(rootIndex.y - droppingTile.tiles[i].y);
			index.y = rootIndex.y + rootIndex.x - droppingTile.tiles[i].x;
			droppingTile.tiles[i].x = index.x;
			droppingTile.tiles[i].y = index.y;
		}
	}

}

function checkForLine() {
	//console.log("checking for line");
	var linesCleared = 0;
	for (var j = 0; j < board[0].length; j++) {
		var lineClear = true;
		for (var i = board.length - 1; i >= 0; i--) {
			if(!board[i][j]) {
				lineClear = false;
			}
		}
		if(lineClear) {
			linesCleared++;
			//console.log("found line clear " + lineClear + " " + j);
			clearLine(j);
			for (var i = board.length - 1; i >= 0; i--) {
				board[i].slice(j);
				board[i].splice(0,0,null);
				//board[i].push(null);
			}
		}
	}
	if(linesCleared > 0) {
		comboCount++;
	} else {
		comboCount = 0;
	}
	score+= linesCleared * linesCleared * (level + 1) * 100 * comboCount;

}

function clearLine(line) {
	for (var i = board.length - 1; i >= 0; i--) {
		board[i].splice(line, 1);
		board[i].splice(board[i].length,0,null);
		//board[i].splice(0,0,null);
		//board[i].push(null);
	}
	for (var j = line; j >= 0; j--) {
		for (var i = board.length - 1; i >= 0; i--) {
			if(board[i][j]) {
				board[i][j].drop();
			}
		}
	}
}

function validIndex(index) {
	if(index.x >= 0 && index.x < numCols &&
		index.y >= 0 && index.y-2 < numRows) {
		return true;
	}
	return false;
}

function getTileAtIndex(index) {
	if(validIndex(index)) {
		return board[index.x][index.y];
	}
	return false;
}

function placeTiles() {
	for (var i = droppingTile.tiles.length - 1; i >= 0; i--) {
		board[droppingTile.tiles[i].x][droppingTile.tiles[i].y] = droppingTile.tiles[i];
	}
}

function spawnTile() {
	var newGroup = new Array();
	var type = Math.floor(Math.random()*7);
	var index = {x:4, y:2};
	switch(type) {
		case 0: //4-line
			newTile = new Tile();
			newTile.init(index,"cyan");
			newGroup.push(newTile)
			index = {x:4, y:1};
			newTile = new Tile();
			newTile.init(index, "cyan");
			newGroup.push(newTile);
			newTile = new Tile();
			index = {x:5, y:2};
			newTile.init(index, "cyan");
			newGroup.push(newTile)
			index = {x:5, y:1};
			newTile = new Tile();
			newTile.init(index, "cyan");
			newGroup.push(newTile);
			break;
		case 1: //square
			newTile = new Tile();
			newTile.init(index, "yellow");
			newGroup.push(newTile)
			index = {x:3, y:2};
			newTile = new Tile();
			newTile.init(index, "yellow");
			newGroup.push(newTile);
			newTile = new Tile();
			index = {x:5, y:2};
			newTile.init(index, "yellow");
			newGroup.push(newTile)
			index = {x:6, y:2};
			newTile = new Tile();
			newTile.init(index, "yellow");
			newGroup.push(newTile);
			break;
		case 2: //Z Piece
			newTile = new Tile();
			newTile.init(index, "red");
			newGroup.push(newTile)
			index = {x:3, y:2};
			newTile = new Tile();
			newTile.init(index, "red");
			newGroup.push(newTile);
			newTile = new Tile();
			index = {x:5, y:1};
			newTile.init(index, "red");
			newGroup.push(newTile)
			index = {x:4, y:1};
			newTile = new Tile();
			newTile.init(index, "red");
			newGroup.push(newTile);
			break;
		case 3: //J Piece
			newTile = new Tile();
			newTile.init(index, "blue");
			newGroup.push(newTile)
			index = {x:3, y:2};
			newTile = new Tile();
			newTile.init(index, "blue");
			newGroup.push(newTile);
			newTile = new Tile();
			index = {x:5, y:2};
			newTile.init(index, "blue");
			newGroup.push(newTile)
			index = {x:3, y:1};
			newTile = new Tile();
			newTile.init(index, "blue");
			newGroup.push(newTile);
			break;
		case 4: //L Piece
			newTile = new Tile();
			newTile.init(index, "orange");
			newGroup.push(newTile)
			index = {x:3, y:2};
			newTile = new Tile();
			newTile.init(index, "orange");
			newGroup.push(newTile);
			newTile = new Tile();
			index = {x:5, y:2};
			newTile.init(index, "orange");
			newGroup.push(newTile)
			index = {x:5, y:1};
			newTile = new Tile();
			newTile.init(index, "orange");
			newGroup.push(newTile);
			break;
		case 5:  //T piece
			newTile = new Tile();
			newTile.init(index, "purple");
			newGroup.push(newTile)
			index = {x:3, y:2};
			newTile = new Tile();
			newTile.init(index, "purple");
			newGroup.push(newTile);
			newTile = new Tile();
			index = {x:5, y:2};
			newTile.init(index, "purple");
			newGroup.push(newTile)
			index = {x:4, y:1};
			newTile = new Tile();
			newTile.init(index, "purple");
			newGroup.push(newTile);
			break;
		case 6: //S Piece
			newTile = new Tile();
			newTile.init(index, "green");
			newGroup.push(newTile)
			index = {x:3, y:1};
			newTile = new Tile();
			newTile.init(index, "green");
			newGroup.push(newTile);
			newTile = new Tile();
			index = {x:5, y:2};
			newTile.init(index, "green");
			newGroup.push(newTile)
			index = {x:4, y:1};
			newTile = new Tile();
			newTile.init(index, "green");
			newGroup.push(newTile);
			break;
	}
	//console.log("Spawning " + type + " Tile");
	var newDroppingTile = {type: type, tiles: newGroup};
	if(validSpawn(newDroppingTile)) {
		return newDroppingTile;
	} else {
		playing = false;
	}
}
