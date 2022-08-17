import { TGrid } from '../utils/grid';

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

export const activateCell = (grid: TGrid[][], position: [number, number]) => {
  const [y, x] = position;
  if (!grid[y][x].active) grid[y][x].active = true;
  else grid[y][x].active = false;

  // To calculate the path between the two last clicked cells
  currentCells.push([y, x]);

  return grid;
};
