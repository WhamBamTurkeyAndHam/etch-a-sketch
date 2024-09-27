const mainGridContent = document.querySelector('#js-main-grid-content');
const resetButton = document.querySelector('#js-reset-button');

resetButton.addEventListener('click', () => reset());

let gridCells = 8; //Default
let gridArea = gridCells * gridCells;

//Creates the grid.
function createGrid() {
  for (i = 0; i < gridArea; i++) {
    let grid = document.createElement('div');
    grid.classList.add('gridSquare');

    // Set the width of each grid through calc().
    let gridWidth = `calc(100% / ${gridCells})`;
    grid.style.width = gridWidth;

    // Set the border thickness depending on the amount of cells.
    let gridBorderCalc = gridCells / 100;
    let gridBorder = `solid black ${gridBorderCalc}px`;
    grid.style.border = gridBorder;

    mainGridContent.appendChild(grid);
  }

  // Start the variable off.
  let isMouseDown = false;

  // Handle mouse down event, setting the variable on.
  mainGridContent.addEventListener('mousedown', (event) => {
    isMouseDown = true;
    // Change color of the square that was clicked to black.
    if (event.target.classList.contains('gridSquare')) {
        event.target.classList.add('gridSquareBlack');
    };
  });

  // Handle mouse up event, setting the variable back off.
  mainGridContent.addEventListener('mouseup', () => isMouseDown = false);

  // When the variable is on, add a class to each grid one by one, achieving a drawing like feature.
  mainGridContent.querySelectorAll('.gridSquare').forEach(div => {
      div.addEventListener('mouseover', function() {
          if (isMouseDown) this.classList.add('gridSquareBlack');
      });
  });
};

createGrid();

//Reset all cells to fade out and be blank.
function reset() {
  mainGridContent.querySelectorAll('.gridSquare').forEach(div => {
    div.classList.add('reset');
    div.addEventListener('animationend', () => {
      div.classList.remove('gridSquareBlack');
      div.classList.remove('reset')
    }, { once: true });
  });
};