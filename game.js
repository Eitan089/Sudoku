var puzzle = [
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
var userBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],

  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],

  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];
var solution = [];
var selectedCell = null;
function renderGrid() {
  var gridEl = document.getElementById("grid");
  gridEl.innerHTML = "";

  for (var r = 0; r < 9; r++) {
    for (var c = 0; c < 9; c++) {
      var cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.row = r;
      cell.dataset.col = c;
      if (c === 2 || c === 5) {
        cell.classList.add("thick-right");
      }
      if (r === 2 || r === 5) {
        cell.classList.add("thick-bottom");
      }
      if (puzzle[r][c] !== 0) {
        cell.textContent = puzzle[r][c];
        cell.classList.add("given");
      } else if (userBoard[r][c] !== 0) {
        cell.textContent = userBoard[r][c];
        cell.classList.add("user-input");
      }
      cell.addEventListener(
        "click",
        (function (row, col) {
          return function () {
            onCellClick(row, col);
          };
        })(r, c),
      );

      gridEl.appendChild(cell);
    }
  }
}
function onCellClick(r, c) {
  selectedCell = { row: r, col: c };
  highLightCells(r, c);
}
function highLightCells(row, col) {
  document.querySelectorAll(".cell").forEach(function (el) {
    el.classList.remove("selected", "highlight");
  });

  var selectedVal =
    puzzle[row][col] !== 0 ? puzzle[row][col] : userBoard[row][col];

  document.querySelectorAll(".cell").forEach(function (el) {
    var r = parseInt(el.dataset.row);
    var c = parseInt(el.dataset.col);

    var sameRow = r === row;
    var sameCol = c === col;
    var sameBox =
      Math.floor(r / 3) === Math.floor(row / 3) &&
      Math.floor(c / 3) === Math.floor(col / 3);

    var cellVal = puzzle[r][c] !== 0 ? puzzle[r][c] : userBoard[r][c];

    var sameNumber = selectedVal !== 0 && cellVal === selectedVal;
    if (r === row && c === col) {
      el.classList.add("selected");
    } else if (sameRow || sameCol || sameBox || sameNumber) {
      el.classList.add("highlight");
    }
  });
}
document.addEventListener("keydown", function (e) {
  if (!selectedCell) return;

  var key = e.key;

  if (key >= "1" && key <= "9") {
    enterNumber(parseInt(key));
  } else if (key === "Backspace") {
    enterNumber(0);
  }
});

function enterNumber(num) {
  var r = selectedCell.row;
  var c = selectedCell.col;

  if (puzzle[r][c] !== 0) return;
  userBoard[r][c] = num;
  renderGrid();

  if (num !== 0) {
    onCellClick(r, c);
  }
  if (isBoardComplete()) {
    document.getElementById("message").textContent =
      "Congratulations! You solved it!";
  }
}

function isValid(grid, row, col, num) {
  for (var c = 0; c < 9; c++) {
    if (grid[row][c] === num) {
      return false;
    }
  }

  for (var r = 0; r < 9; r++) {
    if (grid[r][col] === num) {
      return false;
    }
  }

  var boxRow = Math.floor(row / 3) * 3;
  var boxCol = Math.floor(col / 3) * 3;

  for (var br = boxRow; br < boxRow + 3; br++) {
    for (var bc = boxCol; bc < boxCol + 3; bc++) {
      if (grid[br][bc] === num) {
        return false;
      }
    }
  }
  return true;
}

function shuffle(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
}
function fillGrid(grid) {
  for (var i = 0; i < 81; i++) {
    var row = Math.floor(i / 9);
    var col = i % 9;
    if (grid[row][col] === 0) {
      var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      shuffle(nums);
      for (var n = 0; n < nums.length; n++) {
        if (isValid(grid, row, col, nums[n])) {
          grid[row][col] = nums[n];
          if (fillGrid(grid)) {
            return true;
          }

          grid[row][col] = 0;
        }
      }
      return false;
    }
  }
  return true;
}
function generatePuzzle() {
  var solved = [];
  for (var i = 0; i < 9; i++) {
    solved.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  }
  fillGrid(solved);
  solution = [];
  for (var r = 0; r < 9; r++) {
    solution.push(solved[r].slice());
  }
  var cells = [];
  for (var i = 0; i < 81; i++) cells.push(i);
  shuffle(cells);

  puzzle = [];
  for (var r = 0; r < 9; r++) {
    puzzle.push(solved[r].slice());
  }
  for (var k = 0; k < 46; k++) {
    var row = Math.floor(cells[k] / 9);
    var col = cells[k] % 9;
    puzzle[row][col] = 0;
  }
  userBoard = [];
  for (var r = 0; r < 9; r++) {
    userBoard.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  }
}
var puzzle = [];
var userBoard = [];
var solution = [];
var selectedCell = null;

function newGame() {
  function checkBoard() {
    document.querySelectorAll(".cell").forEach(function (el) {
      el.classList.remove("error");
    });
    var errors = 0;
    for (var r = 0; r < 9; r++) {
      for (var c = 0; c < 9; c++) {
        if (userBoard[r][c] !== 0 && userBoard[r][c] !== solution[r][c]) {
          var el = document.querySelector(
            `.cell[data-row="${r}"][data-col="${c}"]`,
          );
          el.classList.add("error");
          errors++;
        }
      }
    }
    var msg = document.getElementById("message");
    console.log(isBoardComplete());
    if (isBoardComplete()) {
      msg.textContent = "Congratulations! You solved it!";
    } else if (errors === 0) {
      msg.textContent = "No mistakes found";
    } else {
      msg.textContent = errors + " mistake(s) found";
    }
  }
  function isBoardComplete() {
    for (var r = 0; r < 9; r++) {
      for (var c = 0; c < 9; c++) {
        var value = puzzle[r][c] !== 0 ? puzzle[r][c] : userBoard[r][c];
        if (userBoard[r][c] !== solution[r][c]) {
          return false;
        }
      }
    }
    return true;
  }
  selectedCell = null;
  generatePuzzle();
  renderGrid();
}

function checkBoard() {
  document.querySelectorAll(".cell").forEach(function (el) {
    el.classList.remove("error");
  });
  var errors = 0;
  for (var r = 0; r < 9; r++) {
    for (var c = 0; c < 9; c++) {
      if (userBoard[r][c] !== 0 && userBoard[r][c] !== solution[r][c]) {
        var el = document.querySelector(
          `.cell[data-row="${r}"][data-col="${c}"]`,
        );
        el.classList.add("error");
        errors++;
      }
    }
  }
  var msg = document.getElementById("message");
  console.log(isBoardComplete());
  if (isBoardComplete()) {
    msg.textContent = "Congratulations! You solved it!";
  } else if (errors === 0) {
    msg.textContent = "No mistakes found";
  } else {
    msg.textContent = errors + " mistake(s) found";
  }
}
function isBoardComplete() {
  for (var r = 0; r < 9; r++) {
    for (var c = 0; c < 9; c++) {
      var value = puzzle[r][c] !== 0 ? puzzle[r][c] : userBoard[r][c];
      if (value !== solution[r][c]) return false;
    }
  }
  return true;
}

newGame();
renderGrid();
