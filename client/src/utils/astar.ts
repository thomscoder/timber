import { TGrid, TNode, TNodePosition } from './types';

const getNeighbors = (grid: TGrid, position: TNodePosition) => {
  const [y, x] = position;
  const neighbors = new Map();

  const top = grid[y - 1] && grid[y - 1][x];
  const bottom = grid[y + 1] && grid[y + 1][x];
  const left = grid[y][x - 1] && grid[y][x - 1];
  const right = grid[y][x + 1] && grid[y][x + 1];

  // Diagonals
  const topLeft = top && left && grid[y - 1][x - 1];
  const topRight = top && right && grid[y - 1][x + 1];
  const bottomLeft = bottom && left && grid[y + 1][x - 1];
  const bottomRight = bottom && right && grid[y + 1][x + 1];

  if (top && !top.belongsToPath && !top.visited) {
    top.astar.g = 1;
    neighbors.set('top', top);
  }
  if (bottom && !bottom.belongsToPath && !bottom.visited) {
    bottom.astar.g = 1;
    neighbors.set('bottom', bottom);
  }
  if (left && !left.belongsToPath && !left.visited) {
    left.astar.g = 1;
    neighbors.set('left', left);
  }
  if (right && !right.belongsToPath && !right.visited) {
    right.astar.g = 1;
    neighbors.set('right', right);
  }
  if (topLeft && !topLeft.belongsToPath && !topLeft.visited) {
    topLeft.astar.g = 1.4;
    neighbors.set('topLeft', topLeft);
  }
  if (topRight && !topRight.belongsToPath && !topRight.visited) {
    topRight.astar.g = 1.4;
    neighbors.set('topRight', topRight);
  }
  if (bottomLeft && !bottomLeft.belongsToPath && !bottomLeft.visited) {
    bottomLeft.astar.g = 1.4;
    neighbors.set('bottomLeft', bottomLeft);
  }
  if (bottomRight && !bottomRight.belongsToPath && !bottomRight.visited) {
    bottomRight.astar.g = 1.4;
    neighbors.set('bottomRight', bottomRight);
  }
  return neighbors;
};

export const astar = (grid: TNode[][], start: TNodePosition, end: TNodePosition) => {
  const openSet = new Set();
  const closedSet = new Set();
  const [sy, sx] = start;
  const [ey, ex] = end;
  const startNode = grid[sy][sx];
  const endNode = grid[ey][ex];

  startNode.astar.g = 0;
  startNode.astar.h = 0;
  startNode.astar.f = 0;
  startNode.parent = null;
  // Add the start node to the open set
  openSet.add(startNode);
  // While the open set is not empty
  while (openSet.size > 0) {
    // Get the node in the open set with the lowest f score
    const currentNode = openSet.values().next().value;
    if (currentNode === endNode) {
      return reconstructPath(currentNode);
    }
    // Remove the current node from the open set
    openSet.delete(currentNode);
    // Add the current node to the closed set
    closedSet.add(currentNode);
    const neighbors = getNeighbors(grid, currentNode.position);
    // For each of the current node's neighbors
    for (const [key, neighbor] of neighbors) {
      // Skip this neighbor if it's in the closed set
      if (closedSet.has(neighbor)) {
        continue;
      }
      // Otherwise, if it's not in the open set
      const tempG = currentNode.astar.g + 10;
      if (!openSet.has(neighbor) || tempG < neighbor.astar.g) {
        neighbor.astar.g = tempG;
        neighbor.astar.h = heuristic(neighbor.position, end);
        neighbor.astar.f = neighbor.astar.g + neighbor.astar.h;
        // Set the neighbor's parent to the current node
        neighbor.parent = currentNode;
        if (!openSet.has(neighbor)) {
          openSet.add(neighbor);
        }
      }
    }
  }
  return [];
};

const heuristic = (start: TNodePosition, end: TNodePosition) => {
  // Euclidean distance
  const [y1, x1] = start;
  const [y2, x2] = end;
  return Math.abs(y1 - y2) + Math.abs(x1 - x2);
};

const reconstructPath = (node: TNode) => {
  // Create an empty path array
  const path = [];
  let current = node;
  // While the current node has a parent
  while (current.parent) {
    // Add the current node to the path
    path.push(current);
    current = current.parent;
  }
  return path;
};
