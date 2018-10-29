
let board = Array.from(Array(40), _ => Array(40).fill(0));
let animation_frame;
let pause = false;

let startGame = () => {
  pause = false;
  gridWidth = 40;
  gridHeight = 40;
  let updateGrid = () => {
    let tempGrid =  Array.from(Array(gridWidth), _ => Array(gridHeight).fill(0));
    for (let j = 0; j < gridWidth; j++) {
      for (let k = 0; k < gridHeight; k++) {
        let totalCells = 0;
        //add up the total values for the surrounding cells
        if (j !=0 && k != 0) {
          totalCells += board[j - 1][k - 1];
        }
        if (j !=0) {
            totalCells += board[j - 1][k];
        }
        if (j !=0 && k != board[0].length - 1) {
            totalCells += board[j - 1][k + 1];
        }
        if (k != 0) {
            totalCells += board[j][k - 1];
        }
        if (k != board[0].length - 1) {
            totalCells += board[j][k + 1];
        }
        if (j != board.length - 1 && k != 0) {
            totalCells += board[j + 1][k - 1];
        }
        if (j != board.length - 1) {
            totalCells += board[j + 1][k];
        }
        if (j != board.length - 1 && k != board[0].length - 1) {
            totalCells += board[j + 1][k + 1];
        }

        if (board[j][k] == 0) {
          if (totalCells == 3) {
            tempGrid[j][k] = 1;
          }
          // Default is 0 in tempGrid, so I don't have to change it.
        } else if (board[j][k] == 1){
          if (totalCells == 2 || totalCells == 3) {
            tempGrid[j][k] = 1;
          }
        }
      }
    }
    board = tempGrid;
  }

  let playGame = () => {
    drawGrid();
    updateGrid();
    if (pause) return;
    setTimeout(function() {
      animation_frame = requestAnimationFrame(playGame);
    }, 200);
  }
  drawGrid();
  animation_frame = requestAnimationFrame(playGame);
}

let drawGrid = () =>  {
  let gridWidth = 40;
  let gridHeight = 40;
  let can = document.getElementById('grid');
  let blockWidth = can.width / gridWidth;
  let blockHeight = can.height / gridHeight;
  can.style.width = can.width;
  can.style.height = can.height;

  var ctx = can.getContext("2d");
  ctx.clearRect(0, 0, 600, 600);
  for (let j = 0; j < gridHeight; j++) {
    for (let k = 0; k < gridWidth; k++) {
      if (board[j][k] == 1) {
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(j * blockWidth, k * blockHeight, blockWidth, blockHeight);
      }
    }
  }
}

let placeNode = (e) => {
  let ctx = document.getElementById('grid');
  let x, y;
  if (e.pageX || e.pageY) {
    x = e.pageX;
    y = e.pageY;
  } else {
    x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  x -= ctx.offsetLeft;
  y -= ctx.offsetTop;

  x = Math.floor(x/15);
  y = Math.floor(y/15);

  board[x][y] = board[x][y] == 1 ? 0 : 1;
  drawGrid();
}

let pauseGame = () => {
  pause = true;
}

let clearBoard = () => {
  pauseGame();
  board = Array.from(Array(40), _ => Array(40).fill(0));
  drawGrid();
}

let start = () => {
  document.getElementById('grid').addEventListener('click', placeNode);
  document.getElementById('play-button').addEventListener('click', startGame);
  document.getElementById('pause-button').addEventListener('click', pauseGame);
  document.getElementById('clear-button').addEventListener('click', clearBoard);
}

window.onload = start;
