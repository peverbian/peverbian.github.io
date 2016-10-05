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

var mousePressed = false;
function setupInput() {
	document.addEventListener('keydown', keyPressed );
	document.addEventListener('keyup', keyReleased );
}

function keySet(evt, mob, setTo) {

}

function keyPressed(evt) {
	evt.preventDefault();
	if(playing) {
		if(evt.keyCode == KEY_RIGHT) {
			moveTile(1);
		}
		if(evt.keyCode == KEY_LEFT) {
			moveTile(-1);
		}
		if(evt.keyCode == KEY_DOWN) {
			dropTile();
		}
		if(evt.keyCode == KEY_UP) {
			rotateTile();
		}
	} else {
		if(evt.keyCode == KEY_SPACE) {
			resetGame();
		}
	}
}

function keyReleased(evt) {
}

