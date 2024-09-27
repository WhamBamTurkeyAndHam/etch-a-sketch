const mainGridContent = document.querySelector('#js-main-grid-content');
const retroButton = document.querySelector('#js-retro-button');
const randomRainbowButton = document.querySelector('#js-random-rainbow-button');
const resetButton = document.querySelector('#js-reset-button');

retroButton.addEventListener('click', () => switchToRetro());
randomRainbowButton.addEventListener('click', () => switchToRandomRainbow());
resetButton.addEventListener('click', () => reset());

let gridCells = 8; //Default
let gridArea = gridCells * gridCells;
let retroHandlers = null;
let randomRainbowHandlers = null;
let randomColorSelectionHandlers = null;
let colorSelection;

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
}

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
    }
  }

  function handleMouseUp() {
    isMouseDown = false;
  }

  function handleMouseOver(event) {
    if (isMouseDown && event.target.classList.contains('gridSquare')) {
      event.target.style.backgroundColor = "black";
      event.target.classList.add('gridSquareAnimation');
    }
  }

  // Handle mouse down event, setting the variable on to draw.
  mainGridContent.addEventListener('mousedown', handleMouseDown);

  // Handle mouse up event, setting the variable back off from drawing.
  document.addEventListener('mouseup', handleMouseUp);

  // When the variable is on, add a class to each grid one by one, achieving a drawing like feature.
  mainGridContent.querySelectorAll('.gridSquare').forEach(div => div.addEventListener('mouseover', handleMouseOver));

  retroHandlers = { handleMouseDown, handleMouseUp, handleMouseOver };
}

function stopRetroDrawing() {
  if (retroHandlers) {
    mainGridContent.removeEventListener('mousedown', retroHandlers.handleMouseDown);
    document.removeEventListener('mouseup', retroHandlers.handleMouseUp);
    mainGridContent.removeEventListener('mouseover', retroHandlers.handleMouseOver);
    retroHandlers = null; // Clear retroHandlers after removal
  }
}

//COLOR SELECTION DRAWING.

  // Color Pickr By: https://simonwep.github.io/pickr
  const pickr = Pickr.create({
    el: '.colorSelector',
    theme: 'classic',
    default: 'rgba(159, 0, 255, 1)',
    defaultRepresentation: 'RGBA',

    swatches: [
      'rgba(255, 0, 0, 1)',
      'rgba(255, 150, 0, 1)',
      'rgba(252, 255, 0, 1)',
      'rgba(1, 255, 0, 1)',
      'rgba(0, 255, 238, 1)',
      'rgba(0, 21, 255, 1)',
      'rgba(159, 0, 255, 1)',
      'rgba(255, 0, 255, 1)'
    ],

    components: {

        // Main components
        preview: true,
        opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
          hex: true,
          rgba: true,
          input: true,
        }
    }
  })

  pickr.on('change', (color) => {
    colorSelection = color.toRGBA().toString()
    colorSelectionDrawing(colorSelection);
    pickr.applyColor(color)
  })

function colorSelectionDrawing(colorSelection) {

  // Start the variable off.
  let isMouseDown = false;

  function handleMouseDown(event) {
    if (event.target.classList.contains('gridSquare')) {
      isMouseDown = true;
      // Change color of the square that was clicked to any random color from 0 to 255.
      event.target.style.backgroundColor = colorSelection;
      event.target.classList.add('gridSquareAnimation');
      event.preventDefault(); // Prevent any unwanted default behavior
    }
  }

  function handleMouseUp() {
    isMouseDown = false;
  }

  function handleMouseOver(event) {
    if (isMouseDown && event.target.classList.contains('gridSquare')) {
      this.style.backgroundColor = colorSelection;
      event.target.classList.add('gridSquareAnimation');
    }
  }

  // Handle mouse down event, setting the variable on to draw.
  mainGridContent.addEventListener('mousedown', handleMouseDown);

  // Handle mouse up event, setting the variable back off from drawing.
  document.addEventListener('mouseup', handleMouseUp);

  // When the variable is on, add a random background color to each grid one by one, achieving a drawing like feature.
  mainGridContent.querySelectorAll('.gridSquare').forEach(div => div.addEventListener('mouseover', handleMouseOver));

  randomColorSelectionHandlers = { handleMouseDown, handleMouseUp, handleMouseOver };
}

function stopColorSelectionDrawing() {
  if (randomColorSelectionHandlers) {
    mainGridContent.removeEventListener('mousedown', randomColorSelectionHandlers.handleMouseDown);
    document.removeEventListener('mouseup', randomColorSelectionHandlers.handleMouseUp);
    mainGridContent.removeEventListener('mouseover', randomColorSelectionHandlers.handleMouseOver);
    randomColorSelectionHandlers = null; // Clear randomColorSelectionHandlers after removal
  }
}

//RANDOM RAINBOW DRAWING.
function randomRainbowDrawing() {

  // Get random colors and save it into an array.
  function randomRGB() {
    const randomInteger = (max) => Math.floor(Math.random() * (max + 1));

    let r = randomInteger(255);
    let g = randomInteger(255);
    let b = randomInteger(255);
    return [r, g, b];
  }

  // Start the variable off.
  let isMouseDown = false;

  function handleMouseDown(event) {
    if (event.target.classList.contains('gridSquare')) {
      isMouseDown = true;
      // Change color of the square that was clicked to any random color from 0 to 255.
      event.target.style.backgroundColor = `rgb(${randomRGB()})`;
      event.target.classList.add('gridSquareAnimation');
      event.preventDefault(); // Prevent any unwanted default behavior
    }
  }

  function handleMouseUp() {
    isMouseDown = false;
  }

  function handleMouseOver(event) {
    if (isMouseDown && event.target.classList.contains('gridSquare')) {
      this.style.backgroundColor = `rgb(${randomRGB()})`;
      event.target.classList.add('gridSquareAnimation');
    }
  }

   // Handle mouse down event, setting the variable on to draw.
  mainGridContent.addEventListener('mousedown', handleMouseDown);

  // Handle mouse up event, setting the variable back off from drawing.
  document.addEventListener('mouseup', handleMouseUp);
 
   // When the variable is on, add a random background color to each grid one by one, achieving a drawing like feature.
  mainGridContent.querySelectorAll('.gridSquare').forEach(div => div.addEventListener('mouseover', handleMouseOver));

  randomRainbowHandlers = { handleMouseDown, handleMouseUp, handleMouseOver };
}

function stopRandomRainbowDrawing() {
  if (randomRainbowHandlers) {
    mainGridContent.removeEventListener('mousedown', randomRainbowHandlers.handleMouseDown);
    document.removeEventListener('mouseup', randomRainbowHandlers.handleMouseUp);
    mainGridContent.removeEventListener('mouseover', randomRainbowHandlers.handleMouseOver);
    randomRainbowHandlers = null; // Clear randomRainbowHandlers after removal
  }
}

function switchToRetro() {
  stopRandomRainbowDrawing(); // Remove randomRainbowDrawing eventlisteners
  retroDrawing(); // Start retroDrawing eventlisteners
}

function switchToColor() {
  stopRetroDrawing(); // Remove retroDrawing eventlisteners
  colorSelectionDrawing(); // Start color selection drawing
}

function switchToRandomRainbow() {
  stopRetroDrawing(); // Remove retroDrawing eventlisteners
  randomRainbowDrawing(); // Start randomRainbowDrawing eventlisteners
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
  })
}