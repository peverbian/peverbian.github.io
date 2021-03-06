console.log("input.js");
const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;

const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;

const KEY_SPACE = 32;
const KEY_ENTER = 13;
const KEY_0 = 48;
const KEY_1 = 49;
const KEY_2 = 50;
const KEY_3 = 51;
const KEY_4 = 52;
const KEY_5 = 53;
const KEY_6 = 54;
const KEY_7 = 55;
const KEY_8 = 56;
const KEY_9 = 57;

function setupInput() {
	canvas.addEventListener('mousemove', function(evt) { });
	canvas.addEventListener('mousedown', function(evt) { });
	document.addEventListener('keydown', keyPressed );
	document.addEventListener('keyup', keyReleased );
}

function keySet(evt, whichCar, setTo) {
	if(evt.keyCode == whichCar.controlKeyUp) {
		whichCar.keyHeld_Up = setTo;
	}
	if(evt.keyCode == whichCar.controlKeyDown) {
		whichCar.keyHeld_Down = setTo;
	}
	if(evt.keyCode == whichCar.controlKeyLeft) {
		whichCar.keyHeld_Left = setTo;
	}
	if(evt.keyCode == whichCar.controlKeyRight) {
		whichCar.keyHeld_Right = setTo;
	}

}

function keyPressed(evt) {
	keySet(evt, blueCar, true);
	evt.preventDefault();
}

function keyReleased(evt) {
	keySet(evt, blueCar, false);
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

