import { alphabet } from './faker';

export default class TimberGrid {
  private GRID_SIZE: number;
  private grid: string[][][];

  constructor(public size: number) {
    this.GRID_SIZE = size;
    this.grid = [...Array(this.GRID_SIZE)].map(() => [...Array(this.GRID_SIZE)].map(() => [alphabet[Math.floor(Math.random() * alphabet.length)]]));
  }

  public generate() {
    return this.grid;
  }

  public toggleCell(y: number, x: number) {
    this.grid[y][x].push('active');
    return this.grid;
  }
}
