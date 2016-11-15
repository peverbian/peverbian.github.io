var picsToLoad;
var towerBase = document.createElement("img");
var basicTop = document.createElement("img");
function loadImages() {
	var imageList = [ 
//	{varName: <image holder>, file: "<filename>"},
	{varName: towerBase, file: "towerbase.png"},
	{varName: basicTop, file: "basictop.png"}
	];
	picsToLoad = imageList.length;
	console.log("Loading " + picsToLoad + " images.");
	for(var i=0; i < imageList.length; i++) {
		//console.log(imageList[i]);
		if(imageList[i].varName != undefined) {
			beginLoadingImage(imageList[i].varName, imageList[i].file);
		}	
	}
}

function beginLoadingImage(imgVar, filename) {
	//console.log("Queued image.");
	imgVar.onload = countLoadedImagesLaunchIfReady;
	imgVar.src = "img/"+filename;
	console.log(imgVar.src);
}

function countLoadedImagesLaunchIfReady() {
//	console.log("Pics to load:" + picsToLoad);
	picsToLoad--;
	//console.log("Loaded image.");
	if(picsToLoad <= 0) {
		startGame();
	}
}