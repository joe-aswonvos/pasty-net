/* Questions and answers are arrays containing the questions as objects. Ideally these would be in an external file but for now they live here */
const questions = [];
const pictures = [];
questions[0] = {question:"The name of what predatory arthropod, usually found in dark, humid environments, means one hundred feet in Latin?", answer:"centipede", lastLetters:"ede"};
pictures[0] = {url:"assets/images/comboPicture1.jpg", alt:"Spherical biomes surrounding the botanical gardens of this visitor attraction near St Austell, seen from a raised viewing platform", answer:"Eden Project", firstLetters:"ede", lettersToCut:3};
questions[1] = {question:"Which game in The Legend of Zelda series released on the Super NES saw Link travel between the Light World and the Dark World?", answer:"A Link to the Past", lastLetters: "past"};
pictures[1] = {url:"assets/images/comboPicture2.jpeg", alt:"Pastry typically filled with meat and vegetables, baked in a folded and crimped shortcrust pastry circle", answer:"pasty", firstLetters:"past", lettersToCut:4};
questions[2] = {question:"Which star of sitcom The Vicar of Dibley was named as the Chancellor of Falmouth University in 2014?", answer:"Dawn French", lastLetters: "ch"};
pictures[2] = {url:"assets/images/comboPicture3.jpg", alt:"Corvid with red beak and legs, recently returned to breeding in Cornwall and features on the Cornwall Coat of Arms", answer:"chough", firstLetters:"ch", lettersToCut:2};
let questionNumber = 0;
let questionsTotal = 3;
let wrongTries = 0;

document.addEventListener("DOMContentLoaded", init);

/**
 * Initialises the program
 */
function init() {
	let textInput = document.getElementById("combo-attempt");
	textInput.addEventListener("keypress", function(event) {
		if (event.key === "Enter") {
			checkAnswer();
		}
	});
	document.getElementById("combo-feedback").style.display = "none";
	document.getElementById("combo-next").style.display = "none";
	runGame();
}

/**
 * Starts the game, also restarts core game loop with next question
 * Hides elements that are shown after answer attempts are made
 */
function runGame() {
	document.getElementById("combo-question").textContent = questions[questionNumber].question;
	document.getElementById("combo-picture").src = pictures[questionNumber].url;
	document.getElementById("combo-picture").alt = pictures[questionNumber].alt;
	document.getElementById("combo-picture").style.maxHeight = "300px";
	document.getElementById("combo-input").style.display = "block";
	document.getElementById("combo-attempt").value = "";
	document.getElementById("combo-answer").style.display = "none";
	document.getElementById("combo-feedback").style.display = "none";
	document.getElementById("combo-next").style.display = "none";
	wrongTries = 0;
	document.getElementById("combo-submit").onclick = checkAnswer;
}

/**
 * Works out the answer by taking the first letters off the picture answer and concatenates the strings
 */
function getAnswer() {
	let suffix = pictures[questionNumber].answer.slice(pictures[questionNumber].lettersToCut);
	let combination = questions[questionNumber].answer.concat(suffix);
	combination = combination.toUpperCase();
	return combination;
}

/**
 * Acquires user input answer and compares it to calculated answer
 * If correct, congratulates user, moves to next question and restarts game loop
 * If incorrect, gives two more attempts, if attempts are depleted then gives user the answer and a button to go to next question
 */
function checkAnswer() {
	let userAnswer = document.getElementById("combo-attempt").value;
	userAnswer = userAnswer.toUpperCase();
	let calculatedAnswer = getAnswer();
	let isCorrect = userAnswer === calculatedAnswer;
	if (isCorrect) {
		document.getElementById("combo-input").style.display = "none";
		document.getElementById("combo-answer").textContent = calculatedAnswer;
		document.getElementById("combo-answer").style.display = "block";
		document.getElementById("combo-feedback").style.display = "block";
		document.getElementById("combo-feedback").textContent = "Correct!";
		document.getElementById("combo-next").style.display = "inline";
		incrementScore();
		++questionNumber;
		if (questionNumber == questionsTotal) {
			questionNumber = 0;
		}
		document.getElementById("combo-next").onclick = runGame;
	} else {
		++wrongTries;
		document.getElementById("combo-feedback").style.display = "block";
		document.getElementById("combo-feedback").textContent = "Incorrect, try again! " + (3 - wrongTries) + " tries left.";
		if (wrongTries == 3) {
			++questionNumber;
			if (questionNumber == questionsTotal) {
				questionNumber = 0;
			}
			document.getElementById("combo-input").style.display = "none";
			document.getElementById("combo-feedback").textContent = `Your answer of ${userAnswer} was wrong, the correct answer is ${calculatedAnswer}!`;
			document.getElementById("combo-next").style.display = "inline";
			document.getElementById("combo-next").onclick = runGame;
		}
	}
}

/**
 * Increases score for this game, not the overall website score
 * Can currently be increased forever as the game loop doesn't end if the user puts in the same right answer for repeated questions
 * I'll set a cap soon
 */
function incrementScore() {
	let oldScore = parseInt(document.getElementById("combo-score").innerText);
	document.getElementById("combo-score").innerText = ++oldScore
}