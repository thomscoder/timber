import { astar } from '../utils/astar';
import { exploreIslands } from '../utils/islands';
import { TGrid, TNode, TNodePosition } from '../utils/types';
import { arrayWithFixedLength } from '../utils/utils';

const currentCells: Array<TNodePosition> = arrayWithFixedLength(2);
let visitedCells: Array<TNodePosition> = [];
let path: Array<TNode | undefined>;
let lettersOrder: number = 0;
let resetsCounter: number = 0;

export const activateCell = (grid: TGrid, position: TNodePosition) => {
  const [y, x] = position;
  const cell = grid[y][x];
  if (!cell.active && !cell.island.oneCellIsland) {
    // To calculate the path between the two last clicked cells
    currentCells.push([y, x]);
    visitedCells.push([y, x]);

    if (currentCells.length === 2) {
      const [startNode, endNode] = currentCells;
      // Calculate the shortest path between the two points
      path = astar(grid, startNode, endNode);

      for (let i = 0; i < path.length; i++) {
        const [y, x] = path[i]!.position;
        const _cell = grid[y][x];
        _cell.visited = true;
        if (!(_cell === path[0])) {
          _cell.belongsToPath = true;
        }
        visitedCells.push([y, x]);
      }
    }
    if (!Array.isArray(path) || path.length > 0) {
      cell.active = true;
      cell.visited = true;
      cell.letter += ` ${++lettersOrder}`;
    }
  } else {
    if (resetsCounter > 0) return grid;
    // Remove the active state and the path that led to the cell
    cell.active = false;
    cell.visited = false;
    // Revert to the previously clicked cell
    currentCells[1] = currentCells[0];

    // If the "not chosen" cell is the first clicked cell
    if (!Array.isArray(path)) {
      currentCells.length = 0;
      clearCell(cell, false, cell.letter.replace(/\s\d+$/, ''));
    } // endif
    // else
    if (Array.isArray(path) && path.length > 0) {
      for (let i = 0; i < path.length; i++) {
        const [y, x] = path[i]!.position;
        const _cell = grid[y][x];
        clearCell(_cell, false, _cell.letter.replace(/\s\d+$/, ''));
        // Do not remove the "not chosen path" cells on submit
        visitedCells = visitedCells.filter(([y, x]) => y !== _cell.position[0] || x !== _cell.position[1]);
      } // endfor
    } // endif

    resetsCounter++;
    lettersOrder--;
  }

  return grid;
};

export const clearGrid = (grid: TNode[][]): { grid: TGrid; points: number } => {
  const points = lettersOrder;
  //
  for (let i = 0; i < visitedCells.length; i++) {
    const [y, x] = visitedCells[i];
    const cell = grid[y][x];
    clearCell(cell);
  }

  // Resets arrays
  currentCells.length = 0;
  visitedCells.length = 0;
  // and counters
  resetsCounter = 0;
  lettersOrder = 0;
  // Check islands disable one cell islands
  exploreIslands(grid);

  return {
    grid: grid,
    points: points,
  };
};

const clearCell = (cell: TNode, visited: boolean = true, letter?: string) => {
  cell.belongsToPath = false;
  cell.active = false;
  cell.visited = visited;
  cell.letter = letter ? letter : '';
  return;
};
