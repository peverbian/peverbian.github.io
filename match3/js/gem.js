
function gemClass() {
	this.x; //x coordinate on the screen.
	this.y; //y coordinate on the screen.
	this.row; //which row is home
	this.col; // whick column is home.
	this.sequence; // for determining which one of the 3 grows
	this.value; //what the current value of the gem is
	this.dragging = false;//is the gem being dragged by the mouse?
	this.home = true; //is the gem where it's supposed to be?
	this.returnSpeed = 1; //how fast is the gem returning to home
	this.highlighted; //used to highlight a gem as the primary in a pair.

	//initialize a new gem to a given value
	this.init = function(value) {
		this.value = value;
		this.sequence = sequenceCount;
		sequenceCount++;
		this.highlighted = false;
	}

	//place a gem in a location.  index is a row and column, x and y are calculated from there based on gem size.
	this.place = function(index) {
		this.row = index.x;
		this.col = index.y;
		this.x = index.x * GEM_W;
		this.y = index.y * GEM_H;
	}

	//returns the x,y in the center of the gem.
	//used to test which index is below the gem.
	this.getIndex = function() {
		var index = {x:0, y:0};
		index.x = Math.floor((this.x/GEM_W)+0.5); 
		index.y = Math.floor((this.y/GEM_H)+0.5);
		return index;
	}

	//return the value of the gem
	this.getValue = function() {
		return this.value;
	}

	//returns the current x,y pair of the gem
	this.getPos = function() {
		var gemPos = {x:0, y:0};
		gemPos.x = this.x;
		gemPos.y = this.y;
		
	}

	//tells the gem to move to a given row/column
	this.moveTo = function(atRow, atCol) {
		this.home = false;
		this.row = atRow;
		this.col = atCol;
	}
	
	//if the gem is loose, it moves back to its home.
	this.update = function() {
		//if the gem is not being dragged, move back.
		if(this.dragging == false && this.home == false) {
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
				this.x = this.row * GEM_W;
			}
			if(this.y != (this.col * GEM_H) && this.y <= (this.col * GEM_H)+this.returnSpeed && this.y >= (this.col * GEM_H)-this.returnSpeed)  {
				this.y = this.col * GEM_H;
			}

			//get faster each step
			this.returnSpeed *= 1.4;

			//stop it moving if it's at home.
			if(this.atHome()) {
				this.returnSpeed = 1;
				this.home = true;
			}
		}
	}

	//draw the gem
	this.draw = function() {
		if(this.highlighted == true) {
			console.log("Drawing highlighted")
			colorRect(this.x, this.y, GEM_W, GEM_H, "yellow");
		}
		gemSprites[this.value-1].drawStretched(this.x, this.y, GEM_W, GEM_H);	
	}

	//highlight the gem if it's one of a pair.
	this.highlight = function() {
		this.highlighted = true;
	}

	//unhighlight the gem if it's one of a pair.
	this.unhighlight = function() {
		this.highlighted = false;
	}

	//is the gem at it's correct x,y for col/row
	this.atHome = function() {
		return (this.x == this.row * GEM_W && this.y == this.col * GEM_W)
	}

	//move the gem around using the mouse/touch.
	this.drag = function(mousePos) {
		this.x = mousePos.x;
		this.y = mousePos.y;
		this.dragging = true;
		this.home = false;
	}

	//let the gem go home if it's not able to be placed.
	this.release = function() {
		this.dragging = false;
	}

	//snaps the gem back home.
	this.reset = function() {
		this.x = this.row * GEM_W;
		this.y = this.col * GEM_H;
	}
}