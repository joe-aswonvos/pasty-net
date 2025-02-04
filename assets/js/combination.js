const questions = [];
const pictures = [];
questions[0] = {question:"The name of which arthropod means one hundred feet in Latin?", answer:"centipede", lastLetters:"ede"};
pictures[0] = {url:"assets/images/Eden_project.jpg", answer:"eden project", firstLetters:"ede", lettersToCut:3};
questions[1] = {question:"Which game in The Legend of Zelda series released on the Super NES saw Link travel between the Light World and the Dark World?", answer:"a link to the past", lastLetters: "past"};
pictures[1] = {url:"assets/images/picture2.png", answer:"pasty", firstLetters:"past", lettersToCut:4};
questionNumber = 0;
questionsTotal = 2;

document.addEventListener("DOMContentLoaded", init);

function init() {
	let textInput = document.getElementById("answer-box");
	textInput.addEventListener("keypress", function(event) {
		if (event.key === "Enter") {
			checkAnswer();
		}
	});
	runGame();
}

function runGame() {
	document.getElementById("question").textContent = questions[questionNumber].question;
	document.getElementById("picture").src = pictures[questionNumber].url;
	document.getElementById("picture").style.maxHeight = "300px";
	document.getElementById("answer-box").value = "";
	// document.getElementById("answer-test").textContent = getAnswer();
	document.getElementById("combo-submit").onclick = checkAnswer;
}

function getAnswer() {
	let suffix = pictures[questionNumber].answer.slice(pictures[questionNumber].lettersToCut);
	let combination = questions[questionNumber].answer.concat(suffix);
	return combination;
}

function checkAnswer() {
	let userAnswer = document.getElementById("answer-box").value;
	let calculatedAnswer = getAnswer();
	let isCorrect = userAnswer === calculatedAnswer;
	if (isCorrect) {
		alert("Hey! You got it right! :D");
		incrementScore();
		++questionNumber;
		if (questionNumber == questionsTotal) {
			questionNumber = 0;
		}
		runGame();
	} else {
		alert(`Your answer of ${userAnswer} was wrong, the correct answer is ${calculatedAnswer}!`)
	}
}

function incrementScore() {
	let oldScore = parseInt(document.getElementById("combo-score").innerText);
	document.getElementById("combo-score").innerText = ++oldScore
}