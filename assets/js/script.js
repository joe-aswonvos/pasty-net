const question1 = {number:1, question:"What kind of arthropod has a name that means hundred feet in Latin?", answer:"centipede", lastLetters:"ede"};
const picture1 = {number:1, url:"assets/images/Eden_project.jpg", answer:"eden project", firstLetters:"ede"};

// document.addEventListener("DOMContentLoaded") {
// 	runGame();
// }

function runGame() {
	document.getElementById("question").textContent = question1.question;
	document.getElementById("picture").src = picture1.url;
	document.getElementById("picture").style.maxHeight = "300px";
	document.getElementById("answer-test").textContent = getAnswer();
}

function getAnswer() {
	let suffix = picture1.answer.slice(3);
	let combination = question1.answer.concat(suffix);
	return combination;
}

runGame();