import { TGrid, TNodePosition } from './types';
import { GRID_HEIGHT, GRID_WIDTH } from './utils';

export const exploreIslands = (grid: TGrid): boolean => {
  const visited = new Set<string>();
  const sizes: number[] = [];
  // let count = 0;
  for (let i = 0; i < GRID_HEIGHT; i++) {
    for (let j = 0; j < GRID_WIDTH; j++) {
      const size = explore(grid, [i, j], visited);
      if (size) {
        // count++;
        sizes.push(size);
        // if there's an island of one cell discard it
        if (size === 1) {
          grid[i][j].island.oneCellIsland = true;
          grid[i][j].island.visited = true;
        }
      }
    }
  }
  const allBadIslands = sizes.every((size) => size <= 2);
  return allBadIslands;
};

const explore = (grid: TGrid, position: TNodePosition, visited: Set<string>) => {
  const [y, x] = position;
  const checkBoundsColumn = 0 <= y && y < GRID_HEIGHT;
  const checkBoundsRow = 0 <= x && x < GRID_WIDTH;

  if (!checkBoundsRow || !checkBoundsColumn) return 0;

  if (grid[y][x].visited || grid[y][x].island.visited) return 0;

  let size = 1;

  const pos = y + ',' + x;

  if (visited.has(pos)) return 0;
  visited.add(pos);

  size += explore(grid, [y - 1, x], visited);
  size += explore(grid, [y + 1, x], visited);
  size += explore(grid, [y, x - 1], visited);
  size += explore(grid, [y, x + 1], visited);

  size += explore(grid, [y - 1, x - 1], visited);
  size += explore(grid, [y - 1, x + 1], visited);
  size += explore(grid, [y + 1, x - 1], visited);
  size += explore(grid, [y + 1, x + 1], visited);

  return size;
};
