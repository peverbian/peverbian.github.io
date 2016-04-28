
const SPEED_DECAY_MULT = 0.94;
const TURN_RATE = 0.05;
const REVERSE_POWER = 0.2;
const DRIVE_POWER = 0.5
const MIN_SPEED_TO_TURN = 0.5;


function carClass() {
	this.x = 0;
	this.y = 0;
	this.speed = 0;
	this.ang = 0; 
	this.carPic; //chich car image to use
	this.carName = "untitled car";

	this.keyHeld_Gas = false;
	this.keyHeld_Reverse = false;
	this.keyHeld_Right = false;
	this.keyHeld_Left = false;

	this.controlKeyUp;
	this.controlKeyRight;
	this.controlKeyDown;
	this.controlKeyLeft;

	this.setupInput = function(upKey, rightKey, downKey, leftKey) {
		this.controlKeyUp = upKey;
		this.controlKeyRight = rightKey;
		this.controlKeyDown = downKey;
		this.controlKeyLeft = leftKey;
	}

	this.reset = function(whichImage, name) {
		this.carPic = whichImage;
		this.carName = name;
		for(var j = 0; j < TRACK_ROWS; j++) {
			for(var i = 0; i < TRACK_COLS; i++) {
				if(trackGrid[trackAtColRow(i,j)] == TRACK_PLAYERSTART) {
					trackGrid[trackAtColRow(i,j)] = TRACK_ROAD; 
					this.x = i * TRACK_W + TRACK_W/2;
					this.y = j * TRACK_H + TRACK_H/2;
					this.ang = -Math.PI/2
					this.speed = 0;
					return;
				} // end of player start if
			} // end of col for
		} // end of row for	
		console.log("No Player Start Found!");
	} // end of reset

	this.update = function() {
		this.speed *= SPEED_DECAY_MULT;
		if(this.keyHeld_Gas == true) {
			this.speed += DRIVE_POWER;
		}
		if(this.keyHeld_Reverse == true) {
			this.speed -= REVERSE_POWER;
		}
		if(Math.abs(this.speed) > MIN_SPEED_TO_TURN) {
			if(this.keyHeld_Right == true) {
				this.ang += TURN_RATE;
			}
			if(this.keyHeld_Left == true) {
				this.ang -= TURN_RATE;
			}
		}
		this.move();
		carTrackHandling(this);
	}

	this.bounce = function() {
		this.x -= Math.cos(this.ang) * this.speed;
		this.y -= Math.sin(this.ang) * this.speed;
		this.speed *= -0.4;

	}

	this.move = function() {
		this.x += Math.cos(this.ang) * this.speed;
		this.y += Math.sin(this.ang) * this.speed;
	}

	this.draw = function() {
		drawBitmapCenteredWithRotation(this.carPic, this.x, this.y, this.ang);
	}
}