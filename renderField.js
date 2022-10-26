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
		
		pixelDiv.addEventListener("click", flip);
		pixelDiv.addEventListener('contextmenu', mark);
		fieldDiv.append(pixelDiv);
	}
	// for (let i = 1; i < fieldSize[0] +1 ; i++) {
	// 	for (let j = 1; j < fieldSize[1] +1 ; j++) {
	// 		const pixel = document.createElement("div")
	// 		pixel.classList.add("pixel");
	// 		pixel.dataset.position = [j,i];
	// 		pixel.innerText = "⬜";
	// 		fieldDiv.append(pixel);
	// 	}
	// }
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

function flip(e){
	const position = e.target.dataset.position.split(",");
	const pixel = findPixel(Number(position[0]), Number(position[1]));
	// pixel.flipped = true;

	show(pixel.x, pixel.y);

	if(gameStarted !== true){
		gameStarted = true;
		startGame();
	}
	if(pixel.minesTouching  == 0 & pixel.isMine !== true){
		flipTouched(pixel.x, pixel.y);
	}
	if(pixel.isMine){
		pixel.flipped = true;
		gameOver();
	}
}

function show(x, y){
	const showPixelPosition = [x, y]
	const pixel = findPixel(x,y);
	
	const showPixel = document.querySelector("[data-position='" + showPixelPosition +"']");
	if(pixel.minesTouching == 0){
		showPixel.innerText = "▫️";
	} else {
		showPixel.innerText = number2emoji(pixel.minesTouching);
	}
	if(pixel.isMine){
		showPixel.innerText = "💥";
	}
	if(pixel.marked){
		showPixel.innerText = "🚩";
	}
}

function hide(x, y){
	const hidePixelPosition = [x, y]
	
	
	const hidePixel = document.querySelector("[data-position='" + hidePixelPosition +"']");
	hidePixel.innerText = "⬜";
}

function flipTouched(flipX, flipY){
	const pixel = findPixel(flipX, flipY)
	pixel.flipped = true;
	pixels[pixel.id] = pixel;

	flipTouching(flipX - 1, flipY - 1);
	flipTouching(flipX, flipY - 1);
	flipTouching(flipX + 1, flipY - 1);
	flipTouching(flipX - 1, flipY);
	flipTouching(flipX + 1, flipY);
	flipTouching(flipX - 1, flipY + 1);
	flipTouching(flipX, flipY + 1);
	flipTouching(flipX + 1, flipY + 1);
}

function flipTouching(x, y) {
	if(x <= fieldSize.x && y <= fieldSize.y && x > 0 && y > 0) {
		
		const touchingPixel = findPixel(x,y);
		if (touchingPixel.flipped !== true){
			
			show(touchingPixel.x, touchingPixel.y);
			touchingPixel.flipped = true;
			pixels[touchingPixel.id] = touchingPixel;

			if(touchingPixel.minesTouching == 0 && touchingPixel.isMine !== true) {
				flipTouched(touchingPixel.x, touchingPixel.y);
			}
		}
	}
}


function mark(e) {
	e.preventDefault();
	const position = e.target.dataset.position.split(",");
	const pixel = findPixel(Number(position[0]), Number(position[1]));
	
	if(pixel.flipped !== true){
		if(pixel.marked){
			pixel.marked = false;
			pixels[pixel.id] = pixel;
			hide(pixel.x, pixel.y);
		} else {
			pixel.marked = true;
			pixels[pixel.id] = pixel;
			show(pixel.x, pixel.y);
		}
	}
	marked = totalMarked();
	renderMinesLeft();

	if(marked == mines){
		gameOver();
	}
}

function totalMarked() {
	const markedPixels = pixels.filter(pixel => pixel.marked == true);
	return markedPixels.length;
}

function renderFieldGameOver() {
	const minesCorrect = pixels.filter(pixel => pixel.isMine == true &&  pixel.marked == true);
	const minesIncorrect = pixels.filter(pixel => pixel.isMine !== true &&  pixel.marked == true);
	const minesUndiscovered = pixels.filter(pixel => pixel.isMine == true &&  pixel.flipped !== true &&  pixel.marked !== true);

	for (const pixel of minesCorrect) {
		const solutionPixel = document.querySelector("[data-position='" + [pixel.x, pixel.y] +"']");
		solutionPixel.innerText = "✅";
	}

	for (const pixel of minesIncorrect) {
		const solutionPixel = document.querySelector("[data-position='" + [pixel.x, pixel.y] +"']");
		solutionPixel.innerText = "❌";
	}

	for (const pixel of minesUndiscovered) {
		const solutionPixel = document.querySelector("[data-position='" + [pixel.x, pixel.y] +"']");
		solutionPixel.innerText = "💣";
	}

	if(minesCorrect.length == mines) {
		renderSmiley("🤩")
	} else {
		renderSmiley("💀");
	}
}