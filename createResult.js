function createUrl(){
	const resultUrl = "?score=" + getScore() + "&mines=" + getMinesId() +"&flipped=" + getFlippedId() + "&marked=" + getMarkedId();
	return resultUrl;
}

function getMinesId(){
	let arr = [];
	const minesParam = pixels.filter(pixel => pixel.isMine == true);
	for (let i = 0; i < minesParam.length; i++) {
		arr.push(minesParam[i].id);
	}
	return String(arr);
}

function getFlippedId(){
	const flippedParam = pixels.filter(pixel => pixel.flipped == true);
	let arr = [];
	for (let i = 0; i < flippedParam.length; i++) {
		arr.push(flippedParam[i].id);
	}
	return String(arr);
}

function getMarkedId(){
	const markedParam = pixels.filter(pixel => pixel.marked == true);
	let arr = [];
	for (let i = 0; i < markedParam.length; i++) {
		arr.push(markedParam[i].id);
	}
	return String(arr);
}

function getScore(){
	const scoreElement = document.getElementById("score");
	return scoreElement.innerText;
}