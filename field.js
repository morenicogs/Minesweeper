const fieldSize = {x: 16, y: 16}
const pixels = [];
let marked;
const mines = 40;
let gameStarted = false;

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

	for (let i = 0; i < mines; i++) {
		addMine();
	}
}



function findPixel(x,y){
	const filterPixelsX = pixels.find(pixel => pixel.x == x && pixel.y == y);
	return filterPixelsX;
}


function addMine(){
	const mineX = Math.floor(Math.random() * fieldSize.x) + 1;
	const mineY = Math.floor(Math.random() * fieldSize.y) + 1;
	const minePixel = findPixel(mineX, mineY);
	if (!minePixel.isMine) {
		minePixel.isMine = true;
		updateTouched(mineX, mineY);
		pixels[minePixel.id] = minePixel;
	} else {
		addMine();
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


