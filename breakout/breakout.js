console.log("Hello")
var canvas;
var canvasContext;
var ballX = 300;
var ballY = 500;
var ballSize = 5; 
var ballXSpeed = 0;
var ballYSpeed = -8;
var reset = true;

var paddle1X = 250;
const PaddleDistFromBottom = 50;
const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 5;


const BRICK_W = 80;
const BRICK_H = 20;
const BRICK_ROWS = 10;
const BRICK_COLS = 10;
const BRICK_GAP = 2;
var brickGrid = new Array(BRICK_COLS);
var ballBrickCol = 0;
var ballBrickRow = 0;
var bricksLeft = 0;

var score = 0;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	initBricks();
	var framesPerSecond = 30;
	setInterval(function() {
				moveEverything();
				drawEverything(); 
			}, 1000/framesPerSecond);

	canvas.addEventListener('mousemove', 
		function(evt) { var mousePos = calculateMousePos(evt); paddle1X = mousePos.x - PADDLE_WIDTH/2;});
	canvas.addEventListener('mousedown', 
		function(evt) {
					if(reset) {
						var deltaX = canvas.width/2 - paddle1X - PADDLE_WIDTH/2;
						ballXSpeed = deltaX*.01;
						reset = false;
					}
					});
}

function initBricks() {
	bricksLeft = 0;
	ballYSpeed++;
	for(var i = 0; i<BRICK_COLS; i++) {
		brickGrid[i] = new Array(BRICK_ROWS);
		var j = 0;
		for(j=0; j<3; j++) {
			brickGrid[i][j] = false;
		} // end gutter
		for(; j<BRICK_ROWS; j++) {
			brickGrid[i][j] = true;
			bricksLeft++;
		} // end bricks
	} //end columns
} // end init

function moveEverything() {
	updateBall();
}

function ballReset() {
	reset = true;
}

function updateBall() {
	moveBall();
	ballBrickCollision();
	ballPaddleCollision();
}

function moveBall() {
	ballX += ballXSpeed;
	ballY += ballYSpeed;
	if(ballX < 0) {
		ballXSpeed *= -1;
	}
	if(ballX > canvas.width - ballSize) {
		ballXSpeed *= -1;
	}
	if(ballY < 0) {
		ballYSpeed *= -1;
	}
	if(ballY > canvas.height) {
		ballYSpeed *= -1;
		ballReset();
	}
	if(reset) {
		ballX = paddle1X + PADDLE_WIDTH/2;
		ballY = canvas.height - PaddleDistFromBottom - PADDLE_HEIGHT- ballSize;
	}
}

function ballPaddleCollision() {
	var PaddleTop = canvas.height - PaddleDistFromBottom - PADDLE_HEIGHT;
	var PaddleBottom = canvas.height - PaddleDistFromBottom;
	var PaddleLeft = paddle1X;
	var PaddleRight = paddle1X + PADDLE_WIDTH;
	//check for collision with paddle
	if( ballY + ballSize > PaddleTop  && 
		ballY - ballSize < PaddleBottom &&
		ballX - ballSize > PaddleLeft &&
		ballX + ballSize < PaddleRight) {
		ballYSpeed *= -1;
		var PaddleCenter = paddle1X + (PADDLE_WIDTH/2);
		var deltaX = ballX - PaddleCenter;
		ballXSpeed += deltaX*.15;
		console.log(bricksLeft);
		if(bricksLeft == 0) {
			initBricks();
		}
		//score ++;
	}
}

function ballBrickCollision() {
	//check for brick
	ballBrickCol = Math.floor(ballX/BRICK_W);
	ballBrickRow = Math.floor(ballY/BRICK_H);

	prevballX = ballX - ballXSpeed;
	prevballY = ballY - ballYSpeed;

	prevBrickCol = Math.floor(prevballX/BRICK_W);
	prevBrickRow = Math.floor(prevballY/BRICK_H);

	if(ballBrickCol >=0 && ballBrickCol < BRICK_COLS &&
		ballBrickRow >=0 && ballBrickRow < BRICK_ROWS) {
		if(brickGrid[ballBrickCol][ballBrickRow] == true) {
			var failedBoth = true;
			if(prevBrickCol != ballBrickCol && brickGrid[ballBrickCol][prevBrickRow] != false) {
				ballXSpeed *= -1;
				failedBoth = false;
			}	
			if(prevBrickRow != ballBrickRow && brickGrid[prevBrickCol][ballBrickRow] != false) {
				ballYSpeed *= -1;
				failedBoth = false;
			}
			if(failedBoth) {
				ballXSpeed *= -1;
				ballYSpeed *= -1;
			}
			bricksLeft--;
			brickGrid[ballBrickCol][ballBrickRow] = false;
			score++;
		}	
	}
}

function drawEverything() {
	drawBackground();
	drawBricks();
	drawPaddle();
	drawBall();
	drawScore();
//	drawDebug();
}

function drawPaddle() {
	colorRect(paddle1X,canvas.height - PaddleDistFromBottom - PADDLE_HEIGHT,PADDLE_WIDTH, PADDLE_HEIGHT, 'white');

}

function drawDebug() {
	canvasContext.fillStyle = 'yellow';
	canvasContext.fillText("Ball X Speed = " + ballXSpeed, 200, 200);
	canvasContext.fillText("Ball Y Speed = " + ballYSpeed, 200, 220);
	canvasContext.fillText("Ball X = " + ballX, 200, 240);
	canvasContext.fillText("Ball Y = " + ballY, 200, 260);
	canvasContext.fillText("Ball column = " + ballBrickCol, 200, 280);
	canvasContext.fillText("Ball row = " + ballBrickRow, 200, 300);
}

function drawScore() {
	canvasContext.fillStyle = 'white';
	canvasContext.fillText(score, canvas.width/2, canvas.height - 250);
}

function drawBackground() {
	colorRect(0,0,canvas.width, canvas.height, 'black');
	colorRect(0,0,canvas.width, canvas.height, 'black');
}

function drawBricks() {
	for(var j = 0; j < BRICK_ROWS; j++) {
		for(var i = 0; i < BRICK_COLS; i++) {
			if(brickGrid[i][j] == true) { 
				colorRect(BRICK_W*i + BRICK_GAP/2, BRICK_H*j + BRICK_GAP/2, BRICK_W - BRICK_GAP/2, BRICK_H-BRICK_GAP/2, 'blue');
			} 
		}
	}
}

function drawBall() {
	canvasContext.fillStyle = 'red';
	canvasContext.beginPath();
	canvasContext.arc(ballX, ballY, ballSize, 0, 2*Math.PI, true);
	canvasContext.fill();
}

function colorRect(x, y, width, height, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(x, y, width, height);
}

function calculateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x:mouseX,
		y:mouseY
	};
}