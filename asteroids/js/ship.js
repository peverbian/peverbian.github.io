
const SPEED_DECAY_MULT = 0.99999;
const TURN_RATE = 0.05;
const THRUST_POWER = .15;



function shipClass() {
	this.x = 0;
	this.y = 0;
	this.dx = 0; //our horizontal inertia
	this.dy = 0; //our vertical inertia
	this.ang = 0; //where we're pointed
	this.pic; //chich car image to use
	this.reload; //how often we can shoot

	this.keyHeld_Thrust = false;
	this.keyHeld_Shoot = false;
	this.keyHeld_Right = false;
	this.keyHeld_Left = false;

	this.controlKeyUp;
	this.controlKeyRight;
	this.controlKeyLeft;
	this.controlKeyShoot;

	this.myShot = new shotClass();

	this.setupInput = function(upKey, rightKey, leftKey, shootKey) {
		this.controlKeyUp = upKey;
		this.controlKeyRight = rightKey;
		this.controlKeyLeft = leftKey;
		this.controlKeyShoot = shootKey;
	}

	this.init = function(whichImage) {
		this.pic = whichImage;
		this.x = canvas.width/2;
		this.y = canvas.height/2;
		this.ang = -Math.PI/2
	} // end of reset

	this.update = function() {
		if(this.keyHeld_Thrust == true) {
			console.log("Vroom!");
			this.dx += Math.cos(this.ang) * THRUST_POWER;
			this.dy += Math.sin(this.ang) * THRUST_POWER;
			//this.trimSpeed();
		}
		if(this.keyHeld_Right == true) {
			this.ang -= TURN_RATE;
		}
		if(this.keyHeld_Left == true) {
			this.ang += TURN_RATE;
		}
		this.move();
		this.myShot.update();
	}

	this.fireCannon = function() {
		this.myShot.shootFrom(this);
	}

	this.trimSpeed = function() {
		if((this.dx*this.dx) + (this.dy*this.dy) > this.maxSpeed*this.maxSpeed) {
			var hypoteneuse2 = (this.dx*this.dx) + (this.dy*this.dy);
			var speedAng = Math.atan();
		}
	}

	this.move = function() {
		this.dx *= SPEED_DECAY_MULT;
		this.dy *= SPEED_DECAY_MULT;
		this.x += this.dx;
		this.y += this.dy;
		this.handleWrap();
	}

	this.handleWrap = function() {
		if(this.x < 0) this.x += canvas.width;
		if(this.x > canvas.width) this.x -= canvas.width;
		if(this.y < 0) this.y += canvas.height;
		if(this.y > canvas.width) this.y -= canvas.height;
	}

	this.draw = function() {
		drawBitmapCenteredWithRotation(this.pic, this.x, this.y, this.ang);
		this.myShot.draw();
	}
}