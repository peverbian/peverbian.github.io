
var canvas;
var canvasContext;

var player = new shipClass();
var ufo = new ufoClass();
var paused = false;
window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	colorRect(0,0,canvas.width, canvas.height, "black");
	loadImages();
}

function startGame() {
	var framesPerSecond = 30;
	setInterval(function() {
				updateEverything();
				drawEverything(); 
			}, 1000/framesPerSecond);

	setupInput();
	player.setupInput(KEY_W, KEY_A, KEY_D, KEY_SPACE);
	player.init(shipPic);
	ufo.init(ufoPic);
}

function updateEverything() {
	if(!paused) {
		player.update();
		ufo.update();
	}
}

function drawEverything() {
	drawBackground();
	for (var i = -1; i <= 1; i++) {
		for (var j = -1; j <= 1; j++) {
			canvasContext.translate(canvas.width * i,canvas.height * j);
			player.draw();
			ufo.draw();
			canvasContext.translate(-canvas.width * i,-canvas.height * j);
		}
	}
}

function drawBackground() {
	colorRect(0,0,canvas.width, canvas.height, 'black');
}






