
var canvas;
var canvasContext;

var blueCar = new carClass();
var greenCar = new carClass();

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
	loadLevel(levelOne);

	blueCar.setupInput(KEY_UP, KEY_RIGHT, KEY_DOWN, KEY_LEFT)
	greenCar.setupInput(KEY_W, KEY_D, KEY_S, KEY_A)

}

function loadLevel(whichLevel) {
	trackGrid = whichLevel.slice(); // slice copies arrays
	blueCar.reset(car1Pic, "Bluer");
	greenCar.reset(car2Pic, "Greeny");
}

function updateEverything() {
	blueCar.update();
	greenCar.update();
}



function drawEverything() {
	//drawBackground();
	drawTrack();
	blueCar.draw();
	greenCar.draw();
}

function drawBackground() {
	colorRect(0,0,canvas.width, canvas.height, 'black');
	colorRect(0,0,canvas.width, canvas.height, 'black');
}






