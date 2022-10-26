const smileyDiv = document.getElementById("smiley");
smileyDiv.addEventListener("click", newGame);

let currentInterval;
let timeElapsed;

function newGame() {
	clearInterval(currentInterval);
	timeElapsed = 0;
	pixels.length = 0;
	marked = 0;
	gameStarted = false;
	createField();
	renderField();
	renderMinesLeft();
}

function startGame(){
	clearInterval(currentInterval);
	currentInterval = setInterval( () => {
		timeElapsed += 1
		renderScore();
	}, 1000)
}

function gameOver() {
	renderFieldGameOver();
	clearInterval(currentInterval)
}

function winGame() {
	renderFieldGameOver();
	clearInterval(currentInterval)

}

newGame();