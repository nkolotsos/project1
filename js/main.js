/*----- constants -----*/
const BOARD_HEIGHT = 6; // number of attempts 
const BOARD_WIDTH = 5; // length of the word

/*----- app's state (variables) -----*/
// Player's current attempt (the row) and current letter to be guessed (col) 
let col = 0;
let row = 0;
let gameEnd = false;

import {guessList, wordList} from "./wordlist.js";
// Add wordList to guessList (guessList does not contain wordList)

let combinedList = guessList.concat(wordList);

// Randomised word
let word = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();


/*----- event listeners -----*/
/* Taken from earlier classes. Used to init the board and new word 
for guessing on load. 
Was so confused as to why there was nothing being rendered initially
*/
document.addEventListener("DOMContentLoaded", init);
document.addEventListener("keyup", handleKeyPress);

/*----- functions -----*/

// Initialise game board and keyboard
function init() {
    createBoard();
    createKeyboard();
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

function createKeyboard() {
    let keyboard = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["Enter", "Z", "X", "C", "V", "B", "N", "M", "⌫" ]
    ]
      
    const keyboardContainer = document.getElementById("keyboard");
    
    // Iterate through array 
    keyboard.forEach((row, rowIndex) => {
        const rowContainer = document.getElementById(`r-${rowIndex}`);
        rowContainer.classList.add("kb-row");
      
        row.forEach((key) => {
          const keyCap = document.createElement("div");
          keyCap.classList.add("keycap");
            
          // Set the ID and text of the keycap based on the value of key(letter)
          if (key === "Backspace") {
            keyCap.id = "Backspace";
            keyCap.textContent = "⌫";
          } else if (key === "Enter") {
            keyCap.id = "Enter";
            keyCap.textContent = "Enter";
            keyCap.classList.add("enter-keycap");
          } else {
            keyCap.id = "Key" + key;
            keyCap.textContent = key;
          }
      
          rowContainer.appendChild(keyCap);
        });
        keyboardContainer.appendChild(rowContainer);
      });
}

// function to handle user key input
function handleKeyPress(event) {
    // Check if game is over (win or run out of attempts)
    if (gameEnd === true) return;
    
    // Handle each potential key stroke
    if ("KeyA" <= event.code && event.code <= "KeyZ") {
        handleLetterKey(event);
    } else if (event.code === "Backspace") {
        handleBackspaceKey();
    } else if (event.code === "Enter") {
        handleEnterKey();
    }

    // Check if player runs out of attempts
    if (!gameEnd && row === BOARD_HEIGHT) {
        gameEnd = true;
        document.getElementById("message-display").innerText = word;
    }
}

// Handle letter key
function handleLetterKey(event) {
    const letter = event.code[3];
    if (col < BOARD_WIDTH) {
        let currentGuess = document.getElementById(`${row.toString()}-${col.toString()}`);
        if (currentGuess.innerText === "") {
            currentGuess.innerText = letter;
            col++; 
        }
    }
}

// Backspace key
function handleBackspaceKey() {
    if (col > 0 && col <= BOARD_WIDTH) {
        col--;
    }
    let currentGuess = document.getElementById(`${row.toString()}-${col.toString()}`);
    currentGuess.innerText = "";
}

// Enter key
function handleEnterKey() {
    checkGuess();
    row += 1; // Start new row
    col = 0; // Reset to first square
}

// Check current guess and update the board with correct, included, wrong
function checkGuess() {
    let rightLetters = 0;
    for (let i = 0; i < BOARD_WIDTH; i++) {
        let currentGuess = document.getElementById(`${row.toString()}-${i.toString()}`);
        let guessedLetter = currentGuess.innerText;

        if (word[i] == guessedLetter) {
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
        
        // Show correct/included/wrong on keyboard too
        keycapUpdate(guessedLetter);
    }
}

function keycapUpdate(letter) {
    const keycap = document.getElementById("Key" + letter);
    
    if (word.includes(letter)) {
        if (word[col] === letter) {
            keycap.classList.add("correct");
        } else {
            keycap.classList.add("included");
        }
    } else {
        keycap.classList.add("wrong");
    }
}
