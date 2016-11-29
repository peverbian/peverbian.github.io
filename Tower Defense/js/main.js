
var canvas;
var canvasContext;
var then;
var mobs = new Array();
var mobSpawnDelay = 0;
var mobSpawnRate = 2;
var playing = false;
var towers = new Array();
var tiles;
var lives;
var score;
var wave = 0;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	//show Loading Screen
	colorRect(0,0,canvas.width, canvas.height, "white");
	loadImages();
	//startGame();
}

function startGame() {
	playing = true;
	resizeCanvas();
	setupInput();
	setup();
	mainLoop();
}


function mainLoop() {
	var now = Date.now();
	var dt =(now - then)/1000;
	//console.log(dt);
	updateEverything(dt);
	drawEverything();
	then = now;
	requestAnimationFrame(mainLoop);
}

function updateEverything(dt) {
	mobSpawnDelay+=dt;
	tiles.update(dt);
	if(mobSpawnDelay >= mobSpawnRate) {
		mobSpawnDelay=0;
		wave++;
		var newMob = new mobClass();
		newMob.init(tiles.getStart(), tiles.getGoal(),wave);
		mobs.push(newMob);
	}
	for (var i = mobs.length - 1; i >= 0; i--) {
		mobs[i].update(dt);
		if(mobs[i].timeToLive <= 0) {
			mobs.splice(i,1);
		}
	}
	for (var i = towers.length - 1; i >= 0; i--) {
		towers[i].update(dt);
	}
//	console.log("updating")
}

function drawEverything() {
	colorRect(0,0,canvas.width, canvas.height, "#BBBBBB");
	tiles.draw();
	for (var i = mobs.length - 1; i >= 0; i--) {
		mobs[i].draw();
	}
	for (var i = towers.length - 1; i >= 0; i--) {
		towers[i].draw();
	}
}
function setup() {
	tiles = new tileGrid();
	tiles.init(25,17);
	then = Date.now();
	score = 0;
	lives = 20;

}

function resizeCanvas() {
	width = window.innerWidth;
	height = window.innerHeight;
	canvas.style.boarder = "1px solid #000";
}

//return tile XY are on.
function posToTile(pos) {
	var x = Math.floor(pos.x/TILE_SIZE);
	var y = Math.floor(pos.y/TILE_SIZE);
	return [x,y];
}

//returns XY of center of tile.
function tileToPosCenter2d(xy) {
	var x = (xy[0] * TILE_SIZE) + TILE_SIZE/2;
	var y = (xy[1] * TILE_SIZE) + TILE_SIZE/2;
	return new Vector2d(x,y);
}

function tileToPos2d(xy) {
	var x = (xy[0] * TILE_SIZE);
	var y = (xy[1] * TILE_SIZE);
	return new Vector2d(x,y);
}

//returns XY of top-left of tile.
function tileToPos(xy) {
	var x = (xy[0] * TILE_SIZE);
	var y = (xy[1] * TILE_SIZE);
	return [x,y];
}


function spawnTower(pos) {
	var tile = posToTile(pos);
	if(tiles.spawnTower(tile, 2)) {
		var newTower = new towerClass();
	   	newTower.init(tile, 2);
	   	towers.push(newTower);
	   	for (var i = mobs.length - 1; i >= 0; i--) {
	   		mobs[i].recalcWaypoints();
	   	}
	}
}

function mobEscape() {
	lives--;
	updateDiv("health", lives);
}

