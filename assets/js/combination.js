const questions = [];
const pictures = [];
questions[0] = {question:"The name of what predatory arthropod, usually found in dark, humid environments, means one hundred feet in Latin?", answer:"CENTIPEDE", lastLetters:"EDE"};
pictures[0] = {url:"assets/images/comboPicture1.jpg", answer:"EDEN PROJECT", firstLetters:"EDE", lettersToCut:3};
questions[1] = {question:"Which game in The Legend of Zelda series released on the Super NES saw Link travel between the Light World and the Dark World?", answer:"A LINK TO THE PAST", lastLetters: "PAST"};
pictures[1] = {url:"assets/images/comboPicture2.png", answer:"PASTY", firstLetters:"PAST", lettersToCut:4};
let questionNumber = 0;
let questionsTotal = 2;
let wrongTries = 0;

document.addEventListener("DOMContentLoaded", init);

function init() {
	let textInput = document.getElementById("combo-answer");
	textInput.addEventListener("keypress", function(event) {
		if (event.key === "Enter") {
			checkAnswer();
		}
	});
	document.getElementById("combo-answered").style.display = "none";
	document.getElementById("combo-next").style.display = "none";
	runGame();
}

function runGame() {
	document.getElementById("combo-question").textContent = questions[questionNumber].question;
	document.getElementById("combo-picture").src = pictures[questionNumber].url;
	document.getElementById("combo-picture").style.maxHeight = "300px";
	document.getElementById("combo-input").style.display = "block";
	document.getElementById("combo-answer").value = "";
	document.getElementById("combo-answered").style.display = "none";
	document.getElementById("combo-next").style.display = "none";
	wrongTries = 0;
	// debugging/cheating:
	// document.getElementById("answer-test").textContent = getAnswer();
	document.getElementById("combo-submit").onclick = checkAnswer;
}

function getAnswer() {
	let suffix = pictures[questionNumber].answer.slice(pictures[questionNumber].lettersToCut);
	let combination = questions[questionNumber].answer.concat(suffix);
	return combination;
}

function checkAnswer() {
	let userAnswer = document.getElementById("combo-answer").value;
	userAnswer = userAnswer.toUpperCase();
	let calculatedAnswer = getAnswer();
	let isCorrect = userAnswer === calculatedAnswer;
	if (isCorrect) {
		document.getElementById("combo-input").style.display = "none";
		document.getElementById("combo-result").textContent = "Correct!";
		document.getElementById("combo-answered").style.display = "inline";
		document.getElementById("combo-next").style.display = "inline";
		incrementScore();
		++questionNumber;
		if (questionNumber == questionsTotal) {
			questionNumber = 0;
		}
		document.getElementById("combo-next").onclick = runGame;
	} else {
		++wrongTries;
		document.getElementById("combo-answered").style.display = "inline";
		document.getElementById("combo-result").textContent = "Incorrect, try again! " + (3 - wrongTries) + " tries left.";
		if (wrongTries == 3) {
			++questionNumber;
			if (questionNumber == questionsTotal) {
				questionNumber = 0;
			}
			document.getElementById("combo-input").style.display = "none";
			document.getElementById("combo-result").textContent = `Your answer of ${userAnswer} was wrong, the correct answer is ${calculatedAnswer}!`;
			document.getElementById("combo-next").style.display = "inline";
			document.getElementById("combo-next").onclick = runGame;
		}
	}
}

function incrementScore() {
	let oldScore = parseInt(document.getElementById("combo-score").innerText);
	document.getElementById("combo-score").innerText = ++oldScore
}