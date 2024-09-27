const mainGridContent = document.querySelector('#js-main-grid-content');
const retroButton = document.querySelector('#js-retro-button');
const colorButton = document.querySelector('#js-color-button');
const resetButton = document.querySelector('#js-reset-button');

retroButton.addEventListener('click', () => switchToRetro());
colorButton.addEventListener('click', () => switchToColor());
resetButton.addEventListener('click', () => reset());

let gridCells = 8; //Default
let gridArea = gridCells * gridCells;
let retroHandlers = null;
let randomColorHandlers = null;

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
  };
};

// BLACK DRAWING.
function retroDrawing() {
  // Start the variable off.
  let isMouseDown = false;

  function handleMouseDown(event) {
    if (event.target.classList.contains('gridSquare')) {
      isMouseDown = true;
      // Change color of the square that was clicked to black.
      event.target.style.backgroundColor = "black";
      event.target.classList.add('gridSquareAnimation');
      event.preventDefault(); // Prevent any unwanted default behavior
    };
  };

  function handleMouseUp() {
    isMouseDown = false;
  }

  function handleMouseOver(event) {
    if (isMouseDown && event.target.classList.contains('gridSquare')) {
      event.target.style.backgroundColor = "black";
      event.target.classList.add('gridSquareAnimation');
    };
  };

  // Handle mouse down event, setting the variable on to draw.
  mainGridContent.addEventListener('mousedown', handleMouseDown);

  // Handle mouse up event, setting the variable back off from drawing.
  document.addEventListener('mouseup', handleMouseUp);

  // When the variable is on, add a class to each grid one by one, achieving a drawing like feature.
  mainGridContent.querySelectorAll('.gridSquare').forEach(div => div.addEventListener('mouseover', handleMouseOver));

  retroHandlers = { handleMouseDown, handleMouseUp, handleMouseOver };
};

function stopRetroDrawing() {
  if (retroHandlers) {
    mainGridContent.removeEventListener('mousedown', retroHandlers.handleMouseDown);
    document.removeEventListener('mouseup', retroHandlers.handleMouseUp);
    mainGridContent.removeEventListener('mouseover', retroHandlers.handleMouseOver);
    retroHandlers = null; // Clear retroHandlers after removal
  }
}

//RANDOM COLOR DRAWING.
function colorDrawing() {

  // Get random colors and save it into an array.
  function randomRGB() {
    const randomInteger = (max) => Math.floor(Math.random() * (max + 1));

    let r = randomInteger(255);
    let g = randomInteger(255);
    let b = randomInteger(255);
    return [r, g, b];
  };

  // Start the variable off.
  let isMouseDown = false;

  function handleMouseDown(event) {
    if (event.target.classList.contains('gridSquare')) {
      isMouseDown = true;
      // Change color of the square that was clicked to any random color from 0 to 255.
      event.target.style.backgroundColor = `rgb(${randomRGB()})`;
      event.target.classList.add('gridSquareAnimation');
      event.preventDefault(); // Prevent any unwanted default behavior
    };
  };

  function handleMouseUp() {
    isMouseDown = false;
  }

  function handleMouseOver(event) {
    if (isMouseDown && event.target.classList.contains('gridSquare')) {
      this.style.backgroundColor = `rgb(${randomRGB()})`;
      event.target.classList.add('gridSquareAnimation');
    };
  };

   // Handle mouse down event, setting the variable on to draw.
  mainGridContent.addEventListener('mousedown', handleMouseDown);

  // Handle mouse up event, setting the variable back off from drawing.
  document.addEventListener('mouseup', handleMouseUp);
 
   // When the variable is on, add a random background color to each grid one by one, achieving a drawing like feature.
  mainGridContent.querySelectorAll('.gridSquare').forEach(div => div.addEventListener('mouseover', handleMouseOver))

  randomColorHandlers = { handleMouseDown, handleMouseUp, handleMouseOver };
}

function stopColorDrawing() {
  if (randomColorHandlers) {
    mainGridContent.removeEventListener('mousedown', randomColorHandlers.handleMouseDown);
    document.removeEventListener('mouseup', randomColorHandlers.handleMouseUp);
    mainGridContent.removeEventListener('mouseover', randomColorHandlers.handleMouseOver);
    randomColorHandlers = null; // Clear randomColorHandlers after removal
  }
}

function switchToColor() {
  stopRetroDrawing(); // Remove retroDrawing eventlisteners
  colorDrawing(); // Start colorDrawing eventlisteners
}

function switchToRetro() {
  stopColorDrawing(); // Remove colorDrawing eventlisteners
  retroDrawing(); // Start retroDrawing eventlisteners
}

createGrid();

//Reset all cells to fade out and be blank.
function reset() {
  mainGridContent.querySelectorAll('.gridSquare').forEach(div => {
    div.classList.add('reset');
    div.addEventListener('animationend', () => {
      div.classList.remove('gridSquareBlack');
      div.style.backgroundColor = '';
      div.classList.remove('reset')
    }, { once: true });
  });
};