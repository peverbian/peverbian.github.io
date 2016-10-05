var picsToLoad = 0;

function loadImages() {
	var imageList = [ 
//	{varName: <image holder>, file: "<filename>"},
	];
	picsToLoad = imageList.length;
	for(var i=0; i < imageList.length; i++) {
		if(imageList[i].varName != undefined) {
			beginLoadingImage(imageList[i].varName, imageList[i].file);
		}	
	}
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