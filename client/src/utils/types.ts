export type GridProps = {
  size: number;
};

export type TNode = {
  letter: string;
  distance?: number;
  active: boolean;
  visited: boolean;
  parent: null | TNode;
  belongsToPath: boolean;
  astar: {
    g: number;
    h: number;
    f: number;
  };
  position: TNodePosition;
  island: {
    visited: boolean;
    oneCellIsland: boolean;
  };
};

export type TGrid = TNode[][];
export type TNodePosition = [number, number];
