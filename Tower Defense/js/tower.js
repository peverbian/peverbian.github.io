function towerClass() {
	this.pos;
	this.fireRate = .5;
	this.fireDelay = 0;
	this.target;
	this.shots = new Array();
	this.range = 100;
	this.dir;
	this.wallColor;

	this.init = function(tile) {
		this.pos = tileToPos(tile);
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
		newShot.init(this.pos, target, true, 5);
		this.shots.push(newShot);
	}

	this.getTarget = function() {
		this.target = null;
		for (var i = mobs.length - 1; i >= 0; i--) {
			d2 = getDistanceSqr(mobs[i].pos, this.pos);
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
		drawBitmapStretched(towerBase, this.pos.x - TILE_SIZE/2, this.pos.y - TILE_SIZE/2, TILE_SIZE*2, TILE_SIZE*2);
		for (var i = this.shots.length - 1; i >= 0; i--) {
			this.shots[i].draw();
		}
		var dir = 0;
		if(this.target) {
			this.dir = this.target.pos.subtract(this.pos);
			this.dir = this.dir.toAngles();
		}
		drawBitmapCenteredStretchedWithRotation(basicTop, this.pos.x+ TILE_SIZE/2, this.pos.y + TILE_SIZE/2, TILE_SIZE*2, TILE_SIZE*2, this.dir);
	}
}