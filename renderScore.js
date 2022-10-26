const scoreElement = document.getElementById("score");
const minesElement = document.getElementById("minesLeft");
const smileyElement = document.getElementById("smiley");

function renderScore() {
	const score = timeElapsed.toString().padStart(3, "0");
	scoreElement.innerText = score;
}

function renderMinesLeft() {
	marked = totalMarked();
	minesElement.innerText = mines - marked;
};

function renderSmiley(emoji) {
	smileyElement.innerText = emoji;
}