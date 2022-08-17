import { astar } from '../utils/astar';
import { TNode } from '../utils/grid';

const arrayWithFixedLength = (length: number) => {
  let array = new Array();
  array.push = function () {
    if (this.length >= length) {
      this.shift();
    }
    // @ts-ignore
    return Array.prototype.push.apply(this, arguments);
  };
  return array;
};

const currentCells = arrayWithFixedLength(2);

export const activateCell = (grid: TNode[][], position: [number, number]) => {
  const [y, x] = position;
  if (!grid[y][x].active) grid[y][x].active = true;
  else grid[y][x].active = false;

  // To calculate the path between the two last clicked cells
  currentCells.push([y, x]);

  if (currentCells.length === 2) {
    const path = astar(grid, currentCells[0], currentCells[1]);
    for (let i = 0; i < path.length; i++) {
      const [y, x] = path[i].position;
      grid[y][x].active = true;
    }
  }

  return grid;
};
