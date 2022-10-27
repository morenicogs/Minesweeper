const url = window.location.search;
const urlParams = new URLSearchParams(url);
const fieldSize = {x: 16, y: 16}
const mines = 40;
const pixels = [];



const UrlScore = urlParams.get('score');
const score = UrlScore.toString().padStart(3, "0");

const UrlMines = urlParams.get('mines');
const minesArr = UrlMines.split(",");

const UrlFlipped = urlParams.get('flipped');
const flippedArr = UrlFlipped.split(",");


const UrlMarked = urlParams.get('marked');
const markedArr = UrlMarked.split(",");


function createField() {
	for (let i = 1; i < fieldSize.x +1 ; i++) {
		for (let j = 1; j < fieldSize.y +1 ; j++) {
			const pixel = {
				id: pixels.length,
				x: j,
				y: i,
				isMine: false,
				minesTouching: 0,
				marked: false,
				flipped: false
			};
			pixels.push(pixel);

		}
	}
	loadMines();
	loadFlipped();
}
function findPixel(x,y){
	const filterPixelsX = pixels.find(pixel => pixel.x == x && pixel.y == y);
	return filterPixelsX;
}


function loadMines() {
	for (let i = 0; i < minesArr.length; i++) {
		const minePixel = pixels[minesArr[i]];
		minePixel.isMine = true;
		updateTouched(minePixel.x, minePixel.y);
		pixels[minesArr[i]] = minePixel;
	}
	for (let i = 0; i < markedArr.length; i++) {
		const minePixel = pixels[markedArr[i]];
		minePixel.marked = true;
		pixels[markedArr[i]] = minePixel;
	}
}

function updateTouched(mineX, mineY){
	addTouching(mineX - 1, mineY - 1);
	addTouching(mineX, mineY - 1);
	addTouching(mineX + 1, mineY - 1);
	addTouching(mineX - 1, mineY);
	addTouching(mineX + 1, mineY);
	addTouching(mineX - 1, mineY + 1);
	addTouching(mineX, mineY + 1);
	addTouching(mineX + 1, mineY + 1);
}

function addTouching(x,y) {
	if(x <= fieldSize.x && y <= fieldSize.y && x > 0 && y > 0) {
		const touchingPixel = findPixel(x,y);
	touchingPixel.minesTouching = touchingPixel.minesTouching + 1;
	pixels[touchingPixel.id] = touchingPixel;
	}
}

function loadFlipped(){
	for (let i = 0; i < flippedArr.length; i++) {
		pixels[flippedArr[i]].flipped = true;
	}
}


// RENDER


function renderField() {
	const fieldDiv = document.querySelector(".field");

	while (fieldDiv.hasChildNodes()) {
		fieldDiv.lastChild.remove();
	}
	for (const pixel of pixels) {
		const pixelDiv = document.createElement("div")
		pixelDiv.classList.add("pixel");
		pixelDiv.dataset.position = [pixel.x, pixel.y];
		pixelDiv.dataset.isMine = pixel.isMine;
		pixelDiv.dataset.minesTouching = pixel.minesTouching;
		pixelDiv.innerText = "⬜";

		if(pixel.flipped){
			if(pixel.minesTouching == 0){
				pixelDiv.innerText = "▫️";
			} else {
				pixelDiv.innerText = number2emoji(pixel.minesTouching);
			}
			if(pixel.isMine && pixel.marked !== true){
				pixelDiv.innerText = "💥";
				renderSmiley("💀");
			}
		}
		if(pixel.isMine){
			if(pixel.marked == true){
				pixelDiv.innerText = "✅";
			}
			if(pixel.flipped !== true &&  pixel.marked !== true){
				pixelDiv.innerText = "💣";
			}
		}
		fieldDiv.append(pixelDiv);
	}
}

function number2emoji(number) {
	if(number == 1){
		return "1️⃣";
	}
	if(number == 2){
		return "2️⃣";
	}
	if(number == 3){
		return "3️⃣";
	}
	if(number == 4){
		return "4️⃣";
	}
	if(number == 5){
		return "5️⃣";
	}
	if(number == 6){
		return "6️⃣";
	}
	if(number == 7){
		return "7️⃣";
	}
	if(number == 8){
		return "8️⃣";
	}
	if(number == 9){
		return "9️⃣";
	}
}

function renderScore() {
	const scoreElement = document.getElementById("score");
	scoreElement.innerText = score;
}

function renderMinesLeft() {
	const minesElement = document.getElementById("minesLeft");
	const minesLeft = minesArr.length - markedArr.length;
	minesElement.innerText = minesLeft;
}
function renderSmiley(emoji) {
	const smileyElement = document.getElementById("smiley");
	smileyElement.innerText = emoji;
}

createField();
renderField();
renderScore();
renderMinesLeft();