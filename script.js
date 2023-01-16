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