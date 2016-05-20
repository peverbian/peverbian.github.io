
const SHOT_SPEED = 6;
const SHOT_LIFE = 50;
const SHOT_RADIUS = 2;



function shotClass() {
	this.x = 0;
	this.y = 0;
	this.dx = 0; //our horizontal inertia
	this.dy = 0; //our vertical inertia
	this.ang = 0; //where we're pointed
	this.shotLife = 0; //how long our shot has to live.

	this.reset = function() {
		this.shotLife = 0; //kill the shot.
	}

	this.shootFrom = function(shipFiring) {
		//shot comes from the ship.
		this.x = shipFiring.x;
		this.y = shipFiring.y;
		this.ang = shipFiring.ang;

		//keep the shot still for now.
		this.dx = shipFiring.dx + (Math.cos(this.ang) * SHOT_SPEED);
		this.dy = shipFiring.dy + (Math.sin(this.ang) * SHOT_SPEED);

		//let the shot live
		this.shotLife = SHOT_LIFE;
	}

	this.update = function() {
		if(this.shotLife > 0) {
			this.move();
			this.shotLife--;
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
		if(this.shotLife > 0) {
			colorCircle(this.x, this.y, SHOT_RADIUS, "red");
		}
	}
}