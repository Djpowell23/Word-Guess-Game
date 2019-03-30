// Array of Words
var words = ["monkey","fish","donkey","elephant","kangaroo"];
// Defining Variables
const lives = 3;
var guessedLetters = [];
var currentWordIndex;
var guessingWord = [];
var remainingGuesses = 3;
var hasFinished = false;
var wins = 0;

// Function to set up all the variables
    // Reset Game Level Variables
    function resetGame() {
        remainingGuesses = lives;

        // Computer Randomly picks a word and puts it into an index.
        currentWordIndex = Math.floor(Math.random() * (words.length));

        // Reset arrays
        guessedLetters = [];
        guessingWord = [];

        // Build the word and clear it out
        for (var i = 0; i < words[currentWordIndex].length; i++) {
            guessingWord.push("_");
        }

        // Hide the Game Over and win/text images
        document.getElementById("pressKeyTryAgain").style.cssText="display:none";
        document.getElementById("pressKeyKeepPlaying").style.cssText="display:none";
        // document.getElementById("gameover-image").style.cssText = "display: none";
        // document.getElementById("youwin-image").style.cssText = "display: none";

        // Runs function updateDisplay
        updateDisplay();
    };

// Function to update the Display to the HTML page
    function updateDisplay() {
        document.getElementById("totalWins").innerText = wins;
        document.getElementById("currentWord").innerText = "";
        for (var i = 0; i < guessingWord.length; i++) {
            document.getElementById("currentWord").innerText += guessingWord[i];
        }
        document.getElementById("remainingGuesses").innerText = remainingGuesses;
        document.getElementById("guessedLetters").innerText = guessedLetters;
        // If the user has lost
        if(remainingGuesses <= 0) {
            // document.getElementById("gameover-image").style.cssText = "display: block";
            document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
            hasFinished = true;
        }
    };

// On Key-up event
    document.onkeyup = function(event) {
        document.getElementById("pressKeyGetStarted").style.cssText="display:none";
        // If finished a game, dump one keystroke and reset.
        if(hasFinished) {
            document.getElementById("pressKeyKeepPlaying").style.cssText="display:block";
            resetGame();
            hasFinished = false;
        } else {
            // Check to make sure a-z was pressed.
            if(event.keyCode >= 65 && event.keyCode <= 90) {
                makeGuess(event.key.toLowerCase());
            }
        }
    };

// Function to make a guess when a key a through z has been pressed
function makeGuess(letter) {
    if (remainingGuesses > 0) {
        // Make sure the guess has not already been logged this roung
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            // Make a function to evaluate the guess more
            evaluateGuess(letter);
        }
    }
    updateDisplay();
    // Call a function that checks to see if that was the final guess to win current word
    checkWin();
};

// Evaluate Guess will check the user's guess to find any and all occurrences in the current word
function evaluateGuess(letter) {
    // An array for the positions of occurrences
    var positions = [];
    // For loop that goes through the word, finds an occurrence, and logs it's position.
    for (var i = 0; i < words[currentWordIndex].length; i++) {
        if(words[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }
    // If there are no occurrences of the user's guess, lose a life
    if (positions.length <= 0) {
        remainingGuesses--;
    } else {
        // Replace the '_' with the correct letter
        for (i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};

// Function to check to see if the user has won
function checkWin() {
    // If there are no more "_"'s left in the guessingWord, you win and game finishes, ready to reset
    if(guessingWord.indexOf("_") === -1) {
        // document.getElementById("youwin-image").style.cssText = "display: block";
        document.getElementById("pressKeyKeepPlaying").style.cssText= "display: block";
        wins++;
        hasFinished = true;
    }

};