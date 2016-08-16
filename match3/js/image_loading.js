var picsToLoad = 0;
var spriteSheets = [];
var plainSprites = [];
var diceSprites = [];
var gemsSprites = [];
//console.log("imageloading.js");

function loadImages() {
	var imageList = [ "dice.png", "plain.png", "gems.png", "trash.png"]
	picsToLoad = imageList.length;
	for(var i=0; i < imageList.length; i++) {
		spriteSheets[i] = document.createElement("img");
		beginLoadingImage(spriteSheets[i], imageList[i]);
	}
}

function setupSprites(spriteList, spriteSheet) {
	var numSprites = Math.floor(spriteSheet.width / spriteSheet.height);
	var dim = spriteSheet.height;
	console.log("Setting up " + numSprites + " sprites of size " + dim);
	for(var i=0; i < numSprites; i++) {
		spriteList[i] = new sprite();
		spriteList[i].init(spriteSheet, i*dim, 0, dim, dim);
	}
}

function beginLoadingImage(imgVar, filename) {
	imgVar.onload = countLoadedImagesLaunchIfReady;
	console.log("Loading: " + filename);
	imgVar.src = "img/"+filename;
}

function countLoadedImagesLaunchIfReady() {
//	console.log("Pics to load:" + picsToLoad);
	picsToLoad--;
	if(picsToLoad == 0) {
		startGame();
	}
}