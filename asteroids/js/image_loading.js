var shipPic = document.createElement("img");
var ufoPic = document.createElement("img");

var trackPics = [];
var picsToLoad = 0;

console.log("Hello");

function loadImages() {
	var imageList = [
	{varName: shipPic, file: "1.png"},
	{varName: ufoPic, file: "2.png"}
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