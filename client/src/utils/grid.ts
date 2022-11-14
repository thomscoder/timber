import { TGrid } from './types';
import { GRID_HEIGHT, GRID_WIDTH } from './utils';

export default class TimberGrid {
  private grid: TGrid | undefined;

  constructor() {
    this.grid = undefined;
  }

  public async generate(alphabet: string[]) {
    this.grid = [...Array(GRID_HEIGHT)].map((v, y) =>
      [...Array(GRID_WIDTH)].map((v, x) => ({
        letter: alphabet[Math.floor(Math.random() * alphabet.length)],
        active: false, // Active is when the cell is clicked
        visited: false, // Visited is when the cell is visited by the path
        parent: null, // See A* algorithm
        belongsToPath: false, // Belongs to the path - UI (colors yellow each cell of the path)
        astar: {
          g: 0,
          h: 0,
          f: 0,
        },
        position: [y, x],
        island: {
          // To auto detect one cell islands
          visited: false,
          oneCellIsland: false,
        },
      })),
    );
    return this.grid;
  }

  public toggleCell(y: number, x: number) {
    this.grid![y][x].active = true;
    return this.grid;
  }
}
