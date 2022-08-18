import { astar } from '../utils/astar';
import { TGrid, TNode, TNodePosition } from '../utils/types';
import { arrayWithFixedLength } from '../utils/utils';

const currentCells: Array<TNodePosition> = arrayWithFixedLength(2);
let visitedCells: Array<TNodePosition> = [];
let path: Array<TNode | undefined>;
let wordOrder: number = 0;
let resetsCounter: number = 0;

export const activateCell = (grid: TGrid, position: TNodePosition) => {
  const [y, x] = position;
  const cell = grid[y][x];
  if (!cell.active) {
    // To calculate the path between the two last clicked cells
    currentCells.push([y, x]);
    visitedCells.push([y, x]);

    if (currentCells.length === 2) {
      const [startNode, endNode] = currentCells;

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
      cell.letter += ` ${++wordOrder}`;
    }
  } else {
    if (resetsCounter > 0) return grid;
    // Remove the active state and the path that led to the cell
    cell.active = false;
    cell.visited = false;

    currentCells[1] = currentCells[0];

    // If the "not chosen" cell is the first
    if (!Array.isArray(path)) {
      clearCell(cell, false, cell.letter.replace(/\s\d+$/, ''));
    }

    if (Array.isArray(path) && path.length > 0) {
      for (let i = 0; i < path.length; i++) {
        const [y, x] = path[i]!.position;
        const _cell = grid[y][x];
        clearCell(_cell, false, _cell.letter.replace(/\s\d+$/, ''));

        // Do not remove the "not chosen path" cells on submit
        visitedCells = visitedCells.filter(([y, x]) => y !== _cell.position[0] || x !== _cell.position[1]);
      }
    }
    resetsCounter++;
    wordOrder--;
  }

  return grid;
};

export const clearGrid = (grid: TNode[][]): { grid: TGrid; points: number } => {
  const points = wordOrder;

  for (let i = 0; i < visitedCells.length; i++) {
    const [y, x] = visitedCells[i];
    const cell = grid[y][x];
    clearCell(cell);
  }

  // Resets arrays and counters
  currentCells.length = 0;
  visitedCells.length = 0;

  resetsCounter = 0;
  wordOrder = 0;
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
