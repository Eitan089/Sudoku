const easyboard = [
  [9, 0, 0, 5, 0, 8, 0, 0, 7],
  [0, 8, 0, 3, 0, 2, 9, 0, 5],
  [0, 5, 4, 0, 0, 0, 0, 8, 0],

  [0, 7, 0, 6, 8, 0, 0, 3, 2],
  [1, 0, 0, 0, 0, 4, 0, 0, 8],
  [5, 0, 0, 2, 1, 9, 0, 6, 0],

  [0, 0, 0, 9, 0, 6, 0, 0, 1],
  [7, 2, 6, 0, 0, 1, 0, 4, 0],
  [0, 0, 0, 4, 7, 0, 0, 5, 6],
];

var currentboard = [];

function startgame() {
  currentboard = boards[level].map((row) => [...row]);
  document.getElementById("menu").style.display = "none";
  document.getElementById("game").style.display = "block";
  drawBoard(currentboard);
}

function goBack() {
  document.getElementById("menu").style.display = "block";
  document.getElementById("game").style.display = "none";
}
function drawBoard(board) {
  const boardDiv = document.getElementById("board");
  boardDiv.innerHTML = "";
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      if ((j + 1) % 3 === 0 && j !== 8) {
        cell.style.borderRight = "3px solid black";
      }
      if ((i + 1) % 3 === 0 && i !== 8) {
        cell.style.borderBottom = "3px solid black";
      }
      const input = document.createElement("input");
      if (board[i][j] !== 0) {
        input.value = board[i][j];
        input.disabled = true;
        cell.classList.add("prefilled");
      } else {
        input.addEventListener("input", (e) => {
          var val = e.target.value;
          if (!/^[1-9]$/.test(val)) {
            e.target.value = "";
            board[i][j] = 0;
            e.target.style.backgroundColor = "white";
            return;
          }
          val = Number(val);
          board[i][j] = 0;
          if (!isValid(board, i, j, val)) {
            e.target.style.backgroundColor = "red";
          } else {
            board[i][j] = val;
            e.target.style.backgroundColor = "white";
          }
          board[i][j] = val;
        });
      }
      cell.appendChild(input);
      boardDiv.appendChild(cell);
    }
  }
}
function isValid(board, row, col, num) {
  for (var c = 0; c < 9; c++) {
    if (board[row][c] === num) {
      return false;
    }
  }
  for (var r = 0; r < 9; r++) {
    if (board[r][col] === num) {
      return false;
    }
  }
  var boxRow = Math.floor(row / 3) * 3;
  var boxCol = Math.floor(col / 3) * 3;
  for (var r = 0; r < 3; r++) {
    for (var c = 0; c < 3; c++) {
      if (board[boxRow + r][boxCol + c] === num) {
        return false;
      }
    }
  }
  return true;
}
