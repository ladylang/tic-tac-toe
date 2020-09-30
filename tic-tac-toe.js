// if you only ever need ONE of something (gameBoard, displayController), use a module. 
// If you need multiples of something (players!), create them with factories.

// game board module - story current game state
const gameBoard = (() => {
    // array containing current board state
    const board = ["", "", "", "", "", "", "", "", ""];

    // check for win condition - 3 in a row 
    function checkBoard(currentPlayer) {
        console.log("check for winner"); 
        let winner = "none";
        if (board[0] === currentPlayer & board[1] === currentPlayer & board[2] === currentPlayer){
            winner = currentPlayer;
        } else if (board[3] === currentPlayer & board[4] === currentPlayer & board[5] === currentPlayer) {
            winner = currentPlayer;
        } else if (board[6] === currentPlayer & board[7] === currentPlayer & board[8] === currentPlayer) {
            winner = currentPlayer;
        } else if (board[0] === currentPlayer & board[3] === currentPlayer & board[6] === currentPlayer) {
            winner = currentPlayer;
        } else if (board[1] === currentPlayer & board[4] === currentPlayer & board[7] === currentPlayer) {
            winner = currentPlayer;
        } else if (board[2] === currentPlayer & board[5] === currentPlayer & board[8] === currentPlayer) {
            winner = currentPlayer;
        } else if (board[0] === currentPlayer & board[4] === currentPlayer & board[8] === currentPlayer) {
            winner = currentPlayer;
        } else if (board[2] === currentPlayer & board[4] === currentPlayer & board[6] === currentPlayer) {
            winner = currentPlayer;
        }
        console.log(winner);
        return winner;
    }
    return {board, checkBoard};

})();

// player object
const players = (() => {
    // player markers 
    const markerX = "X";
    const markerO = "O";

    return {markerX, markerO};
});


// game play module for moves
const playGame = (() => {
    let turn = 1;
    console.log(turn);

    // sets starting player
    let currentPlayer = "X";

    const btns = document.getElementById("board").querySelectorAll(".cell")
    btns.forEach(button => button.addEventListener("click", printMarker));

    // change player
    function switchPlayer() {
        if (currentPlayer === "X") {
            currentPlayer = "O";
        } else {
            currentPlayer = "X";
        }
    };

    // log player click location into display and currentBoard
    function printMarker() {
        console.log(this.id);
        console.log(currentPlayer);
        this.innerHTML = currentPlayer;
        let index = this.id;
        gameBoard.board[index] = currentPlayer;
        console.log(gameBoard.board);
        if (turn >= 5) {
           gameBoard.checkBoard(currentPlayer); 
        }
        switchPlayer();
        turn++;
    };

})();
