var car1Pic = document.createElement("img");

var worldPics = [];
var picsToLoad = 0;

console.log("Hello");

function loadImages() {
	var imageList = [
	{varName: car1Pic, file: "player.png"},
	{worldType: WORLD_FLOOR, file: "floor.png"},
	{worldType: WORLD_WALL, file: "bricks.png"},
	{worldType: WORLD_KEY, file: "key.png"},
	{worldType: WORLD_DOOR, file: "door.png"},
	{worldType: WORLD_STAIRS, file: "stairs.png"}
	];
	picsToLoad = imageList.length;
	for(var i=0; i < imageList.length; i++) {
		if(imageList[i].varName != undefined) {
			beginLoadingImage(imageList[i].varName, imageList[i].file);
		} else {
			loadImageForWorld(imageList[i].worldType, imageList[i].file);
		}
	}
}

function loadImageForWorld(worldCode, filename) {
	worldPics[worldCode] = document.createElement("img");
	beginLoadingImage(worldPics[worldCode], filename);
}

function beginLoadingImage(imgVar, filename) {

	imgVar.onload = countLoadedImagesLaunchIfReady;
	imgVar.src = "img/"+filename;
}

function countLoadedImagesLaunchIfReady() {
//	console.log("Pics to load:" + picsToLoad);
	picsToLoad--;
	if(picsToLoad == 0) {
		startGame();
	}
}