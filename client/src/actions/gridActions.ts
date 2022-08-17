import { astar } from '../utils/astar';
import { TNode } from '../utils/grid';
import { arrayWithFixedLength } from '../utils/utils';

const currentCells: Array<[number, number]> = arrayWithFixedLength(2);
const visitedCells: Array<[number, number]> = [];
let path: Array<TNode | undefined>;
let wordOrder: number = 0;

export const activateCell = (grid: TNode[][], position: [number, number]) => {
  const [y, x] = position;
  const cell = grid[y][x];
  if (!cell.active) {
    // To calculate the path between the two last clicked cells
    currentCells.push([y, x]);
    visitedCells.push([y, x]);

    if (currentCells.length === 2) {
      path = astar(grid, currentCells[0], currentCells[1]);
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
      wordOrder++;
      cell.letter += ` ${wordOrder}`;
    }
  } else {
    // Remove the active state and the path that led to the cell
    cell.active = false;
    cell.visited = false;

    wordOrder--;
    currentCells[1] = currentCells[0];
    for (let i = 0; i < path.length; i++) {
      const [y, x] = path[i]!.position;
      const _cell = grid[y][x];
      _cell.visited = false;
      _cell.belongsToPath = false;
      _cell.active = false;
      _cell.letter = _cell.letter.replace(/\s\d+$/, '');
    }
  }

  return grid;
};

export const clearGrid = (grid: TNode[][]) => {
  const points = wordOrder;
  wordOrder = 0;

  for (let i = 0; i < visitedCells.length; i++) {
    const [y, x] = visitedCells[i];
    const cell = grid[y][x];
    cell.visited = true;
    cell.belongsToPath = false;
    cell.active = false;
    cell.letter = '';
  }
  currentCells.length = 0;
  return {
    grid: grid,
    wordOrder: points,
  };
};
