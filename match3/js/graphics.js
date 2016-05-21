function colorRect(x, y, width, height, drawColor) {
	ctx.fillStyle = drawColor;
	ctx.fillRect(x, y, width, height);
}

function colorCircle(x, y, radius, color) {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2*Math.PI, true);
	ctx.fill();
}


function drawBitmapCenteredWithRotation(useBitmap, atX, atY, withAng) {
	ctx.save();
	ctx.translate(atX,atY);
	ctx.rotate(withAng);
	ctx.drawImage(useBitmap, -useBitmap.width/2, -useBitmap.height/2);
	ctx.restore();
}

function drawBitmap(useBitmap, atX, atY) {
	ctx.save();
	ctx.translate(atX,atY);
	ctx.drawImage(useBitmap, 0, 0);
	ctx.restore();
}

function drawBitmapStretched(useBitmap, atX, atY, width, height) {
	ctx.save();
	ctx.translate(atX,atY);
	ctx.drawImage(useBitmap, 0, 0, useBitmap.width, useBitmap.height, 0, 0, width, height);
	ctx.restore();
}