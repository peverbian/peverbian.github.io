var picsToLoad = 0;
var gemPics = [];
//console.log("imageloading.js");

function loadImages() {
	var imageList = [ "1.png","2.png","3.png","4.png","5.png", "6.png", "7.png"];
	picsToLoad = imageList.length;
	for(var i=0; i < imageList.length; i++) {
		gemPics[i] = document.createElement("img");
		beginLoadingImage(gemPics[i], imageList[i]);
	}
}


function beginLoadingImage(imgVar, filename) {
	imgVar.onload = countLoadedImagesLaunchIfReady;
//	console.log("Loading: " + filename);
	imgVar.src = "img/"+filename;
}

function countLoadedImagesLaunchIfReady() {
//	console.log("Pics to load:" + picsToLoad);
	picsToLoad--;
	if(picsToLoad == 0) {
		startGame();
	}
}