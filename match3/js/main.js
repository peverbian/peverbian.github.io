
var canvas;
var ctx;
var width;
var height;
var sequenceCount = 0;
var playing = true;
var board = new gemBoard();
var spriteSheetIndex = 0;
var GEM_H;
var GEM_W;

const LOADING = 0;
const PLAYING = 1;
const ANIMATING = 2;
const END = 3;
const STARTING = 4;

var GAME_STATE = LOADING;


window.onload = function() {
	setupCanvas();
	colorRect(0,0,canvas.width, canvas.height, "black");
	loadImages();
}

function setupCanvas() {
	canvas = document.getElementById('gameCanvas');
	ctx = canvas.getContext('2d');
	width = window.innerWidth;
	height = window.innerHeight;
	GEM_W = 64;
	GEM_H = 64;
	if(width >= 600) {
		width = GEM_W * 5;
		height = GEM_H * 7;
	} else if(width/5 > height/7) {
		width = 5 * height / 7;
	} else {
		height = 7 * width / 5;
	}
	GEM_W = width/5;
	GEM_H = height/7;
	canvas.style.boarder = "1px solid #000";
	canvas.width = width;
	canvas.height = height;
}

function startGame() {
	var framesPerSecond = 30;
	setupInput();
	setupSprites(diceSprites, spriteSheets[0]);
	setupSprites(plainSprites, spriteSheets[1]);
	setupSprites(gemsSprites, spriteSheets[2]);
	gemSprites = diceSprites.slice();;
	board.init();
	setInterval(function() {
				updateEverything();
				drawEverything(); 
			}, 1000/framesPerSecond);
}


function switchSpriteSheets() {
	if(spriteSheetIndex == 0 ) {
		console.log("Switching to Dice.")
		gemSprites = diceSprites.slice();
		spriteSheetIndex = 1;
	} else if(spriteSheetIndex == 1 ) {
		console.log("Switching to Plain.")
		gemSprites = plainSprites.slice();;
		spriteSheetIndex = 2;
	} else {
		console.log("Switching to gems.")
		gemSprites = gemsSprites.slice();;
		spriteSheetIndex = 0;
	}

}

function updateEverything() {
	board.update();
}

function drawEverything() {
	drawBackground();
	board.draw();
	if(playing == false) {
		drawSplash();
	}
}

function drawBackground() {
	colorRect(0,0,canvas.width, canvas.height, 'black');
}
function drawSplash() {
	colorRect(GEM_W,GEM_H,3 * GEM_W, 3 * GEM_H, 'white');
}
