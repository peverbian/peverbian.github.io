var colors = [];

var squares;
var pickColor;
var colorDisplay;
var messageDisplay;
var h1;
var resetButton;
var modeButtons;
var difficulty = 6;

window.onload = function() {
	getElements();
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	setEventListeners();
	updateDisplay();
}

function getElements() {
	colors = generateRandomColors(difficulty);
	squares = document.querySelectorAll(".square");
	colorDisplay = document.getElementById("colorDisplay");
	messageDisplay = document.getElementById("message");
	h1 = document.querySelector("h1");
	resetButton = document.querySelector("#reset");
	modeButtons = document.querySelectorAll(".mode");	
}

function setEventListeners() {
	//set listeners for the mode buttons
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			for (var i = 0; i < modeButtons.length; i++) {
				modeButtons[i].classList.remove("selected");
			}
		this.classList.add("selected");
		this.textContent === "Easy" ? difficulty = 3: difficulty = 6;
		reset();
		});
	}

	//reset button
	resetButton.addEventListener("click", reset);
	
	//set listeners for the squares
	for (var i = squares.length - 1; i >= 0; i--) {
		squares[i].addEventListener("click", function() {
		if(this.style.background === pickedColor) {
			messageDisplay.textContent = "Correct!";
			changeColors(pickedColor);
			h1.style.background = pickedColor;
			resetButton.textContent = "Play Again?";
		} else {
			this.style.background = "#232323";
			messageDisplay.textContent = "Try Again!";
		}
		});
	}
}

//changes all the squares to the picked color.
function changeColors(color) {
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.background = color;
	}
}

function pickColor() {
	//pick a random index in the array
	var random = Math.floor(Math.random() * colors.length);
	//return the color at that index
	return colors[random];
}

function generateRandomColors(num) {
	//make an array
	var array = [];
	//repeat num times.
	for (var i = 0; i < num; i++) {
		//add a new random color
		array.push(randomColor());
	}
	//return the array
	return array;
}

function randomColor() {
	//pick a "red" from 0 - 255;
	//Go through each square and update it's color
	var r = Math.floor(Math.random() * 256);
	//pick a "green" from 0 - 255;
	var g = Math.floor(Math.random() * 256);
	//pick a "blue" from 0 - 255;
	var b = Math.floor(Math.random() * 256);
	//hide it if there is no color/ we are on easy
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

function reset() {
	//generate all new colors
	colors = generateRandomColors(difficulty);
	//pick a new random color
	pickedColor = pickColor();
	//change color display to match.
	colorDisplay.textContent = pickedColor;
	//change color squares
	updateDisplay();
	//reset the H1 and bar
	h1.style.background = "steelblue";
	messageDisplay.textContent = "";
}

function updateDisplay() {
	//Go through each square and update it's color
	for (var i = squares.length - 1; i >= 0; i--) {
		if(colors[i]) {
			squares[i].style.background = colors[i];
			squares[i].style.display = "block";
		} else {
			//hide it if there is no color/ we are on easy
			squares[i].style.display = "none";
		}
	}
}
