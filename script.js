// Gameboard object
const Gameboard = {
  board: ['', '', '', '', '', '', '', '', ''],
  render: function() {
    for (let i = 0; i < this.board.length; i++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("data-index", i);
      cell.innerHTML = this.board[i];
      document.querySelector("#board").appendChild(cell);
    }
  },
  addMark: function(index, symbol) {
    if(this.board[index] === '') {
      this.board[index] = symbol;
    }
  }
}

// Player factory function
function createPlayer(symbol) {
  return {
    symbol: symbol,
    win: false
  }
}

// Game flow module
const game = (function() {
  let player1 = createPlayer("X");
  let player2 = createPlayer("O");
  let currentPlayer = player1;
  
  function render() {
    Gameboard.render();
    const cells = document.querySelectorAll(".cell");
    for(let i = 0; i < cells.length; i++) {
      cells[i].innerHTML = Gameboard.board[i];
    }
  }
  
  
  function play(event) {
    let cell = event.target;
    if(!cell.innerHTML){
      let index = cell.getAttribute("data-index");
      Gameboard.addMark(index, currentPlayer.symbol);
        render();
        checkWin();
        checkTie();
        switchPlayer();
    }
  }
  function checkWin() {
    const winCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]  // diagonals
  ];
    for (let i = 0; i < winCombinations.length; i++) {
      let a = winCombinations[i][0];
      let b = winCombinations[i][1];
      let c = winCombinations[i][2];
      if (Gameboard.board[a] === currentPlayer.symbol && Gameboard.board[b] === currentPlayer.symbol && Gameboard.board[c] === currentPlayer.symbol) {
        currentPlayer.win = true;
        showWinner();
        break;
      }
    }
  }
  function checkTie() {
    let emptyCells = Gameboard.board.filter(cell => cell === '');
    if(emptyCells.length === 0 && !currentPlayer.win) {
      showTie();
    }
  }
  function switchPlayer() {
    currentPlayer = (currentPlayer === player1) ? player2 : player1;
  }
  function showWinner() {
    document.querySelector("#winner").innerHTML = currentPlayer.symbol + " wins!";
    disableBoard();
  }
  function showTie() {
    document.querySelector("#winner").innerHTML = "It's a tie!";
    disableBoard();
  }
  function disableBoard() {
    let cells = document.querySelectorAll(".cell");
    for(let i = 0; i < cells.length; i++) {
      cells[i].style.pointerEvents = "none";
    }
  }
  function restartGame() {
    Gameboard.board = ['', '', '', '', '', '', '', '', ''];
    player1.win = false;
    player2.win = false;
    currentPlayer = player1;
    game.render();
    let cells = document.querySelectorAll(".cell");
    for(let i = 0; i < cells.length; i++) {
      cells[i].style.pointerEvents = "auto";
    }
    document.querySelector("#winner").innerHTML = "";
  }
  
  return {
    play: play,
    render: render,
    checkWin: checkWin,
    checkTie: checkTie,
    showWinner: showWinner,
    switchPlayer: switchPlayer,
    disableBoard: disableBoard,
    restartGame: restartGame
  }
})();
// Listen for clicks on the gameboard
document.querySelector("#board").addEventListener("click", game.play);

// Render the initial gameboard
game.render();