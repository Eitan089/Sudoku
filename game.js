//נתונים של הלוחות השונים עם הפאזלים והפתרונות שלהם
var boards = {
  easy: {
    puzzle: [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],

      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],

      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9],
    ],
    solution: [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],

      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],

      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9],
    ],
  },
  medium: {
    puzzle: [
      [0, 0, 0, 2, 6, 0, 7, 0, 1],
      [6, 8, 0, 0, 7, 0, 0, 9, 0],
      [1, 9, 0, 0, 0, 4, 5, 0, 0],

      [8, 2, 0, 1, 0, 0, 0, 4, 0],
      [0, 0, 4, 6, 0, 2, 9, 0, 0],
      [0, 5, 0, 0, 0, 3, 0, 2, 8],

      [0, 0, 9, 3, 0, 0, 0, 7, 4],
      [0, 4, 0, 0, 5, 0, 0, 3, 6],
      [7, 0, 3, 0, 1, 8, 0, 0, 0],
    ],
    solution: [
      [4, 3, 5, 2, 6, 9, 7, 8, 1],
      [6, 8, 2, 5, 7, 1, 4, 9, 3],
      [1, 9, 7, 8, 3, 4, 5, 6, 2],

      [8, 2, 6, 1, 9, 5, 3, 4, 7],
      [3, 7, 4, 6, 8, 2, 9, 1, 5],
      [9, 5, 1, 7, 4, 3, 6, 2, 8],

      [5, 1, 9, 3, 2, 6, 8, 7, 4],
      [2, 4, 8, 9, 5, 7, 1, 3, 6],
      [7, 6, 3, 4, 1, 8, 2, 5, 9],
    ],
  },
  hard: {
    puzzle: [
      [9, 0, 0, 5, 0, 8, 0, 0, 7],
      [0, 8, 0, 3, 0, 2, 9, 0, 5],
      [0, 5, 4, 0, 0, 0, 0, 8, 0],

      [0, 7, 0, 6, 8, 0, 0, 3, 2],
      [1, 0, 0, 0, 0, 4, 0, 0, 8],
      [5, 0, 0, 2, 1, 9, 0, 6, 0],

      [0, 0, 0, 9, 0, 6, 0, 0, 1],
      [7, 2, 6, 0, 0, 1, 0, 4, 0],
      [0, 0, 0, 4, 7, 0, 0, 5, 6],
    ],
    solution: [
      [9, 1, 3, 5, 6, 8, 4, 2, 7],
      [6, 8, 7, 3, 4, 2, 9, 1, 5],
      [2, 5, 4, 1, 9, 7, 6, 8, 3],

      [4, 7, 9, 6, 8, 5, 1, 3, 2],
      [1, 6, 2, 7, 3, 4, 5, 9, 8],
      [5, 3, 8, 2, 1, 9, 7, 6, 4],

      [3, 4, 5, 9, 2, 6, 8, 7, 1],
      [7, 2, 6, 8, 5, 1, 3, 4, 9],
      [8, 9, 1, 4, 7, 3, 2, 5, 6],
    ],
  },
};

//משתנים גלובליים לאחסון הלוח הנוכחי, הפתרון, לוח המשתמש והבחירה הנוכחית
var puzzle = [];
var solution = [];
var userBoard = [];
var selectedRow = -1;
var selectedCol = -1;

//פונקציה שמתחילה את המשחק על פי רמת הקושי שנבחרה ומאתחלת את הלוח והמשתנים
function startGame(difficulty) {
  var board = boards[difficulty];
  puzzle = board.puzzle;
  solution = board.solution;
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
  selectedRow = -1;
  selectedCol = -1;
  document.getElementById("message").textContent = "";
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("game-screen").style.display = "flex";
  renderGrid();
}

//פונקציה שמחזירה את המשתמש למסך ההתחלה ומאפס את הלוח
function newGame() {
  document.getElementById("game-screen").style.display = "none";
  document.getElementById("start-screen").style.display = "flex";
  document.getElementById("message").textContent = "";
}

//פונקציה שמציגה את הלוח על המסך ומטפלת בבחירת תאים
function renderGrid() {
  var grid = document.getElementById("grid");
  grid.innerHTML = "";

  for (var r = 0; r < 9; r++) {
    for (var c = 0; c < 9; c++) {
      var cell = document.createElement("div");
      var classes = "cell";

      if (c === 2 || c === 5) {
        classes = classes + " thick-right";
      }
      if (r === 2 || r === 5) {
        classes = classes + " thick-bottom";
      }

      if (puzzle[r][c] !== 0) {
        cell.textContent = puzzle[r][c];
        classes = classes + " given";
      } else if (userBoard[r][c] !== 0) {
        cell.textContent = userBoard[r][c];
        classes = classes + " user-input";
      }

      if (r === selectedRow && c === selectedCol) {
        classes = classes + " selected";
      }

      cell.className = classes;

      cell.addEventListener(
        "click",
        (function (row, col) {
          return function () {
            selectedRow = row;
            selectedCol = col;
            renderGrid();
          };
        })(r, c),
      );

      grid.appendChild(cell);
    }
  }
}

//הוספת אירוע מקלדת להזנת מספרים או מחיקת קלט
document.addEventListener("keydown", function (e) {
  if (selectedRow === -1) {
    return;
  }

  if (e.key >= "1" && e.key <= "9") {
    if (puzzle[selectedRow][selectedCol] === 0) {
      userBoard[selectedRow][selectedCol] = parseInt(e.key);
      renderGrid();
    }
  } else if (e.key === "Backspace") {
    if (puzzle[selectedRow][selectedCol] === 0) {
      userBoard[selectedRow][selectedCol] = 0;
      renderGrid();
    }
  }
});

//בדיקת הלוח האם יש טעויות והאם המשחק הושלם
function checkBoard() {
  //ספירת טעויות בלוח המשתמש
  var errors = 0;
  for (var r = 0; r < 9; r++) {
    for (var c = 0; c < 9; c++) {
      if (userBoard[r][c] !== 0 && userBoard[r][c] !== solution[r][c]) {
        errors++;
      }
    }
  }

  //בדיקת השלמת המשחק על ידי השוואת הלוח הנוכחי לפתרון
  var complete = true;
  for (var r = 0; r < 9; r++) {
    for (var c = 0; c < 9; c++) {
      if (puzzle[r][c] === 0 && userBoard[r][c] !== solution[r][c]) {
        complete = false;
      }
    }
  }

  //הצגת הודעה למשתמש בהתאם למצב הלוח
  var msg = document.getElementById("message");
  if (complete) {
    msg.textContent = "you solved it";
  } else if (errors === 0) {
    msg.textContent = "No mistakes";
  } else {
    msg.textContent = errors + "  mistakes found";
  }
}
