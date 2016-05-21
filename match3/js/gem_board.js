
var valuesArray = [1,1,1,1,2,2,2,2,3,3,3,4,4,5,5,6,6];  //used to control the frequency of each value.
var text = "";
function gemBoard() {
	this.gemArray = [];
	this.x = 0;
	this.y = 0
	this.nextValue = 1;
	this.nextGem = new gemClass();
	this.score = 0;
	this.combination = [];


	this.init = function() {
		this.gemArray.length = 5;
		for(var i = 0; i < this.gemArray.length; i++) {
			this.gemArray[i] = [];
			this.gemArray[i].length = 5;
		}
		this.nextGem.init(1);
		this.nextGem.place(2, 5);
		this.reset();
	}

	this.update = function() {
/*		for(var index = 0; index < this.gemArray.length; index++) {
			if(this.gemArray[index] != undefined) {
				this.gemArray[index].update();
			}
		}*/
		if(this.boardFull() == false && playing == true) {
			this.checkBoard();
		} else {
			playing = false;
		}
		this.nextGem.update();
	}

	//draw the board and all gems to the screen.
	this.draw = function() {
//		canvasContext.translate(this.x,this.y);
		//draw the background
		for(var i = 0; i < this.gemArray.length; i++) {
			for(var j = 0; j < this.gemArray[i].length; j++) {
				colorRect(i*GEM_W+1, j*GEM_H+1, GEM_W-2, GEM_H-2, "yellow");		
			}
		}
		//draw the gems
		for(var i = 0; i < this.gemArray.length; i++) {
			for(var j = 0; j < this.gemArray[i].length; j++) {
				if(this.gemArray[i][j] != null) {
					this.gemArray[i][j].draw();
				}
			}
		}
		this.nextGem.draw();
//		canvasContext.translate(-this.x,-this.y);	
		this.drawScore();
	}

	this.drawScore = function() {
	ctx.font="20px Georgia";
	ctx.fillText("Score: " + this.score,10, GEM_H * 5.5);
	}
	//checks if the board is full.
	this.boardFull = function() {
		var full = true;
		for(var i = 0; i < this.gemArray.length; i++) {
			for(var j = 0; j < this.gemArray[i].length; j++) {
				if(this.gemArray[i][j] == null) {
					full = false;
				}
			}
		}
		return full;
	}

	//resets the board after a deadlock
	this.reset = function() {
		this.nextValue = 1;
		this.score = 0;
		this.nextGem.init(1);
		for(var i = 0; i < this.gemArray.length; i++) {
			for(var j = 0; j < this.gemArray[i].length; j++) {
				this.gemArray[i][j] = null;		
			}
		}
	}

	//check if there's a match of 3 - found by the middle one and returned.
	this.checkBoard = function() {
		var value = 0;
		var count = 0;
		for(var i = 0; i < this.gemArray.length; i++) {
			for(var j = 0; j < this.gemArray[i].length; j++) {
				count = 0;
				if(this.gemArray[i][j] != null) {
					if(i > 0) {
						if(this.gemArray[i-1][j] != null) {
							if(this.gemArray[i-1][j].value == this.gemArray[i][j].value) {
								count++
							}
						}
					}
					if(i < this.gemArray.length-1) {
						if(this.gemArray[i+1][j] != null) {
							if(this.gemArray[i+1][j].value == this.gemArray[i][j].value) {
								count++
							}
						}
					}
					if(j > 0) {
						if(this.gemArray[i][j-1] != null) {
							if(this.gemArray[i][j-1].value == this.gemArray[i][j].value) {
								count++
							}
						}
					}
					if(j < this.gemArray[i].length-1) {
						if(this.gemArray[i][j+1] != null) {
							if(this.gemArray[i][j+1].value == this.gemArray[i][j].value) {
								count++
							}
						}
					}
				}
				if(count >= 2) {
					this.combineGems(i,j);
				}
			}
		}
		return -1;
	}

	//combine all the gems that are connected to the given index
	this.combineGems = function(x,y) {
		this.clearCombination();
		this.combination.push({x: x, y: y});
		var rootIndex;
		var matchValue = this.gemArray[x][y].value;
		var combinedAll = false;
		var tempIndex = {x: 0, y: 0};
		var combinationIndex = 1;
		//getcombination
		while(combinedAll == false) {
			//go through the combination and get neighbors that match
			combinedAll = true;
			var length = this.combination.length;
			for(var i = 0; i < length; i++) {
				//check right for a match
				tempIndex.x = this.combination[i].x + 1;
				tempIndex.y = this.combination[i].y;
				if(this.checkIndex(matchValue, tempIndex) == true) {
					this.combination[combinationIndex] = {x: 0, y: 0};
					this.combination[combinationIndex].x = tempIndex.x;
					this.combination[combinationIndex].y = tempIndex.y;
					combinationIndex++;
					combinedAll = false;
				}

				//check left for a match
				tempIndex.x = this.combination[i].x - 1;
				tempIndex.y = this.combination[i].y;
				if(this.checkIndex(matchValue, tempIndex) == true) {
					this.combination[combinationIndex] = {x: 0, y: 0};
					this.combination[combinationIndex].x = tempIndex.x;
					this.combination[combinationIndex].y = tempIndex.y;
					combinationIndex++;
					combinedAll = false;
				}

				//check up for a match
				tempIndex.x = this.combination[i].x;
				tempIndex.y = this.combination[i].y - 1;
				if(this.checkIndex(matchValue, tempIndex) == true) {
					this.combination[combinationIndex] = {x: 0, y: 0};
					this.combination[combinationIndex].x = tempIndex.x;
					this.combination[combinationIndex].y = tempIndex.y;
					combinationIndex++;
					combinedAll = false;
				}
				
				
				//check down for a match
				tempIndex.x = this.combination[i].x;
				tempIndex.y = this.combination[i].y + 1;
				if(this.checkIndex(matchValue, tempIndex) == true) {
					this.combination[combinationIndex] = {x: 0, y: 0};
					this.combination[combinationIndex].x = tempIndex.x;
					this.combination[combinationIndex].y = tempIndex.y;
					combinationIndex++;
					combinedAll = false;
				}
				
			}
		} //end get combination

		//get the newest gem to upgrade;
		rootIndex = this.getRoot();

		//delete the extra gems
		for(var i = 0; i < this.combination.length; i++) {
			this.score += this.gemArray[this.combination[i].x][this.combination[i].y].value;
			delete this.gemArray[this.combination[i].x][this.combination[i].y];
		}

		//if were matching max values, blow up 3x3 on the root
		if(matchValue >= 6) {
			this.blowUp(rootIndex);
		} else { 
			//make a new gem at the root with value+1
			this.gemArray[rootIndex.x][rootIndex.y] = new gemClass();
			this.gemArray[rootIndex.x][rootIndex.y].init(matchValue+1);
			this.gemArray[rootIndex.x][rootIndex.y].place(rootIndex.x, rootIndex.y);
		}
		//update score
	}

	//get the most recent gem in the combination of gems
	this.getRoot = function() {
		var rIndex = {x:0, y:0};
		rIndex.x = this.combination[0].x;
		rIndex.y = this.combination[0].y;
		for(var i = 1; i < this.combination.length; i++) {
			if(this.gemArray[this.combination[i].x][this.combination[i].y].sequence >= this.gemArray[rIndex.x][rIndex.y].sequence) {
				rIndex.x = this.combination[i].x;
				rIndex.y = this.combination[i].y;
			}
		}
		return rIndex;	
	}

	//check if the given index is already part of the match
	this.isIndexInCombination = function(index) {
		//check if index is already in the combination
		for(var j = 0; j < this.combination.length; j++) {
			if(this.combination[j].x == index.x && this.combination[j].y == index.y) {
				return true;
			}
		}
		return false;
	}

	//check if the given index is in bounds and matches the value
	this.checkIndex = function(value, index) {
		if(index.x >= 0 && 
		   index.x < this.gemArray.length &&
		   index.y >= 0 && 
		   index.y < this.gemArray[0].length &&
		   this.isIndexInCombination(index) == false) {
			if(this.gemArray[index.x][index.y] != null) {
				if(this.gemArray[index.x][index.y].value == value) {
					return true;
				}
			}
		}
		return false;
	} 

	this.startDrag = function(mousePos) {
		if(mousePos.x < 3 * GEM_W && 
	 	   mousePos.x > 2 * GEM_W && 
	  	   mousePos.y < 6 * GEM_H && 
	       mousePos.y > 5 * GEM_H)  {
			console.log("Valid Drag");
			this.nextGem.drag(mousePos);
		}
	}

	this.endDrag = function(mousePos) {
		if(mousePos.x < 5 * GEM_W && 
		   mousePos.x > 0 && 
		   mousePos.y < 5 * GEM_H && 
		   mousePos.y > 0)  {
			this.placeGem(mousePos.x, mousePos.y);
		} else {
			this.nextGem.release(mousePos);
		}
	}

	//empty the combination
	this.clearCombination = function() {
		while(this.combination[0] != null) {
			this.combination.pop();
		}
	}

	//make a new gem and get a new value for the next gem
	this.placeGem = function(x, y) {
		var index = {x: 0, y: 0};
		index.x = Math.floor(x/GEM_W);
		index.y = Math.floor(y/GEM_H);
		if(this.gemArray[index.x][index.y] == null) {
			this.gemArray[index.x][index.y] = new gemClass();
			this.gemArray[index.x][index.y].init(this.nextValue);
			this.gemArray[index.x][index.y].place(index.x, index.y);
			var nextIndex = Math.floor(Math.random() * 16);
			this.nextValue = valuesArray[nextIndex];
			this.nextGem.init(this.nextValue);
			this.nextGem.place(2, 5);
		} else {
			this.nextGem.release();
		}
	}

	this.blowUp = function(index) {
		var topLeft = {x:0 , y:0};
		var bottomRight = {x:0 , y:0};
		//setup 3x3 initially
		topLeft.x = index.x-1;
		topLeft.y = index.y-1;
		bottomRight.x = index.x+1;
		bottomRight.y = index.y+1;
		//trim to the board
		if(topLeft.x < 0) { topLeft.x = 0; }
		if(topLeft.y < 0) { topLeft.y = 0; }
		if(bottomRight.x >= 5) { bottomRight.x = 4 };
		if(bottomRight.y >= 5) { bottomRight.y = 4 };
		//delete the gems in the square
		for(var i = topLeft.x; i <= bottomRight.x; i++) {
			for(var j = topLeft.y; j <= bottomRight.y; j++) {
				if(this.gemArray[i][j] != null) {
					this.score += this.gemArray[i][j].value;
					delete this.gemArray[i][j];
				}
			}
		}
		//bonus score
		this.score += 50;
	}
}