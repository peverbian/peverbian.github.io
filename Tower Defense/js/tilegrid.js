var TILE_SIZE = 25;

const GROUND = 0;
const WALL1 = 1;
const WALL2 = 4;
const SPAWN = 2;
const GOAL = 3;

var NUM_COLS = 0;
var NUM_ROWS = 0;

const DIRS = [[1, 0], [0, 1], [-1, 0], [0, -1]];//,[1, 1], [-1, 1], [-1, -1], [1, -1]]; - remove comment to add diagonals

const initialMap = [
1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,
4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,
4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,
4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,
4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,
4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,
];


function tileClass() {
	this.index;
	this.walkable;
	this.tower;
	this.type;
	this.color;

	this.init = function(index, type) {
		this.index = index;
		this.type = type;
		if(this.type == 1) {
			this.walkable = false;
		} else {
			this.walkable = true;
		}
		switch(this.type) {
			case 1:
			this.color = "blue";
			break;
			case 0:
			this.color = "#EEEEEE"
			break;
			case 2:
			this.color = "green"
			break;
			case 3:
			this.color = "red"
			break;
			case 4:
			this.color = "yellow"
			break;
		}
	}

	
	this.draw = function() {
		colorRect(this.index[0] * TILE_SIZE +1, this.index[1] * TILE_SIZE +1, TILE_SIZE-2, TILE_SIZE-2, this.color);
	}

}

function tileGrid() {
	this.start; //the index where mobs start
	this.goal; //the index mobs are trying to go to
	this.grid; //array of tile objects
	this.W; //horizontal dimension of grid
	this.H; //vertical dimension of grid
	this.edges; // stores arrays of indexes for the neighbors of a given index.
	this.next; // array of indexes for the next index on the path to the goal.
	this.mobLocs // array of indexes containing mobs.
	this.count = 0;

	//setup the tile grid
	this.init = function(W,H) {
		this.W = W;
		this.H = H;
		delete this.grid;
		this.grid = new Array();
		this.edges = new Array();
		this.next = new Array();
		this.walkable = new Array();
		this.mobLocs = new Array();

		for(var x = 0; x < W; x++) {
			for(var y = 0; y < H; y++) {
				//get the index for our location
				var index = this.to_index(x,y);
				//make a new tile
				this.grid[index] = new tileClass();
				//get the type from the initial map & set the start and goal locations
				var type = initialMap[index];
				switch(type) {
					case 0:
					this.walkable[index] = true;
					break;
					case 1:
					this.walkable[index] = false;
					break;
					case 2:
					this.start = index;
					this.walkable[index] = true;
					//type = 0;
					break;
					case 3:
					this.goal = index;
					this.walkable[index] = true;
					case 4:
					this.walkable[index] = false;
					//type = 0;
					break;
				}
				//initialize the tile telling it where it is and what type it is
				this.grid[index].init([x,y], type);
				//populate the neighbors array
				this.edges[index] = new Array();
				for (var i = DIRS.length - 1; i >= 0; i--) {
					var x2 = x + DIRS[i][0];
					var y2 = y + DIRS[i][1];
					if(this.valid(x2,y2)) {
						this.edges[index].push(this.to_index(x2,y2));
					}
				}
			}
		}
		this.recalcPaths();
	}

	this.draw = function() {
	//	console.log("drawing");
		for (var i = this.grid.length - 1; i >= 0; i--) {
			this.grid[i].draw();
		}
	}

	this.update = function(dt) {
		this.count+= dt;
		if (this.count >= .5) {
			this.mobLocs.splice(0,this.mobLocs.length);
			this.count = 0;
		}
	}

	this.valid = function(x,y) { return 0 <= x && x < this.W && 0 <= y && y < this.H; }
	this.to_index = function(x,y) {	return x + this.W * y; }
	this.from_index = function(index) {	return [index % this.W, Math.floor(index/this.W)]; }

	//recalculate all the next pointers
	/*this.recalcPaths = function() {
		delete this.next;
		this.next = new Array();
		var frontier = new Array();
		var visited = new Array();
		visited[this.goal] = true;
		frontier.push(this.goal);
		while(frontier.length > 0) {
			var current = frontier.shift();
			var cn = this.edges[current];
			for (var i = cn.length - 1; i >= 0; i--) {
				nextIndex = cn[i]
				if(!visited[nextIndex] && this.grid[nextIndex].walkable) {
					frontier.push(nextIndex)
					visited[nextIndex] = true;
					this.next[nextIndex] = current;
				}
			}
		}
	}*/
	this.recalcPaths = function() {
		delete this.next;
		this.next = calcPaths(this.walkable, this.goal, this.edges);
	}

	//return x/y pair for next from xy pair
	this.getStart = function() {
		return this.from_index(this.start);
	}
	this.getGoal = function() {
		return this.from_index(this.goal);
	}

	//return x/y pair for next from xy pair
	this.getNext = function(xy) {
		//if we're on the map
		if(this.valid(xy[0],xy[1])) {
			var index = this.to_index(xy[0],xy[1]);
			this.mobLocs[index] = true;
			this.mobLocs[this.next[index]];
			return this.from_index(this.next[index]);
		}
		//have we made it on the map yet?
		if(xy[0] < 0.1) {
			return this.from_index(this.start);
		}
		//we're at goal
		return false;
	}

	this.setWalkable = function(tile) {
		this.grid[tile].walkable = false;
		this.walkable[tile] = false;
	}

	this.spawnTower = function(tile, size) {
		var testTiles = new Array();
		var index = 0;
		for (var i = 0; i < size; i++) {
			for (var j = 0; j < size; j++) {
				testTiles[index] = this.to_index(tile[0]+i,tile[1]+j);
				index++;
			}
		}
		if(this.testTower(testTiles)) {
			console.log(testTiles);
			for (var i = testTiles.length - 1; i >= 0; i--) {
				this.setWalkable(testTiles[i]);
			}
			this.recalcPaths();
			return true;
		}
		else {
			return false;
		}
	}

	this.testTower = function(towerLoc) {
		for (var i = towerLoc.length - 1; i >= 0; i--) {
			if(this.mobLocs[towerLoc[i]]) {
				return false;
			}
		}
		var test = testTower (this.walkable, this.goal, this.edges, towerLoc, this.start, this.mobLocs)
		return test;
	}

	this.hightlight = function(xy) {
		var valid = testTower(xy);
		this.grid[to_index(xy[0],xy[1])].highlight(valid);
	}
}