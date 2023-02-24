const cells = document.querySelectorAll(".cell");
const statusBox = document.querySelector("#statusBox");
const resetButton = document.querySelector("#resetButton");

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //
  [0, 4, 8],
  [2, 4, 6],
];

let currentPlayer = "X";
let running = false;
let options = ["", "", "", "", "", "", "", "", ""];

startGame();

function startGame() {
  cells.forEach((cell) =>
    cell.addEventListener("click", (e) => cellClicked(cell))
  );
  resetButton.addEventListener("click", resetAndPlayAgain);
  running = true;
  statusBox.textContent = `${currentPlayer}`;
}

function cellClicked(cell) {
  const cellIndex = cell.getAttribute("cellIndex");

  upadteCell(cell, cellIndex);
  
}

function upadteCell(cell, cellIndex) {
  console.log("runs");
  if (!running || options[cellIndex] !== "") {
    return;
  }
  cell.innerHTML = currentPlayer;
  options[cellIndex] = currentPlayer;
  checkWhoWin();
}

function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusBox.textContent = `${currentPlayer}`;
}

function checkWhoWin() {
  let haveWinner = false;

  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];

    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA === "" || cellB === "" || cellC === "") {
      continue;
    }
    if (cellA === cellB && cellB === cellC) {
      haveWinner = true;
    }
  }
  if (haveWinner) {
    statusBox.textContent = `${currentPlayer} IS WINNER`;
    running = false;
  } else if (!options.includes("")) {
    statusBox.textContent = "DRAW";
  } else {
    changePlayer();
  }
}

function resetAndPlayAgain() {
  currentPlayer = "X";
  running = true;
  options = ["", "", "", "", "", "", "", "", ""];
  cells.forEach((cell) => (cell.textContent = ""));
  statusBox.textContent = `${currentPlayer} `;
}