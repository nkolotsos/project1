/*----- constants -----*/
const BOARD_HEIGHT = 6; // number of attempts 
const BOARD_WIDTH = 5; // length of the word

/*----- app's state (variables) -----*/
// Player's current attempt (the row) and current letter to be guessed (col) 
let row = 0;
let col = 0;
let gameEnd = false;
let word = "SQUID";

/*----- event listeners -----*/
/* Taken from earlier classes. Used to init the board and new word 
for guessing on load. 
Was so confused as to why there was nothing being rendered initially
*/
document.addEventListener("DOMContentLoaded", init);

/*----- functions -----*/

// Initialise all state
function init() {
    createBoard();
}

function createBoard() {
    // Render a board 
    for (let i = 0; i < BOARD_HEIGHT; i++) {
        for (let j = 0; j < BOARD_WIDTH; j++) {
            let square = document.createElement("div");
            square.id = `${i.toString()}-${j.toString()}`;
            square.classList.add("square");
            square.innerText = "P";
            document.getElementById("board").appendChild(square);
        }
    }
}