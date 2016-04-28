
var canvas;
var canvasContext;
var timeBetweenSpawns = 10;
var sequenceCount = 0;
var playing = true;
var board = new gemBoard();

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	colorRect(0,0,canvas.width, canvas.height, "black");
	loadImages();

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
