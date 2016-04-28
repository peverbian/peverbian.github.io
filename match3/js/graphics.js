function colorRect(x, y, width, height, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(x, y, width, height);
}

function colorCircle(x, y, radius, color) {
	canvasContext.fillStyle = color;
	canvasContext.beginPath();
	canvasContext.arc(x, y, radius, 0, 2*Math.PI, true);
	canvasContext.fill();
}


function drawBitmapCenteredWithRotation(useBitmap, atX, atY, withAng) {
	canvasContext.save();
	canvasContext.translate(atX,atY);
	canvasContext.rotate(withAng);
	canvasContext.drawImage(useBitmap, -useBitmap.width/2, -useBitmap.height/2);
	canvasContext.restore();
}

function drawBitmap(useBitmap, atX, atY) {
	canvasContext.save();
	canvasContext.translate(atX,atY);
	canvasContext.drawImage(useBitmap, 0, 0);
	canvasContext.restore();
}