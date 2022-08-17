import { astar } from '../utils/astar';
import { TNode } from '../utils/grid';
import { arrayWithFixedLength } from '../utils/utils';

const currentCells: Array<[number, number]> = arrayWithFixedLength(2);
let path: Array<TNode | undefined>;
let wordOrder: number = 0;

export const activateCell = (grid: TNode[][], position: [number, number]) => {
  const [y, x] = position;
  const cell = grid[y][x];
  if (!cell.active) {
    // To calculate the path between the two last clicked cells
    currentCells.push([y, x]);

    if (currentCells.length === 2) {
      path = astar(grid, currentCells[0], currentCells[1]);
      for (let i = 0; i < path.length; i++) {
        const [y, x] = path[i]!.position;
        const _cell = grid[y][x];
        _cell.visited = true;
        if (!(_cell === path[0])) {
          _cell.belongsToPath = true;
        }
      }
    }
    if (!Array.isArray(path) || path.length > 0) {
      cell.active = true;
      wordOrder++;
      cell.letter += ` ${wordOrder}`;
    }
  } else {
    // Remove the active state and the path that led to the cell
    cell.active = false;
    currentCells[1] = currentCells[0];
    for (let i = 0; i < path.length; i++) {
      const [y, x] = path[i]!.position;
      const _cell = grid[y][x];
      _cell.visited = false;
      _cell.belongsToPath = false;
      _cell.active = false;
    }
  }

  return grid;
};
