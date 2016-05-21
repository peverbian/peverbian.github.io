
var canvas;
var ctx;
var width;
var height;
var sequenceCount = 0;
var playing = true;
var board = new gemBoard();

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

	if(width >= 600) {
		width = 320;
		height = 448;
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
	board.init();
	setInterval(function() {
				updateEverything();
				drawEverything(); 
			}, 1000/framesPerSecond);
}

function spawnGem(mousePos) {

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
