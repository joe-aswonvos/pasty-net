
const maxGuesses = 6;
const gameTimeLimit = 180;
var randomWord;
var wrongGuessCount = 0;
var guesses;
var runningScore = 0;
var count = 0;
var timerRunning = false;

//When the document finishes loading, call the initialiseHangman function.
$("#hangman-tab").click(function () {
    initialiseHangman();
    resetGame();
});

function initialiseHangman() {

    //Add the on click handler to the play button.
    $("#hangman-play-btn").click(function () {
        //Hides the play button, shows the reset button and starts the game.
        $(this).css("display", "none");
        $("#hangman-reset-btn").css("display", "block");
        startHangmanGame();
    });
    //Add the on click handler to the reset button.
    $("#hangman-reset-btn").click(function () {
        //Hides the reset button, shows the play button and resets the game.
        $("#hangman-play-btn").css("display", "block");
        $(this).css("display", "none");
        resetGame();
    });



function startHangmanGame() {
    //Get a random word from the array of phrases.
    randomWord = phrases[Math.floor(Math.random() * phrases.length)];
    console.log(randomWord);

    //Set the hint text to the randomly chosen words hint.
    $("#hint-text").text("Hint: " + randomWord.hint);

    guesses = "_";
    //Loop for the length of the word, building up a string of guesses.
    for (i = 0; i < randomWord.word.length - 1; i++) {
        //console.log(randomWord.word.charAt(i));
        if(randomWord.word.charAt(i+1) == " " ){
            guesses = `${guesses} -`;
        } else {
            guesses = `${guesses} _`;
        }
    };
    //Add the string of guesses to the page.
    $("#guessed-letters").text(guesses);

    timerRunning = true;
    startHangmanTimer();
    populateLettersList();
}

function startHangmanTimer() {
    if (!timerRunning) return; // Stop the timer if running is false
    timeLeft = gameTimeLimit - count;
    $("#count-down").text(`Time Left: ${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? "0" : ""}${timeLeft % 60}`);
    count++;

    if (timeLeft <= 0) {
        //Stop timer.
        timerRunning = false;
        gameOver(false);
        count=0;
    }
    setTimeout(startHangmanTimer, 1000); // Call timer again after 1 second
}

//Creates the list of clickable letters.
function populateLettersList() {
    //Loop for each letter in the alphabet.
    $("#unguessed-letters").empty();
    for (i = 65; i <= 90; i++) {
        let letter = String.fromCharCode(i);
        //Add a new list item containing a button with a letter.
        $("#unguessed-letters").append(`<li><button id="${letter}">${letter}</button></li>`);

        //When a letter button is clicked.
        $(`#${letter}`).click(function () {
            //Get the button's ID (which is the letter).
            var clickedLetter = $(this).attr("id").toLowerCase();
            gameLogic(clickedLetter);
        });
    }

}

//Main game logic. Is the guessed letter in the word? etc.
function gameLogic (clickedLetter) {
  //Turns out we need the letter in uppercase form aswell.
  var uppercase = clickedLetter.toUpperCase()
  //If the letter is in the random word.
  if (randomWord.word.indexOf(clickedLetter) > -1) {
    //Loop through the random word, checking each letter for a match against the clicked letter.
    for (
      var index = randomWord.word.indexOf(clickedLetter);
      index >= 0;
      index = randomWord.word.indexOf(clickedLetter, index + 1)
    ) {
      //If a matching letter is found, replace the appropriate underscore in the guessed letters string.
      guesses = guesses.replaceAt(index * 2, clickedLetter)
    }
    //Set the text.
    $('#guessed-letters').text(guesses)
    //Hide the letter from the list.
    $(`#${uppercase}`).css('display', 'none')

    //First remove the spaces in the guessed word and then replace the - with spaces.
    if (guesses.replace(/\s+/g, '').replace(/-/g, ' ') == randomWord.word) {
      gameOver(true)
    }
  } else {
    //If the letter isn't in the random word.
    //Add 1 to wrong guess count.
    wrongGuessCount++
    $('.guesses-count').text(
      `Incorrect Guesses: ${wrongGuessCount} / ${maxGuesses}`
    )

    //Update the hangman image.
    setImage()

    //Hide the letter from the list.
    $(`#${uppercase}`).css('display', 'none')

    //If they've run out of guesses, end the game.
    if (wrongGuessCount == 6) {
      gameOver(false)
    }
  }
}

//Pass in either true or false to display the different modals. true = won, false = lost
function gameOver(winLose) {
    //Stop timer.
    timerRunning = false;
    count = 0;

    //Empty the list of letters so they can't keep playing.
    $("#unguessed-letters").empty();

    //Display a different message depending on if they won or not.
    if (winLose == true) {
        runningScore = runningScore + 10;
        $("#hangman-score").text(runningScore);
        updateTotalScore();
        $("#hangmanGameOverText").text("Congratulations! You won! The phrase was: " + randomWord.word);
     } else {
        $("#hangmanGameOverText").text("You Lost! You ran out of time or guesses! The correct phrase was: " + randomWord.word);
    }
}

//Reset everything back to how they were at the start.
function resetGame() {
    randomWord = "";
    wrongGuessCount = 0;
    $("#count-down").text("Time Left: 3:00");
    $(".guesses-count").text(`Incorrect Guesses: 0 / ${maxGuesses}`);
    $("#guessed-letters").text("_ _ _");
    $("#hangman-img").attr("src", "https://media.geeksforgeeks.org/wp-content/uploads/20240215173028/0.png");
    $("#hint-text").text("Hint: Blank");
    $("#unguessed-letters").empty();
    $("#hangmanGameOverText").text("");
    timerRunning = false;
    count = 0;
}

//Update the total score. stolen from joe ;)
function updateTotalScore () {
  const scoreElements = document.querySelectorAll('.scoreToTot')
  let totalScore = 0

  scoreElements.forEach(element => {
    totalScore += parseInt(element.textContent, 10) || 0
  })

  const totalScoreElement = document.getElementById('totalscore')
  if (totalScoreElement) {
    totalScoreElement.textContent = totalScore
  }
}

//Custom string function for replacing chars at specific indexes.
String.prototype.replaceAt = function (index, replacement) {
  return (
    this.substring(0, index) +
    replacement +
    this.substring(index + replacement.length)
  )
}

//Sets the hangman image.
function setImage () {
  if (wrongGuessCount === 0) {
    $('#hangman-img').attr(
      'src',
      'https://media.geeksforgeeks.org/wp-content/uploads/20240215173028/0.png'
    )
  }
  if (wrongGuessCount === 1) {
    $('#hangman-img').attr(
      'src',
      'https://media.geeksforgeeks.org/wp-content/uploads/20240215173033/1.png'
    )
  }
  if (wrongGuessCount === 2) {
    $('#hangman-img').attr(
      'src',
      'https://media.geeksforgeeks.org/wp-content/uploads/20240215173038/2.png'
    )
  }
  if (wrongGuessCount === 3) {
    $('#hangman-img').attr(
      'src',
      'https://media.geeksforgeeks.org/wp-content/uploads/20240215172733/3.png'
    )
  }
  if (wrongGuessCount == 4) {
    $('#hangman-img').attr(
      'src',
      'https://media.geeksforgeeks.org/wp-content/uploads/20240215173815/4.png'
    )
  }
  if (wrongGuessCount === 5) {
    $('#hangman-img').attr(
      'src',
      'https://media.geeksforgeeks.org/wp-content/uploads/20240215173859/5.png'
    )
  }
  if (wrongGuessCount === 6) {
    $('#hangman-img').attr(
      'src',
      'https://media.geeksforgeeks.org/wp-content/uploads/20240215173931/6.png'
    )
  }
}

//List of phrases.
const phrases = [
  {
    word: 'pard',
    hint: 'friend, right on ____'
  },
  {
    word: 'proper job',
    hint: 'when something is done well'
  },
  {
    word: 'dreckly',
    hint: "i'll do it when I'm ready"
  },
  {
    word: 'mizzle',
    hint: 'mist and drizzle'
  },
  {
    word: 'my lover',
    hint: 'what the pasty lady calls you'
  },
  {
    word: 'wasson',
    hint: "what's going on"
  },
  {
    word: 'ansum',
    hint: 'thats a proper ______ pasty'
  },
  {
    word: 'right on',
    hint: 'okay'
  },
  {
    word: 'up north',
    hint: 'above the tamar'
  },
  {
    word: 'pasty',
    hint: 'breakfast, lunch and dinner'
  }
]
