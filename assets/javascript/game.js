// Category of words for the computer to choose randomly.
var words = ['Beauty and the Beast','The Lion King','Frozen','Aladdin','Cinderella','The Little Mermaid','Mary Poppins'];

// Choose the word randomly.
var randNum = Math.floor(Math.random() * words.length);

// Declaring variables
var chosenWord = words[randNum];
console.log("Chosen Word: " + chosenWord);
var underScore = [];
var rightWord = [];
var wrongWord = [];

// Dom manipulation
var docUnderScore = document.getElementsByClassName('underScore');
var docRightGuess = document.getElementsByClassName('rightGuess');
var docWrongGuess = document.getElementsByClassName('wrongGuess');



// Create underscores based on length of the chosenWord
var generateUnderScore = () => {
    for(var i = 0; i < chosenWord.length; i++) {
        underScore.push('_');
    }
    return underScore;
}
console.log(generateUnderScore());

// Get User's Guess
document.addEventListener('keypress', (event) => {
    var keyWord = String.fromCharCode(event.keyCode);
    console.log(keyWord);


// If User Guess is correct
if (chosenWord.indexOf(keyWord) > -1) {
    rightWord.push(keyWord);
    underScore[chosenWord.indexOf(keyWord)] = keyWord;
    underScore[0].innerHTML = underScore.join(' ');
    if (underScore.join('') === chosenWord) {
        alert('You win!');
        console.log(rightWord);
    }
    else {
        wrongWord.push(keyWord);
        console.log(wrongWord);
    }
}
});