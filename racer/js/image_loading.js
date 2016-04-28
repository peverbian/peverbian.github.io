var car1Pic = document.createElement("img");
var car2Pic = document.createElement("img");

var trackPics = [];
var picsToLoad = 0;

console.log("Hello");

function loadImages() {
	var imageList = [
	{varName: car1Pic, file: "player1car.png"},
	{varName: car2Pic, file: "player2car.png"},
	{trackType: TRACK_ROAD, file: "track_road.png"},
	{trackType: TRACK_WALL, file: "track_wall.png"},
	{trackType: TRACK_GOAL, file: "track_goal.png"},
	{trackType: TRACK_TREES, file: "track_trees.png"}
	];
	picsToLoad = imageList.length;
	for(var i=0; i < imageList.length; i++) {
		if(imageList[i].varName != undefined) {
			beginLoadingImage(imageList[i].varName, imageList[i].file);
		} else {
			loadImageForTrack(imageList[i].trackType, imageList[i].file);
		}
	}
}

function loadImageForTrack(trackCode, filename) {
	trackPics[trackCode] = document.createElement("img");
	beginLoadingImage(trackPics[trackCode], filename);
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