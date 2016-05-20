function colorRect(x, y, width, height, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(x, y, width, height);
}

function drawBitmapCenteredWithRotation(useBitmap, atX, atY, withAng) {
	canvasContext.save();
	canvasContext.translate(atX,atY);
	canvasContext.rotate(withAng);
	canvasContext.drawImage(useBitmap, -useBitmap.width/2, -useBitmap.height/2);
	canvasContext.restore();
}

function colorCircle(x, y, radius, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.beginPath();
	canvasContext.arc(x, y, radius, 0, 2*Math.PI, true);
	canvasContext.fill();
}