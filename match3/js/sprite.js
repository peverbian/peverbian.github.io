function sprite() {
	this.spritesheet; //where the image is stored
	//where on the sprite sheet the image is
	this.x;
	this.y;
	//how big the sprite is
	this.width;
	this.height;

	this.init = function(useImg, atX, atY, atWidth, atHeight) {
		this.spritesheet = useImg;
		this.x = atX;
		this.y = atY;
		this.width = atWidth;
		this.height = atHeight;		
	}

	this.draw = function (atX, atY) {
		ctx.save();
		ctx.translate(atX,atY);
		ctx.drawImage(this.spritesheet, this.x, this.y, this.width, this.height);
		ctx.restore();
	}

	this.drawStretched = function (atX, atY, atWidth, atHeight) {
		ctx.save();
		ctx.translate(atX,atY);
		ctx.drawImage(this.spritesheet, this.x, this.y, this.width, this.height,0,0,atWidth,atHeight);
		ctx.restore();
	}
}