import { astar } from '../utils/astar';
import { exploreIslands } from '../utils/islands';
import { TGrid, TNode, TNodePosition } from '../utils/types';
import { arrayWithFixedLength } from '../utils/utils';

let currentCells: Array<TNodePosition> = arrayWithFixedLength(2);
let positionsOfCellsBelongingToPath: Array<TNodePosition> = [];
let path: Array<TNode | undefined>;
let lettersOrder: number = 0;
let resetsCounter: number = 0;

export const reset = () => {
  currentCells = arrayWithFixedLength(2);
  positionsOfCellsBelongingToPath = [];
  // @ts-ignore
  path = undefined;
  lettersOrder = 0;
  resetsCounter = 0;
};

export const activateCell = (grid: TGrid, position: TNodePosition, letters: Array<string>) => {
  const [y, x] = position;
  const cell = grid[y][x];

  // if clicked on an already active cell
  if (cell.active) letters.pop();

  if (!cell.active && !cell.island.oneCellIsland) {
    // To calculate the path between the two last clicked cells
    // Current cells is a fixed array of length (n) of the last two clicked cells
    // If the number of elements exceeds (n), the first element is removed
    currentCells.push([y, x]);

    // Add first clieckedcell to the cells belonging to the path
    positionsOfCellsBelongingToPath.push([y, x]);

    if (currentCells.length === 2) {
      const [startNode, endNode] = currentCells;
      // Calculate the shortest path between the two points
      path = astar(grid, startNode, endNode);

      // Prevent connection of two cells belonging to distinct islands
      if (Array.isArray(path)) {
        if (path.length === 0) {
          clearGrid(grid, letters);
          return {
            grid,
            letters,
          };
        }
      }

      // Color yellow each cell of the path
      for (let i = 0; i < path.length; i++) {
        const [y, x] = path[i]!.position;
        const _cell = grid[y][x];
        _cell.visited = true;
        if (!(_cell === path[0])) {
          _cell.belongsToPath = true;
          // Add each path to visited cells
          positionsOfCellsBelongingToPath.push([y, x]);
        }
      }
    }
    if (!Array.isArray(path) || path.length > 0) {
      cell.active = true;
      cell.visited = true;
      cell.letter += ` ${++lettersOrder}`;
    }
  } else {
    if (resetsCounter > 0) {
      return {
        grid,
        letters,
      };
    }
    letters.pop();

    // Revert to the previously clicked cell
    currentCells[1] = currentCells[0];

    // If the "not chosen" cell is the first clicked cell
    if (!Array.isArray(path)) {
      currentCells.length = 0;
      clearCell(cell, false, cell.letter.replace(/\d+$/, ''));
    } // endif
    // else remove the path
    if (Array.isArray(path) && path.length > 0) {
      for (let i = 0; i < path.length; i++) {
        const [y, x] = path[i]!.position;
        const _cell = grid[y][x];
        clearCell(_cell, false, _cell.letter.replace(/\s\d+$/, ''));
        // Do not remove the "restored path" cells on submit
        positionsOfCellsBelongingToPath = positionsOfCellsBelongingToPath.filter(([y, x]) => y !== _cell.position[0] || x !== _cell.position[1]);
      } // endfor
    } // endif

    resetsCounter++;
    lettersOrder--;
  }

  return {
    grid,
    letters,
  };
};

export const submitWordAction = (grid: TNode[][]): { grid: TGrid; points: number; allBadIslands: boolean } => {
  const points = lettersOrder;
  //
  for (let i = 0; i < positionsOfCellsBelongingToPath.length; i++) {
    const [y, x] = positionsOfCellsBelongingToPath[i];
    const cell = grid[y][x];
    clearCell(cell);
  }

  // Resets arrays
  currentCells.length = 0;
  positionsOfCellsBelongingToPath.length = 0;
  // Reset path
  // @ts-ignore
  path = undefined;
  // and counters
  resetsCounter = 0;
  lettersOrder = 0;
  // Check islands disable one cell islands
  const allBadIslands = exploreIslands(grid);

  return {
    grid: grid,
    points: points,
    allBadIslands: allBadIslands,
  };
};

const clearGrid = (grid: TGrid, letters: Array<string>): void => {
  for (let i = 0; i < positionsOfCellsBelongingToPath.length; i++) {
    const [y, x] = positionsOfCellsBelongingToPath[i];
    const cell = grid[y][x];
    clearCell(cell, false, grid[y][x].letter.replace(/\d+/, ''));
  }

  // Resets arrays
  currentCells.length = 0;
  positionsOfCellsBelongingToPath.length = 0;
  letters.length = 0;
  // Reset path
  // @ts-ignore
  path = undefined;
  // and counters
  resetsCounter = 0;
  lettersOrder = 0;
};

const clearCell = (cell: TNode, visited: boolean = true, letter?: string) => {
  cell.belongsToPath = false;
  cell.active = false;
  cell.visited = visited;
  cell.letter = letter ? letter : '';
  return;
};
