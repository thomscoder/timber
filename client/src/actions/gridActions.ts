export const activateCell = (grid: string[][][], position: [number, number]) => {
  const [y, x] = position;
  grid[y][x].push('active');
  return grid;
};
