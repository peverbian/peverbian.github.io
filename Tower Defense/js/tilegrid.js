var TILE_SIZE = 32;

const GROUND = 0;
const WALL = 1;
const SPAWN = 2;
const GOAL = 3;

var NUM_COLS = 0;
var NUM_ROWS = 0;

const DIRS = [[1, 0], [0, 1], [-1, 0], [0, -1]];

const initialMap = [
1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
2,0,0,0,0,0,0,0,0,0,0,0,0,0,3,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
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
	this.next; 

	//setup the tile grid
	this.init = function(W,H) {
		this.W = W;
		this.H = H;
		delete this.grid;
		this.grid = new Array();
		this.edges = new Array();

		for(var x = 0; x < W; x++) {
			for(var y = 0; y < H; y++) {
				//get the index for our location
				var index = this.to_index(x,y);
				//make a new tile
				this.grid[index] = new tileClass();
				//get the type from the initial map & set the start and goal locations
				var type = initialMap[index];
				switch(type) {
					case 2:
					this.start = index;
					type = 0;
					break;
					case 3:
					this.goal = index;
					type = 0;
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

	this.valid = function(x,y) { return 0 <= x && x < this.W && 0 <= y && y < this.H; }
	this.to_index = function(x,y) {	return x + this.W * y; }
	this.from_index = function(index) {	return [index % this.W, Math.floor(index/this.H)]; }

	//recalculate all the next pointers
	this.recalcPaths = function() {
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
			return this.from_index(this.next[this.to_index(xy[0],xy[1])]);
		}
		//have we made it on the map yet?
		if(xy[0] < 0) {
			return this.from_index(this.start);
		}
		//we're at goal
		return false;
	}

	this.setWalkable = function(tile) {
		this.grid[this.to_index(tile[0],tile[1])].walkable = false;
	}
}