//console.log("gem.js");

const GEM_W = 32;
const GEM_H = 32;

function gemClass() {
	this.x;
	this.y;
	this.gemPic; // for drawing
	this.sequence; // for determining which one of the 3 grows
	this.value; //what the current value of the gem is

	this.init = function(value) {
		this.value = value;
		this.gemPic = gemPics[this.value-1];
		this.sequence = sequenceCount;
		sequenceCount++;
	}

	this.place = function(atX, atY) {
		this.x = atX;
		this.y = atY;
	}

	this.update = function() {
	}

	this.draw = function() {
		drawBitmap(this.gemPic, this.x * GEM_W, this.y * GEM_H);	
	}
}