const mainGridContent = document.querySelector('#js-main-grid-content');

let gridCells = 8; //Default

let gridArea = gridCells * gridCells;

function createGrid() {
  for (i = 0; i < gridArea; i++) {
    let grid = document.createElement('div');
    grid.classList.add('gridSquare');
    let gridWidth = `calc(100% / ${gridCells})`;
    grid.style.width = gridWidth;
    let gridBorderCalc = gridCells / 100;
    let gridBorder = `solid black ${gridBorderCalc}px`;
    grid.style.border = gridBorder;
    mainGridContent.appendChild(grid);
  }
}

createGrid();