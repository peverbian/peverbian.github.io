//console.log("gem.js");

//const GEM_W = 32;
//const GEM_H = 32;
const RETURN_SPEED = 5;

function gemClass() {
	this.x;
	this.y;
	this.row;
	this.col;
	this.gemPic; // for drawing
	this.sequence; // for determining which one of the 3 grows
	this.value; //what the current value of the gem is
	this.dragging = false;//is the gem being dragged by the mouse?
	this.home = true; //is the gem where it's supposed to be?

	this.init = function(value) {
		this.value = value;
		this.gemPic = gemPics[this.value];
		this.sequence = sequenceCount;
		sequenceCount++;
	}

	this.place = function(atRow, atCol) {
		this.row = atRow;
		this.col = atCol;
		this.x = atRow * GEM_W;
		this.y = atCol * GEM_H;
		console.log("Gem of value " + this.value + " at " + this.x + "," + this.y);
	}

	this.update = function() {
		//document.getElementById("debugText").innerHTML = this.x + "," + this.y;	
		//if the gem is not being dragged, move back.
		if(this.dragging == false && this.home == false) {
			console.log("Moving Back to " + this.row + "," + this.col);
			//move it back
			if(this.x > this.row * GEM_W)  {
				this.x -= RETURN_SPEED;
			}
			if(this.x < this.row * GEM_W)  {
				this.x += RETURN_SPEED;
			}
			if(this.y > this.col * GEM_H)  {
				this.y -= RETURN_SPEED;
			}
			if(this.y < this.col * GEM_H)  {
				this.y += RETURN_SPEED;
			}
			//snap to grid
			if(this.x != this.row * GEM_W && this.x <= (this.row * GEM_W)+RETURN_SPEED && this.x >= (this.row * GEM_W)-RETURN_SPEED)  {
				console.log("Snapping to X");
				this.x = this.row * GEM_W;
			}
			if(this.y != (this.row * GEM_W) && this.y <= (this.row * GEM_W)+RETURN_SPEED && this.y >= (this.row * GEM_W)-RETURN_SPEED)  {
				console.log("Snapping to Y");
				this.y = this.row * GEM_W;
			}
			if(this.x == this.row * GEM_W && this.y == this.row * GEM_W) {
				this.home = true;
			}
		//if(this.x > 0) this.x--;
		//if(this.y > 0) this.y--;
		}
	}

	this.draw = function() {
		drawBitmapStretched(this.gemPic, this.x, this.y, GEM_W, GEM_H);	
	}

	this.drag = function(mousePos) {
		this.x = mousePos.x - GEM_W/2;
		this.y = mousePos.y - GEM_H/2;
		this.dragging = true;
		this.home = false;
	}

	this.release = function() {

		this.dragging = false;
	}
}