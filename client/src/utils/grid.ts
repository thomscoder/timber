import { TGrid } from './types';
import { alphabet } from './utils';

export default class TimberGrid {
  private GRID_SIZE: number;
  private grid: TGrid;

  constructor(public size: number) {
    this.GRID_SIZE = size;
    this.grid = [...Array(this.GRID_SIZE)].map((v, y) =>
      [...Array(this.GRID_SIZE)].map((v, x) => ({
        letter: alphabet[Math.floor(Math.random() * alphabet.length)],
        active: false,
        visited: false,
        parent: null,
        belongsToPath: false,
        astar: {
          g: 0,
          h: 0,
          f: 0,
        },
        position: [y, x],
        island: {
          visited: false,
          oneCellIsland: false,
        },
      })),
    );
  }

  public generate() {
    return this.grid;
  }

  public toggleCell(y: number, x: number) {
    this.grid[y][x].active = true;
    return this.grid;
  }
}
