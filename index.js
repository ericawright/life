
let startGame = () => {

  let createGrid = (width, height) => {
    // Make grid with equal height and width
    let arr = Array.from(Array(width), _ => Array(height).fill(0));
    arr[0][1] = 1;
    arr[1][2] = 1;
    arr[2][0] = 1;
    arr[2][1] = 1;
    arr[2][2] = 1;
    arr[4][0] = 1;
    arr[2][5] = 1;
    arr[7][4] = 1;
    arr[9][6] = 1;
    arr[0][6] = 1;
    arr[6][5] = 1;
    arr[8][8] = 1;
    arr[8][6] = 1;
    arr[0][5] = 1;
    arr[9][6] = 1;
    arr[1][3] = 1;
    arr[1][2] = 1;
    arr[2][3] = 1;
    arr[2][2] = 1;
    return arr;
  }
  let gridWidth = 10; // take user input for this in future
  let gridHeight = 10;

  let grid = createGrid(gridWidth, gridHeight);

  let drawGrid = (nRow, nCol) =>  {
    let can = document.getElementById('grid');
    var ctx = can.getContext("2d");

    ctx.clearRect(0, 0, 400, 400);

      for (let j = 0; j < gridHeight; j++) {
        for (let k = 0; k < gridWidth; k++) {
          if (grid[j][k] == 1) {
            ctx.fillStyle = '#FF0000';
            ctx.fillRect(j * 30, k * 30, 30, 30);
          }
        }
      }
  }

  let updateGrid = () => {
    let tempGrid =  Array.from(Array(gridWidth), _ => Array(gridHeight).fill(0));
    for (let j = 0; j < gridWidth; j++) {
      for (let k = 0; k < gridHeight; k++) {
        let totalCells = 0;
        //add up the total values for the surrounding cells
        if (j !=0 && k != 0) {
          totalCells += grid[j - 1][k - 1];
        }
        if (j !=0) {
            totalCells += grid[j - 1][k];
        }
        if (j !=0 && k != grid[0].length - 1) {
            totalCells += grid[j - 1][k + 1];
        }
        if (k != 0) {
            totalCells += grid[j][k - 1];
        }
        if (k != grid[0].length - 1) {
            totalCells += grid[j][k + 1];
        }
        if (j != grid.length - 1 && k != 0) {
            totalCells += grid[j + 1][k - 1];
        }
        if (j != grid.length - 1) {
            totalCells += grid[j + 1][k];
        }
        if (j != grid.length - 1 && k != grid[0].length - 1) {
            totalCells += grid[j + 1][k + 1];
        }

        if (grid[j][k] == 0) {
          if (totalCells == 3) {
            tempGrid[j][k] = 1;
          }
          // Default is 0 in tempGrid, so I don't have to change it.
        } else if (grid[j][k] == 1){
          if (totalCells == 2 || totalCells == 3) {
            tempGrid[j][k] = 1;
          }
        }
      }
    }
    console.log(tempGrid)
    grid = tempGrid;
  }

  let playGame = () => {
    drawGrid();
    updateGrid();
    setTimeout(function() {
      requestAnimationFrame(playGame);
    }, 1000);
  }
  drawGrid();
  requestAnimationFrame(playGame);
  //
  // document.on("keyup", function(e) {
  //   if (e.key === "Escape") {
  //
  //   }
  // });
}

window.onload = startGame;
