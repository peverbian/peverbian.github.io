function Tile() {
	this.x;
	this.y;
	this.width;
	this.height;
	this.color = "#AAAAAA";
	this.stuck = false;

	this.init = function(index, color) {
		this.x = index.x;
		this.y = index.y;
		this.width = size;
		this.height = size;
		this.color = color;
	}

	this.update = function() {
	}

	this.draw = function() {
		colorRect(this.x*size, this.y*size, size-1, size-1, this.color);
	}

	this.drop = function() {
		this.y++;
	}
}