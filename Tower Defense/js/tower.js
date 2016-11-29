function towerClass() {
	this.pos;
	this.pos2d;
	this.center;
	this.fireRate = .5;
	this.fireDelay = 0;
	this.target;
	this.size;
	this.shots = new Array();
	this.range = 100;
	this.dir;

	this.init = function(tile, size) {
		this.pos = tileToPos(tile); //XY of top-left of tower.
		this.pos2d = tileToPosCenter2d(tile); //XY of top-left of tower.
		this.size = TILE_SIZE * size; // how many tiles big it is, always square.
		this.center = [this.pos[0] + (size*TILE_SIZE/2),this.pos[1] + (size*TILE_SIZE/2)]; //store the XY of the center of the tile so we don't have to calculate it every time, for rotation of central part.
	}

	this.update = function(dt) {
		this.fireDelay += dt;
		if(this.fireDelay >= this.fireRate) {
			if(this.getTarget()) {
				this.shoot(this.target);
				this.fireDelay = 0;
			}
		}
		for (var i = this.shots.length - 1; i >= 0; i--) {
			if(this.shots[i].hit == true) {
				this.shots.splice(i,1);
			} else {
				this.shots[i].update(dt);
			}
		}
	}

	this.shoot = function(target) {
//		console.log("shooting at " + target);
		var newShot = new shotClass();
		newShot.init(this.pos2d, target, true, 1);
		this.shots.push(newShot);
	}

	this.getTarget = function() {
		this.target = null;
		for (var i = mobs.length - 1; i >= 0; i--) {
			d2 = getDistanceSqr(mobs[i].pos, this.pos2d);
			 if(d2 <= this.range * this.range) {
			 	//console.log("Found Target");
			 	this.target = mobs[i];
			 }
		}
		if(this.target) {
			return true;
		}
		return false;
	}

	this.draw = function() {
		drawBitmapStretched(towerBase, this.pos[0], this.pos[1], this.size, this.size);
		for (var i = this.shots.length - 1; i >= 0; i--) {
			this.shots[i].draw();
		}
		var dir = 0;
		if(this.target) {
			this.dir = this.target.pos.subtract(this.pos2d);
			this.dir = this.dir.toAngles();
		}
		drawBitmapCenteredStretchedWithRotation(basicTop, this.center[0], this.center[1], this.size, this.size, this.dir);
	}
}