/*----- constants -----*/
const BOARD_HEIGHT = 6; // number of attempts 
const BOARD_WIDTH = 5; // length of the word

/*----- app's state (variables) -----*/
// Player's current attempt (the row) and current letter to be guessed (col) 
let col = 0;
let row = 0;
let gameEnd = false;
let word = "TULIP";

/*----- event listeners -----*/
/* Taken from earlier classes. Used to init the board and new word 
for guessing on load. 
Was so confused as to why there was nothing being rendered initially
*/
document.addEventListener("DOMContentLoaded", init);
document.addEventListener("keyup", handleKeyPress);

/*----- functions -----*/

// Initialise game board
function init() {
    createBoard();
}

function createBoard() {
    // Create game board 
    for (let i = 0; i < BOARD_HEIGHT; i++) {
        for (let j = 0; j < BOARD_WIDTH; j++) {
            let square = document.createElement("div");
            square.id = `${i.toString()}-${j.toString()}`;
            square.classList.add("square");
            square.innerText = "";
            document.getElementById("board").appendChild(square);
        }
    }
}

// function to handle user key input
function handleKeyPress(event) {
    // Check if game is over (win or run out of attempts)
    if (gameEnd === true) return;
    
    // Handle each potential key stroke
    if (isLetterAlphabet(event.key)) {
        handleLetterKey(event);
    } else if (event.key === "Backspace") {
        handleBackspaceKey();
    } else if (event.key === "Enter") {
        handleEnterKey();
        event.preventDefault();
    }

    // Check if player runs out of attempts
    if (!gameEnd && row === BOARD_HEIGHT) {
        gameEnd = true;
        document.getElementById("answer").innerText = word;
    }
}

// Check that key is letter/alphabet
function isLetterAlphabet(key) {
    return key.match(/[a-zA-Z]/);
}

// Handle letter key
function handleLetterKey(event) {
    const key = event.key.toUpperCase();
    if (isLetterAlphabet(key)) {
        if (col < BOARD_WIDTH) {
            let currentGuess = document.getElementById(`${row.toString()}-${col.toString()}`);
            if (currentGuess.innerText === "") {
                currentGuess.innerText = key;
                col++; 
            }
        }
    }
}

// Backspace key
function handleBackspaceKey() {
    if (col > 0 && col <= BOARD_WIDTH) {
        col--;
        let currentGuess = document.getElementById(`${row.toString()}-${col.toString()}`);
        currentGuess.innerText = "";
    }
}

// Enter key
function handleEnterKey() {
    checkGuess();
    row++; // Start new row
    col = 0; // Reset to first square
}


// Check current guess and update the board with correct, included, wrong
function checkGuess() {
    let rightLetters = 0;
    for (let i = 0; i < BOARD_WIDTH; i++) {
        let currentGuess = document.getElementById(`${row.toString()}-${col.toString()}`);
        let guessedLetter = currentGuess.innerText;

        if (word[i] === guessedLetter) {
            currentGuess.classList.add("correct");
            rightLetters++;
        } else if (word.includes(guessedLetter)) {
            currentGuess.classList.add("included");
        } else {
            currentGuess.classList.add("wrong");
        }

        // Check if all letters guessed are correct
        if (rightLetters === BOARD_WIDTH) {
            gameEnd = true;
        }
    }
}
