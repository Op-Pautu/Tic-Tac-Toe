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
    }
    
    function play(event) {
      let cell = event.target;
      if(!cell.innerHTML){
          let index = cell.getAttribute("data-index");
          Gameboard.board[index] = currentPlayer.symbol;
          render();
          checkWin();
          switchPlayer();
      }
    }
    function checkWin() {
        // check for win conditions
      }
      
      function switchPlayer() {
        currentPlayer = (currentPlayer === player1) ? player2 : player1;
      }
    
      return {
        play: play,
        render: render
      }
    })();
    