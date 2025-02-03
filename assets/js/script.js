const question1 = {number:1, question:"The name of which arthropod means one hundred feet in Latin?", answer:"centipede", lastLetters:"ede"};
const picture1 = {number:1, url:"assets/images/Eden_project.jpg", answer:"eden project", firstLetters:"ede", lettersToCut: 3};

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
	document.getElementById("question").textContent = question1.question;
	document.getElementById("picture").src = picture1.url;
	document.getElementById("picture").style.maxHeight = "300px";
	document.getElementById("answer-test").textContent = getAnswer();
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
	let suffix = picture1.answer.slice(picture1.lettersToCut);
	let combination = question1.answer.concat(suffix);
	return combination;
}

function checkAnswer() {
	let userAnswer = document.getElementById("answer-box").value;
	let calculatedAnswer = getAnswer();
	let isCorrect = userAnswer === calculatedAnswer;
	if (isCorrect) {
		alert("Hey! You got it right! :D");
		//incrementScore();
	} else {
		alert(`Your answer of ${userAnswer} was wrong, the correct answer is ${calculatedAnswer}!`)
		//incrementWrongAnswer();
	}
}

// runGame();