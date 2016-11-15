function shotClass() {
	this.pos;
	this.speed = 400;
	this.target; // mob that is used
	this.targetLoc = new Vector2d();
	this.dir;
	this.hit = false;

	this.init = function(pos, target, tracking, damage) {
		this.pos = new Vector2d(pos.x, pos.y);
		this.dir = new Vector2d();
		this.target = target;
		this.damage = damage;
		if(tracking) {
			this.tracking = true;
		} 
		this.targetLoc = target.pos;
		this.dy = 0;
	}

	this.update = function(dt) {
		if(this.tracking) {
			this.targetLoc =this.target.pos;
		}
		this.dir = this.targetLoc.subtract(this.pos);
		//console.log(this.dir);
		if(this.dir.lengthSqr() > (this.speed)) {
			this.dir = this.dir.unit();
			this.pos = this.pos.add(this.dir.multiply(this.speed * dt));
		} else {
			//we hit the target
			this.target.hit(this.damage);
			this.hit = true;
		}
	}

	this.draw = function() {
		colorCircle(this.pos.x, this.pos.y, 2, "black");
	}
}