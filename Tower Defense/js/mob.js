
function mobClass() {
	this.speed = 150;
	this.pos = new Vector2d();
	this.dir = new Vector2d();
	this.goal = new Vector2d();
	this.timeToLive = 10;
	this.HP;
	this.waypoints = new Array();


	this.init = function(start, goal) {
		this.pos = tileToPos(start);
		this.pos.x -= 100;
		this.goal = tileToPos(goal);
		this.HP = 25000;
		this.waypoints.push(tileToPos(tiles.getNext(start)));
		//console.log(this.waypoints);
		//console.log(this);
	}

	this.update = function(dt) {
		this.navigate();
		this.move(dt);
	}

	this.navigate = function() {
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
			console.log("Reached our goal");
			this.timeToLive = 0;
		}
	}

	this.move = function(dt) {
		var vel = this.dir.unit().multiply(this.speed * dt);
		if(vel.lengthSqr() > this.dir.lengthSqr()) {
			tvel = this.dir;
		}
		this.pos = this.pos.add(vel);
	}

	this.hit = function(damage) {
		this.HP -= damage;
		if(this.HP <= 0) {
			this.timeToLive = 0;
		}	
	}

	this.recalcWaypoint = function() {
		delete this.waypoints;
		this.waypoints = new Array();
		this.waypoints.push(tileToPos(tiles.getNext(posToTile(this.pos))));
	}

	this.draw = function() {
		colorCircle(this.pos.x, this.pos.y, 5, "red");
	}
}
