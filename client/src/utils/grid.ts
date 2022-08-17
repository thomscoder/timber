import { alphabet } from './faker';

export type TGrid = {
  letter: string;
  distance?: number;
  active: boolean;
};

export default class TimberGrid {
  private GRID_SIZE: number;
  private grid: TGrid[][];

  constructor(public size: number) {
    this.GRID_SIZE = size;
    this.grid = [...Array(this.GRID_SIZE)].map(() =>
      [...Array(this.GRID_SIZE)].map(() => ({
        letter: alphabet[Math.floor(Math.random() * alphabet.length)],
        active: false,
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
