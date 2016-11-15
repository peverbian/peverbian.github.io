//console.log("input.js");
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

var mouseDragging = false;
var ongoingTouches = new Array();

function setupInput() {
	canvas.addEventListener('mousemove', handleMouseMove );
	canvas.addEventListener('mousedown', handleMouseDown );
	canvas.addEventListener('mouseup', handleMouseUp ); 
	canvas.addEventListener('touchmove', handleTouchMove );
	canvas.addEventListener('touchstart', handleTouchStart );
	canvas.addEventListener('touchend', handleTouchUp );
	canvas.addEventListener('touchcancel', handleTouchCancel);
	document.addEventListener('keydown', keyPressed );
	document.addEventListener('keyup', keyReleased );
	console.log("Initializing input");
}

function keySet(evt, mob, setTo) { 
}

function keyPressed(evt) {
	if(evt.keyCode == KEY_SPACE) {
	var now = Date.now();
	var dt =(now - then)/1000;
	then = now;
	}
	if(evt.keyCode == KEY_W) {
	}
	if(evt.keyCode == KEY_ENTER && playing == true) {
	}
	evt.preventDefault();
}

function handleMouseMove(evt) {
	//evt.preventDefault();
	var mousePos = calculateMousePos(evt);
	drag(mousePos);
}

function handleMouseDown(evt) {
	//evt.preventDefault();
	var mousePos = calculateMousePos(evt);
	startDrag(mousePos);
}

function handleMouseUp(evt) {
	//evt.preventDefault();
	var mousePos = calculateMousePos(evt);
	endDrag(mousePos);
}

function handleTouchMove(evt) {
	evt.preventDefault();
	var touch = evt.changedTouches[0];
	var mousePos = calculateTouchPos(touch);
	drag(mousePos);
}

function handleTouchStart(evt) {
	evt.preventDefault();
	console.log("touchstart");
	//var touch = evt.changedTouches[0];
	var touch = evt.changedTouches[0];
	var mousePos = calculateTouchPos(touch);
	if(playing == true) {
		startDrag(mousePos);
	}	
}

function handleTouchUp(evt) {
	//evt.preventDefault();
	console.log("touchend");
	var touch = evt.changedTouches[0];
	var mousePos = calculateTouchPos(touch);
	endDrag(mousePos)
}

function handleTouchCancel(evt) {
	console.log("touchend");
	var touch = evt.changedTouches[0];
	var mousePos = calculateTouchPos(touch);
	endDrag(mousePos)
}

function drag(mousePos) {
	if(mouseDragging == true) {
	}
}

function startDrag(mousePos) {
	if(mousePos.x > 0 && mousePos.x < canvas.width &&
		mousePos.y > 0 && mousePos.y < canvas.height) {
	   	mouseDragging = true;
	    spawnTower(mousePos);	
	}
}

function endDrag(mousePos) {
	if(mouseDragging == true) {
		mouseDragging = false;
	}
	if(playing == false) {
		reset();
		playing = true;
	}
}

function keyReleased(evt) {
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
function calculateTouchPos(evt) {
//	var rect = canvas.getBoundingClientRect();
//	var root = document.documentElement;
	var mouseX = evt.pageX;// - rect.left - root.scrollLeft;
	var mouseY = evt.pageY;// - rect.top - root.scrollTop;
	return {
		x:mouseX,
		y:mouseY
	};
}

