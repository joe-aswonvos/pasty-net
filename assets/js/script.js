const questions = [];
const pictures = [];
questions[0] = {number:1, question:"The name of which arthropod means one hundred feet in Latin?", answer:"centipede", lastLetters:"ede"};
pictures[0] = {number:1, url:"assets/images/Eden_project.jpg", answer:"eden project", firstLetters:"ede", lettersToCut:3};
questions[1] = {number:2, question:"Which game in <em>The Legend of Zelda</em> series released on the Super NES saw Link travel between the Light World and the Dark World?", answer:"a link to the past", lastLetters: "past"};
pictures[1] = {number:2, url:"assets/images/picture2.png", answer:"pasty", firstLetters:"past", lettersToCut:4};
// const questions = ["question1", "question2"];
// const pictures = ["picture1", "picture2"];
questionNumber = 0;

// document.addEventListener("DOMContentLoaded", function() {
// 	let submitAnswer = document.getElementById("combo-submit");
// 	submitAnswer.addEventListener("click", function() {
// 		if (this.getAttribute("data-type") === "submit") {
// 			checkAnswer();
// 		} else {
// 			runGame();
// 		}
// 	})
// 	runGame();
// })
document.addEventListener("DOMContentLoaded", runGame);

function runGame() {
	document.getElementById("question").textContent = questions[questionNumber].question;
	document.getElementById("picture").src = pictures[questionNumber].url;
	document.getElementById("picture").style.maxHeight = "300px";
	// document.getElementById("answer-test").textContent = getAnswer();
	document.getElementById("combo-submit").onclick = checkAnswer;
	let textInput = document.getElementById("answer-box");
	textInput.addEventListener("keypress", function(event) {
		if (event.key === "Enter") {
			checkAnswer();
		}
	});
	// let submitAnswer = document.getElementById("combo-submit");
	// submitAnswer.addEventListener("click", checkAnswer);
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
		runGame();
	} else {
		alert(`Your answer of ${userAnswer} was wrong, the correct answer is ${calculatedAnswer}!`)
		//incrementWrongAnswer();
	}
}

function incrementScore() {
	let oldScore = parseInt(document.getElementById("combo-score").innerText);
	document.getElementById("combo-score").innerText = ++oldScore
}