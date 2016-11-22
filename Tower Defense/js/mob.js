
function mobClass() {
	this.speed = 3 * TILE_SIZE;
	this.pos = new Vector2d();
	this.dir = new Vector2d(1,0);
	this.goal = new Vector2d();
	this.timeToLive = 10;
	this.HP;
	this.waypoints = new Array();
	this.state;


	this.init = function(start, goal) {
		this.pos = tileToPos(start);
		this.pos.x -= 100;
		this.goal = tileToPos(goal);
		this.HP = 2500;
		this.waypoints.push(tileToPos(tiles.getNext(start)));
		this.state = "starting";
		this.navigate = this.startingPath;

		//console.log(this.waypoints);
		//console.log(this);
	}

	this.update = function(dt) {
		this.navigate(dt);
		this.move(dt);
	}

	this.startingPath = function(dt) {
		//have we reached the left edge of the map?
		if(this.pos.x >= 0) { 
			this.state = "walking path";
			this.navigate = this.followPath 
	//		console.log("getting on path");
		}
	}
	
	this.followPath = function(dt) {
		//have we reached our current waypoint
		if(this.waypoints[0]) {
			this.dir = this.waypoints[0].subtract(this.pos);
			if(this.dir.lengthSqr() < TILE_SIZE/2) {
				this.waypoints.push(tileToPos(tiles.getNext(posToTile(this.pos))));
				this.waypoints.shift();
			}
		}
		//Is there another waypoint.
		if(this.waypoints[0]) {
			this.dir = this.waypoints[0].subtract(this.pos);
		}

		if(this.waypoints[0].x == this.goal.x && this.waypoints[0].y == this.goal.y) {
		//we reached our goal
			this.state = "escaping";
	//		console.log("getting off path");
			this.navigate = this.escapePath;
			this.timeToLive = 3;
			this.dir = new Vector2d(1,0);
		}
	}
	
	this.escapePath = function(dt) {
		this.timeToLive -= dt;
	}

	this.move = function(dt) {
		var vel = this.dir.unit().multiply(this.speed * dt);
		if(vel.lengthSqr() > this.dir.lengthSqr()) {
			vel = this.dir;
		}
		this.pos = this.pos.add(vel);
	}

	this.hit = function(damage) {
		this.HP -= damage;
		if(this.HP <= 0) {
			this.timeToLive = 0;
		}	
	}

	this.recalcWaypoints = function() {
		this.waypoints.splice(0, this.waypoints.length);
		this.waypoints.push(tileToPos(tiles.getNext(posToTile(this.pos))));
	}

	this.draw = function() {
		colorCircle(this.pos.x, this.pos.y, 5, "red");
	}
}
