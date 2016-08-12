//console.log("gem.js");

//const GEM_W = 32;
//const GEM_H = 32;

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
	this.returnSpeed = 1;

	this.init = function(value) {
		this.value = value;
		this.gemPic = gemSprites[value-1];
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

	this.moveTo = function(atRow, atCol) {
		this.home = false;
		this.row = atRow;
		this.col = atCol;
	}

	this.update = function() {
		//document.getElementById("debugText").innerHTML = this.x + "," + this.y;	
		//if the gem is not being dragged, move back.
		if(this.dragging == false && this.home == false) {
			console.log("Moving Back to " + (this.row * GEM_W) + "," + (this.col * GEM_H) + " from " + this.x + "," + this.y);
			//move it back
			if(this.x > this.row * GEM_W)  {
				this.x -= this.returnSpeed;;
			}
			if(this.x < this.row * GEM_W)  {
				this.x += this.returnSpeed;;
			}
			if(this.y > this.col * GEM_H)  {
				this.y -= this.returnSpeed;;
			}
			if(this.y < this.col * GEM_H)  {
				this.y += this.returnSpeed;;
			}
			//snap to grid
			if(this.x != this.row * GEM_W && this.x <= (this.row * GEM_W)+this.returnSpeed && this.x >= (this.row * GEM_W)-this.returnSpeed)  {
				console.log("Snapping to X");
				this.x = this.row * GEM_W;
			}
			if(this.y != (this.col * GEM_H) && this.y <= (this.col * GEM_H)+this.returnSpeed && this.y >= (this.col * GEM_H)-this.returnSpeed)  {
				console.log("Snapping to Y");
				this.y = this.col * GEM_H;
			}
			this.returnSpeed *= 1.4;
			if(this.atHome()) {
				this.returnSpeed = 1;
				this.home = true;
			}
		}
	}

	this.draw = function() {
		gemSprites[this.value-1].drawStretched(this.x, this.y, GEM_W, GEM_H);	
	}

	this.atHome = function() {
		return (this.x == this.row * GEM_W && this.y == this.col * GEM_W)
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