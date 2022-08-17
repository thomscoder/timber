export class TimberNode {
  public children: Map<string, TimberNode>;
  public isEndOfTheWord: boolean;
  public data: string;
  constructor(data?: any) {
    this.children = new Map();
    this.isEndOfTheWord = false;
    this.data = data;
  }
}
