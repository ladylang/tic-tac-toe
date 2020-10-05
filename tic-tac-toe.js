// if you only ever need ONE of something (gameBoard, displayController), use a module. 
// If you need multiples of something (players!), create them with factories.

// game board module - story current game state
const gameBoard = (() => {
    // array containing current board state
    const board = ["", "", "", "", "", "", "", "", ""];

    // check for win condition - 3 in a row 
    function checkBoard(marker) {
        console.log("check for winner", marker); 
        let winner = false;
        if (board[0] === marker && board[1] === marker && board[2] === marker){
            winner = true;
            console.log("row1");
        } else if (board[3] === marker && board[4] === marker && board[5] === marker) {
            winner = true;
            console.log("row2");
        } else if (board[6] === marker && board[7] === marker && board[8] === marker) {
            winner = true;
            console.log("row3");
        } else if (board[0] === marker && board[3] === marker && board[6] === marker) {
            winner = true;
            console.log("col1");
        } else if (board[1] === marker && board[4] === marker && board[7] === marker) {
            winner = true;
            console.log("col2");
        } else if (board[2] === marker && board[5] === marker && board[8] === marker) {
            winner = true;
            console.log("col3");
        } else if (board[0] === marker && board[4] === marker && board[8] === marker) {
            winner = true;
            console.log("dia1");
        } else if (board[2] === marker && board[4] === marker && board[6] === marker) {
            winner = true;
            console.log("dia2");
        }
        return winner;
    }
    return {board, checkBoard};
})();

// player object
const createPlayers = (playerNum, user) => {
    // get users assigned
    let userName = user;
    let marker = "";

    if (playerNum == 1) {
        marker = "X";
    } else {
        marker = "O"; 
    };

    return {userName, marker}; 
};


// game play module
const game = (() => {
    const resetBtn = document.getElementById("reset");
    const startBtn = document.getElementById("start");

    const player1Input = document.getElementById("player1");
    const player2Input = document.getElementById("player2");

    function getPlayerInput() {
        // check for 2 name inputs before allowed to start game
        player1Input.addEventListener ("keyup", () => {
            if (player1Input.value != "" && player2Input.value != "") {
                startBtn.disabled = false;
            } else {
                startBtn.disabled = true;
            }
        });

        player2Input.addEventListener ("keyup", () => {
            if (player1Input.value != "" && player2Input.value != "") {
                startBtn.disabled = false;
            } else {
                startBtn.disabled = true;
            }
        });

        // start game
        startBtn.addEventListener("click", () => {
            playGame(player1Input.value, player2Input.value);
        });
    };
    
    getPlayerInput();

    function playGame(player1Name, player2Name) {
        const btns = document.getElementById("board").querySelectorAll(".cell")

        // change button states for start of game
        function startGame() {
            startBtn.disabled = true; 

            resetBtn.disabled = false;
            resetBtn.addEventListener("click", resetGame); 

            // assign eventlistener to board 
            btns.forEach((button) => {
                button.disabled = false;
                button.addEventListener("click", takeTurn);
            });
        };

        startGame();
        

        // get player info and create player
        let player1 = createPlayers(1, player1Name);
        let player2 = createPlayers(2, player2Name);

        console.log("start game", player1.userName, "and", player2.userName);

        // sets starting player
        let currentPlayer = player1;

        // change player
        function switchPlayer() {
            if (currentPlayer.userName === player1.userName) {
                currentPlayer = player2;
            } else {
                currentPlayer = player1;
            }
        };
        
        let turn = 1;
        let winner = false;

        function takeTurn() {
            // runs the turn and check for winner
            console.log(turn);
            logTurn(this);
            if (turn >= 5) {
                winner = gameBoard.checkBoard(currentPlayer.marker);
                console.log(winner);
                if (winner === true) {
                    endGame();
                } else {
                    switchPlayer();
                    turn++;
                };
            } else {
                switchPlayer();
                turn++;
            };
        }

        // log player click location into display and currentBoard
        function logTurn(button) {
            // display click on board, disable btn and change color
            button.innerHTML = currentPlayer.marker;
            button.disabled = "true";
            if (button.innerHTML == "X") {
                button.style.backgroundColor = "green";
            } else if (button.innerHTML == "O") {
                button.style.backgroundColor = "red";
            }

            // log click into the board object
            let index = button.id;
            gameBoard.board[index] = currentPlayer.marker;
            console.log(gameBoard.board);

        };

        function endGame() {
            console.log("Winner is " + currentPlayer.userName);
            btns.forEach(button => button.disabled = true);

        }

        function resetGame() {
            gameBoard.board.forEach((item) => {
                item = "";
            });
            turn = 1;
            winner = false;
            btns.forEach((button) => {
                button.innerHTML = "";
                button.style.backgroundColor = "#ffe4c4";
                button.disabled = true;
                button.removeEventListener("click", takeTurn);
            });
            resetBtn.disabled = true;
            player1Input.value = "";
            player2Input.value = "";
            console.log(turn);
        };
    };
})();

