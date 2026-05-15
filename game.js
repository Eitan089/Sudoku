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

function getCellEl(row, col) {
  var allCells = document.querySelectorAll(".cell");
  return allCells[row * 9 + col];
}
function renderGrid() {
  var gridEl = document.getElementById("grid");
  gridEl.innerHTML = "";

  for (var r = 0; r < 9; r++) {
    for (var c = 0; c < 9; c++) {
      var cell = document.createElement("div");
      var classes = "cell";
      if (c === 2 || c === 5) classes = classes + " thick-right";
      if (r === 2 || r === 5) classes = classes + " thick-bottom";
      if (puzzle[r][c] !== 0) {
        cell.textContent = puzzle[r][c];
        classes = classes + " given";
      } else if (userBoard[r][c] !== 0) {
        cell.textContent = userBoard[r][c];
        classes = classes + " user-input";
      }
      cell.className = classes;
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
  var selectedVal =
    puzzle[row][col] !== 0 ? puzzle[row][col] : userBoard[row][col];
  var allCells = document.querySelectorAll(".cell");

  for (var r = 0; r < 9; r++) {
    for (var c = 0; c < 9; c++) {
      var el = allCells[r * 9 + c];

      var sameRow = r === row;
      var sameCol = c === col;
      var sameBox =
        Math.floor(r / 3) === Math.floor(row / 3) &&
        Math.floor(c / 3) === Math.floor(col / 3);
      var cellVal = puzzle[r][c] !== 0 ? puzzle[r][c] : userBoard[r][c];
      var sameNumber = selectedVal !== 0 && cellVal === selectedVal;

      var classes = "cell";
      if (c === 2 || c === 5) classes = classes + " thick-right";
      if (r === 2 || r === 5) classes = classes + " thick-bottom";
      if (puzzle[r][c] !== 0) classes = classes + " given";
      else if (userBoard[r][c] !== 0) classes = classes + " user-input";

      if (r === row && c === col) {
        classes = classes + " selected";
      } else if (sameRow || sameCol || sameBox || sameNumber) {
        classes = classes + " highlight";
      }

      el.className = classes;
    }
  }
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
  var solved = [
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
  fillGrid(solved);

  solution = [
    solved[0].slice(),
    solved[1].slice(),
    solved[2].slice(),
    solved[3].slice(),
    solved[4].slice(),
    solved[5].slice(),
    solved[6].slice(),
    solved[7].slice(),
    solved[8].slice(),
  ];

  var cells = [];
  for (var i = 0; i < 81; i++) {
    var cells = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
      39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
      57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74,
      75, 76, 77, 78, 79, 80,
    ];
  }
  shuffle(cells);

  puzzle = [
    solved[0].slice(),
    solved[1].slice(),
    solved[2].slice(),
    solved[3].slice(),
    solved[4].slice(),
    solved[5].slice(),
    solved[6].slice(),
    solved[7].slice(),
    solved[8].slice(),
  ];

  for (var k = 0; k < 46; k++) {
    var row = Math.floor(cells[k] / 9);
    var col = cells[k] % 9;
    puzzle[row][col] = 0;
  }

  userBoard = [
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
}
var puzzle = [];
var userBoard = [];
var solution = [];
var selectedCell = null;

function newGame() {
  function checkBoard() {
    renderGrid();
    var errors = 0;
    for (var r = 0; r < 9; r++) {
      for (var c = 0; c < 9; c++) {
        if (userBoard[r][c] !== 0 && userBoard[r][c] !== solution[r][c]) {
          var el = getCellEl(r, c);
          el.className = el.className + " error";
          errors++;
        }
      }
    }
    var msg = document.getElementById("message");
    if (isBoardComplete()) {
      msg.textContent = "You solved it!";
    } else if (errors === 0) {
      msg.textContent = "No mistakes found!";
    } else {
      msg.textContent = errors + " mistake(s) found.";
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
  for (var r = 0; r < 9; r++) {
    for (var c = 0; c < 9; c++) {
      var el = getCellEl(r, c);
      var classes = "cell";
      if (c === 2 || c === 5) classes = classes + " thick-right";
      if (r === 2 || r === 5) classes = classes + " thick-bottom";
      if (puzzle[r][c] !== 0) classes = classes + " given";
      else if (userBoard[r][c] !== 0) classes = classes + " user-input";
      el.className = classes;
    }
  }

  var errors = 0;
  for (var r = 0; r < 9; r++) {
    for (var c = 0; c < 9; c++) {
      if (userBoard[r][c] !== 0 && userBoard[r][c] !== solution[r][c]) {
        var el = getCellEl(r, c);
        el.className = el.className + " error";
        errors++;
      }
    }
  }

  var msg = document.getElementById("message");
  if (isBoardComplete()) {
    msg.textContent = "You solved it!";
  } else if (errors === 0) {
    msg.textContent = "No mistakes found!";
  } else {
    msg.textContent = errors + " mistake(s) found.";
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
