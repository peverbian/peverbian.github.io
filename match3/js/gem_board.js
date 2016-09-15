
var valuesArray = [1,1,1,1,2,2,2,2,3,3,3,4,4,5,5,6,6];  //used to control the frequency of each value.
//var valuesArray = [1,1,1,1];  //used to control the frequency of each value.
var text = "";
const maxValue = 6;
const pointsToNextLevel = 50;
function gemBoard() {
	this.gemArray = [];
	this.animateArray = [];
	this.x = 0;
	this.y = 0
	this.nextGems = [];
	this.score = 0;
	this.level = 0; 
	this.pointsToNextLevel = 50;
	this.animating = false; // are we merging gems
	this.matchValue = 0; // value of matched gem
	this.chanceForDouble = 0; // chance that next gem is 2 at once.  0 = no chance, 1 = always double.
	this.root; //index of most recent gem in combination
	this.orientation = 0; //0 = horizontal, 1 = vertical, used for multiple gems
	this.trashes = 1;

	this.init = function() {
		this.gemArray.length = 5;
		for(var i = 0; i < this.gemArray.length; i++) {
			this.gemArray[i] = [];
			this.gemArray[i].length = 5;
		}
		this.reset();
	}

	//resets the board after a deadlock
	this.reset = function() {
		this.score = 0;
		this.level = 0;
		this.chanceForDouble = 0;
		this.pointsToNextLevel = 50;
		this.trashes = 1;
		delete this.nextGems;
		this.nextGems = [];
		this.nextGems[0] = new gemClass();
		this.nextGems[0].init(1);
		this.nextGems[0].place({x:2, y:5.5});
		for(var i = 0; i < this.gemArray.length; i++) {
			for(var j = 0; j < this.gemArray[i].length; j++) {
				this.gemArray[i][j] = null;		
			}
		}
	}

	this.update = function() {
		if(playing == true) {
			var boardFull = true;
			if(this.nextGems.length == 1) {
				boardFull = boardFull1(this.gemArray);
			} else {
				boardFull = boardFull2(this.gemArray);
			}

			if(boardFull == false && this.trashes >= 0){
				if(this.animating) {
					this.animate();
				} else {
					var index = checkBoard(this.gemArray);
					if(index.x != -1 || index.y != -1) {
						//clearCombination(this.combination);
						this.matchValue = this.gemArray[index.x][index.y].value;
						var combination = getCombination(this.gemArray,index);
						this.root = getRoot(this.gemArray, combination);
						this.makeAnimation(combination, this.root);
					}
				}
			} else {
				playing = false;
			}
			for (var i = this.nextGems.length - 1; i >= 0; i--) {
				this.nextGems[i].update();
			}
			this.checkLevel();
		}
	}

	this.resetHomes = function() {
		for(var i = 0; i < this.gemArray.length; i++) {
			for(var j = 0; j < this.gemArray[i].length; j++) {
				if(this.gemArray[i][j] != null) {
					this.gemArray[i][j].reset();
					}		
			}
		}		
		for (var i = this.nextGems.length - 1; i >= 0; i--) {
			this.nextGems[i].reset();
		}
	}

	//draw the board and all gems to the screen.
	this.draw = function() {
		//draw the grid
		for(var i = 0; i < this.gemArray.length; i++) {
			for(var j = 0; j < this.gemArray[i].length; j++) {
				colorRect(i*GEM_W+1, j*GEM_H+1, GEM_W-2, GEM_H-2, "#AFAFAF");		
			}
		}
		//draw home base
		//colorRect(GEM_W * 1.5, GEM_H * 5, GEM_W * 2, height, "gray")
		//draw the gems
		for(var i = 0; i < this.gemArray.length; i++) {
			for(var j = 0; j < this.gemArray[i].length; j++) {
				if(this.gemArray[i][j] != null) {
					this.gemArray[i][j].draw();
				}
			}
		}
		this.drawTrash();
		//this.drawScore(3.5,6);
		this.drawLevel();
		for (var i = this.nextGems.length - 1; i >= 0; i--) {
			this.nextGems[i].draw();
		}
		if(this.animateArray.length > 0) {
			for (var i = this.animateArray.length - 1; i >= 0; i--) {
				this.animateArray[i].draw();
			}	
		}
	}

	this.animate = function() {
		var stillMerging = false;
		for (var i = this.animateArray.length - 1; i >= 0; i--) {
			this.animateArray[i].update();
			if(this.animateArray[i].atHome() == false) {
				stillMerging = true;
			}
		}
		if(stillMerging == false) {
			this.finishAnimation();
		}
	}

	this.finishAnimation = function() {
		var matchValue = this.animateArray[0].value;
		while(this.animateArray.length > 0) {
			console.log("Removing Gem");
			this.animateArray.pop();
		}
		if(this.matchValue >= maxValue) {
			this.blowUp();
		} else {
			//make a new gem at the root with value+1
			this.gemArray[this.root.x][this.root.y] = new gemClass();
			this.gemArray[this.root.x][this.root.y].init(matchValue+1);
			this.gemArray[this.root.x][this.root.y].place(this.root);
		}
		this.animating = false;

	}

	this.drawTrash = function() {
		drawBitmapStretched(spriteSheets[3], 0, 5*GEM_H, GEM_W, GEM_H);	
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";		
		ctx.fillStyle = "yellow";
		ctx.font="20px Georgia";
		ctx.fillText(this.trashes,GEM_W * .5, GEM_H * 6.5);
	}

	this.drawScore = function(x,y) {
		ctx.fillStyle = "yellow";
		ctx.font="12px Georgia";
		ctx.fillText("Score: " + this.score,GEM_W * (x), GEM_H * (y + 0.5));
	}

	this.checkLevel = function() {
		if(this.score - ( this.level * pointsToNextLevel) >= 0) {
			this.level ++;
			this.chanceForDouble += 0.05;
			this.pointsToNextLevel += 50;
		}		
	}

	this.drawLevel = function() {

		ctx.strokeStyle = "red";
		ctx.lineWidth=GEM_H/8;
		ctx.beginPath();
		ctx.arc(GEM_W * 4.25, GEM_H * 6, GEM_H * 0.4, 2*Math.PI * (this.score % pointsToNextLevel)/pointsToNextLevel, 2*Math.PI, false);
		ctx.stroke();
		ctx.strokeStyle = "yellow";
		ctx.lineWidth=GEM_H/8;
		ctx.beginPath();
		ctx.arc(GEM_W * 4.25, GEM_H * 6, GEM_H * 0.4, 0, 2*Math.PI * (this.score % pointsToNextLevel)/pointsToNextLevel, false);
		ctx.stroke();
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";		
		ctx.fillStyle = "yellow";
		ctx.font="20px Georgia";
		ctx.fillText(this.level,GEM_W * 4.25, GEM_H * 6);
	}




	this.makeAnimation = function(combination) {
		for(var i = 0; i < combination.length; i++) {
			this.score += this.gemArray[combination[i].x][combination[i].y].value;
			this.animateArray[i] = this.gemArray[combination[i].x][combination[i].y];
			this.animateArray[i].moveTo(this.root.x, this.root.y);
			this.gemArray[combination[i].x][combination[i].y] = null;
		}
		this.animating = true;
	}

	this.startDrag = function(mousePos) {
		if(mousePos.x < 3 * GEM_W && 
	 	   mousePos.x > 2 * GEM_W && 
	  	   mousePos.y < 6 * GEM_H && 
	       mousePos.y > 5 * GEM_H)  {
			console.log("Valid Drag");
			this.drag(mousePos);
		}
	}

	this.endDrag = function(mousePos) {
		var index = {x: 0, y: 0};
		index.x = Math.floor(mousePos.x/GEM_W);
		index.y = Math.floor(mousePos.y/GEM_H);
		console.log("Releasing at " + index.x + "," + index.y);
		if(this.onTrash(index) ) {  //if we drop on the trash can, get a new gem.
			console.log("On Trash");
			if(this.trashes > 0) {
				this.trashes--;
				this.getNewNextGem();
			}
		} else if(this.onHome(mousePos) && this.nextGems.length > 1) { //if we drop on home, rotate the multi-gem
			if(this.orientation == 0) {
				this.orientation = 1;
				for (var i = this.nextGems.length - 1; i >= 0; i--) {
					this.nextGems[i].place({x:2, y:5 + i});
				}
			} else {
				this.orientation = 0;
				this.swapGems();
				for (var i = this.nextGems.length - 1; i >= 0; i--) {
					this.nextGems[i].place({x:i+this.nextGems.length-0.5, y:5.5});
				}
			}
		} else {
			var canPlaceAll = true;
			for (var i = this.nextGems.length - 1; i >= 0; i--) {
				if(this.testPlaceGem(this.nextGems[i].getIndex()) == false) {
					canPlaceAll = false;
				}
			}
			if(canPlaceAll == true) {
				for (var i = this.nextGems.length - 1; i >= 0; i--) {
					var placingIndex = this.nextGems[i].getIndex();
					this.gemArray[placingIndex.x][placingIndex.y] = new gemClass();
					this.gemArray[placingIndex.x][placingIndex.y].init(this.nextGems[i].getValue());
					this.gemArray[placingIndex.x][placingIndex.y].place(placingIndex);
				}
				this.getNewNextGem();
			} else {
				for (var i = this.nextGems.length - 1; i >= 0; i--) {
					this.nextGems[i].release();
				}
			}
		}
	}

	this.drag = function(mousePos)  {
		var gemPos = {x: 0, y: 0};
		if(this.nextGems.length == 1) {
			gemPos.x = mousePos.x - (GEM_W/2);
			gemPos.y = mousePos.y - (GEM_H/2);
			this.nextGems[0].drag(gemPos);
		} else {
			if(this.orientation == 0) {
				for (var i = this.nextGems.length - 1; i >= 0; i--) {   
					gemPos.x = mousePos.x - GEM_W + (GEM_W * i);
					gemPos.y = mousePos.y - (GEM_H/2);
					this.nextGems[i].drag(gemPos);	
				}
			} else {
				for (var i = this.nextGems.length - 1; i >= 0; i--) {   
					gemPos.x = mousePos.x - GEM_W/2;
					gemPos.y = mousePos.y - GEM_H + (GEM_H * i);
					this.nextGems[i].drag(gemPos);	
				}
			}	
		}
	}

	this.releaseGems = function() {
		for (var i = this.nextGems.length - 1; i >= 0; i--) {
			this.nextGems[i].release();
		}
	}
	this.swapGems = function() {
		console.log("Swapping Gems");
		var tempGem = this.nextGems[0];
		this.nextGems[0] = this.nextGems[1];
		this.nextGems[1] = tempGem;	
	}

	//is this on the board?
	this.onBoard = function(index) {
		if(	index.x < 5 && 
		   	index.x >= 0 && 
		   	index.y < 5 && 
		   	index.y >= 0)  {
			return true;
			}
		return false;
	}

	//is this over the trash icon?
	this.onTrash = function(index) {
		if(index.x == 0 && index.y == 5) {
			return true;
		}
		return false;
	}

	this.onHome = function(mousePos) {
		var indexX = mousePos.x/GEM_W;
		var indexY = mousePos.y/GEM_H;
		if (indexX >= 1.5 && indexX <= 3.5 &&
			indexY >= 5 && indexY <= 7) {
			return true;
		}
		return false;
	}

	//can we place a gem here?
	this.testPlaceGem = function(index) {
		if(this.onBoard(index)) {
			if(this.gemArray[index.x][index.y] == null) {
				return true;
			}
		}
		return false;
	}

	//make a new gem and get a new value for the next gem
	this.placeGem = function(index) {
		if(this.gemArray[index.x][index.y] == null) {
			this.gemArray[index.x][index.y] = new gemClass();
			this.gemArray[index.x][index.y].init(this.randomValue);
			this.gemArray[index.x][index.y].place(index.x, index.y);
			this.getNewNextGem();
		} else if(index.x == 0 && index.y == 5) {
			this.getNewNextGem();
		} else {
			this.releaseGems();
		}
	}



	this.getNewNextGem = function() {
		this.nextGems = [];
		this.orientation = 0;
		if(Math.random() <= this.chanceForDouble) {
			this.nextGems.length=2;
			for (var i = this.nextGems.length - 1; i >= 0; i--) {
				this.nextGems[i] = new gemClass();
				this.nextGems[i].init(this.randomValue());
				this.nextGems[i].place({x:i+this.nextGems.length-0.5, y:5.5});
			}
		} else {
			this.nextGems.length=1;
			this.nextGems[0] = new gemClass();
			this.nextGems[0].init(this.randomValue());
			this.nextGems[0].place({x:2,y:5.5});
		}
	}

	this.randomValue = function() {
		return valuesArray[Math.floor(Math.random() * valuesArray.length)];
	}

	this.blowUp = function() {
		console.log("Blowing Up");
		var topLeft = {x:0 , y:0};
		var bottomRight = {x:0 , y:0};
		//setup 3x3 initially
		topLeft.x = this.root.x-1;
		topLeft.y = this.root.y-1;
		bottomRight.x = this.root.x+1;
		bottomRight.y = this.root.y+1;
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