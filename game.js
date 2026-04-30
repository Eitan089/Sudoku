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
  document.querySelectorAll(".cell").forEach(function (el) {
    var r = parseInt(el.dataset.row);
    var c = parseInt(el.dataset.col);
    var sameRow = r === row;
    var sameCol = c === col;
    var sameBox =
      Math.floor(r / 3) === Math.floor(row / 3) &&
      Math.floor(c / 3) === Math.floor(col / 3);
    if (r === row && c === col) {
      el.classList.add("selected");
    } else if (sameRow || sameCol || sameBox) {
      el.classList.add("highlight");
    }
  });
}
renderGrid();
