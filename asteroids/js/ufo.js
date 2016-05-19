const UFO_DELAY = 60;

function ufoClass() {
	this.x = 0;
	this.y = 0;
	this.dx = 0;
	this.dy = 0;
	this.speed = 0;
	this.ang = 0; 
	this.delay = 0;
	this.ufoPic; //chich ufo image to use

	this.init = function(whichImage) {
		this.ufoPic = whichImage;
		this.x = Math.random()*canvas.width;
		this.y = Math.random()*canvas.width;
		this.ang = -Math.PI/2
		this.speed = 5;
	} // end of reset

	this.update = function() {
		this.delay++;
		if(this.delay >= UFO_DELAY) {
			this.delay = 0;
			this.ang = Math.random() * 2 * Math.PI;
			this.dx = Math.cos(this.ang) * this.speed;
			this.dy = Math.sin(this.ang) * this.speed;
		}
		this.move();
	}

	this.move = function() {
		this.x += this.dx;
		this.y += this.dy;
		this.handleWrap();
	}

	this.handleWrap = function() {
		if(this.x < 0) this.x += canvas.width;
		if(this.x > canvas.width) this.x -= canvas.width;
		if(this.y < 0) this.y += canvas.height;
		if(this.y > canvas.height) this.y -= canvas.height;
	}

	this.draw = function() {
		drawBitmapCenteredWithRotation(this.ufoPic, this.x, this.y, this.ang);
	}
}