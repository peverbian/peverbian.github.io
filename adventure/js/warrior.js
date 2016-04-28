console.log("warrior.js");

const WALK_SPEED = 3;

function carClass() {
	this.x = 0;
	this.y = 0;
	this.carPic; //chich car image to use
	this.carName = "untitled car";
	this.keys = 0;

	this.keyHeld_Up = false;
	this.keyHeld_Down = false;
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
		this.keys = 0;
		for(var j = 0; j < WORLD_ROWS; j++) {
			for(var i = 0; i < WORLD_COLS; i++) {
				if(worldGrid[worldAtColRow(i,j)] == WORLD_PLAYERSTART) {
					worldGrid[worldAtColRow(i,j)] = WORLD_FLOOR; 
					this.x = i * WORLD_W + WORLD_W/2;
					this.y = j * WORLD_H + WORLD_H/2;
					return;
				} // end of player start if
			} // end of col for
		} // end of row for	
	} // end of reset

	this.update = function() {
		if(this.keyHeld_Up == true) {
			this.y -= WALK_SPEED;
		}
		if(this.keyHeld_Down == true) {
			this.y += WALK_SPEED;
		}
		if(this.keyHeld_Right == true) {
			this.x += WALK_SPEED;
		}
		if(this.keyHeld_Left == true) {
			this.x -= WALK_SPEED;
		}
		carWorldHandling(this);
	}

	this.bounce = function() {
		if(this.keyHeld_Up == true) {
			this.y += WALK_SPEED;
		}
		if(this.keyHeld_Down == true) {
			this.y -= WALK_SPEED;
		}
		if(this.keyHeld_Right == true) {
			this.x -= WALK_SPEED;
		}
		if(this.keyHeld_Left == true) {
			this.x += WALK_SPEED;
		}		
	}

	this.draw = function() {
		drawBitmapCenteredWithRotation(this.carPic, this.x, this.y, this.ang);
	}

	this.updateKeys = function() {
		document.getElementById("Keys").innerHTML = "Keys: " + this.keys;	

	}
}