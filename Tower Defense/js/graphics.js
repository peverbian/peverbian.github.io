function colorRect(x, y, width, height, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(x, y, width, height);
}

function drawBitmapCenteredWithRotation(useBitmap, atX, atY, withAng) {
	canvasContext.save();
	canvasContext.translate(atX, atY);
	canvasContext.rotate(withAng);
	canvasContext.drawImage(useBitmap, -useBitmap.width/2, -useBitmap.height/2);
	canvasContext.restore();
}

function drawBitmapCentered(useBitmap, atX, atY) {
	canvasContext.save();
	canvasContext.translate(atX, atY);
	canvasContext.drawImage(useBitmap, -useBitmap.width/2, -useBitmap.height/2);
	canvasContext.restore();
}

function drawBitmap(useBitmap, atX, atY) {
	canvasContext.drawImage(useBitmap, atX, atY);
}

function colorCircle(x,y,radius,drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.beginPath();
	canvasContext.arc(x, y, radius, 0, 2*Math.PI, true);
	canvasContext.fill();
}

function drawBitmapStretched(useBitmap, atX, atY, width, height) {
	canvasContext.save();
	canvasContext.translate(atX,atY);
	canvasContext.drawImage(useBitmap, 0, 0, useBitmap.width, useBitmap.height, 0, 0, width, height);
	canvasContext.restore();
}

function drawBitmapCenteredStretched(useBitmap, atX, atY, width, height) {
	canvasContext.save();
	canvasContext.translate(atX-width/2, atY-height/2);
	canvasContext.drawImage(useBitmap, 0, 0, useBitmap.width, useBitmap.height, 0, 0, width, height);
	canvasContext.restore();
}

function drawBitmapCenteredStretchedWithRotation(useBitmap, atX, atY, width, height, withAng) {
	canvasContext.save();
	canvasContext.translate(atX,atY);
	canvasContext.rotate(withAng);
	canvasContext.translate(-width/2, -height/2);
	canvasContext.drawImage(useBitmap, 0, 0, useBitmap.width, useBitmap.height, 0, 0, width, height);
	canvasContext.restore();
}

function updateDiv(div, value) {
	document.getElementById(div).innerHTML = value;
}
