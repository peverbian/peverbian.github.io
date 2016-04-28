
var canvas;
var canvasContext;

var blueCar = new carClass();

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
	blueCar.setupInput(KEY_W, KEY_D, KEY_S, KEY_A)
	loadNextLevel();

}


function updateEverything() {
	blueCar.update();
}



function drawEverything() {
	//drawBackground();
	drawWorld();
	blueCar.draw();
}

function drawBackground() {
	colorRect(0,0,canvas.width, canvas.height, 'black');
	colorRect(0,0,canvas.width, canvas.height, 'black');
}






