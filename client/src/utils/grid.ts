import { alphabet } from './faker';

export type TNode = {
  letter: string;
  distance?: number;
  active: boolean;
  visited: boolean;
  parent: null | TNode;
  astar: {
    g: number;
    h: number;
    f: number;
  };
  position: [number, number];
};

export default class TimberGrid {
  private GRID_SIZE: number;
  private grid: TNode[][];

  constructor(public size: number) {
    this.GRID_SIZE = size;
    this.grid = [...Array(this.GRID_SIZE)].map((v, y) =>
      [...Array(this.GRID_SIZE)].map((v, x) => ({
        letter: alphabet[Math.floor(Math.random() * alphabet.length)],
        active: false,
        visited: false,
        parent: null,
        astar: {
          g: 0,
          h: 0,
          f: 0,
        },
        position: [y, x],
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
