export const dijkstra = (graph: number[][], source: number, target: number): number[] | null => {
  const vertexCount = graph.length;

  checkSquareMatrix(graph, vertexCount);
  checkSourceInBounds(source, vertexCount);
  checkTargetInBounds(target, vertexCount);
  checkSourceAndTargetDifferent(source, target);

  const costs = [...Array(vertexCount)].map(() => Infinity);
  costs[source] = 0;

  const parents: Record<number, number> = {};

  const unvisitedVertices = [...Array(vertexCount)].map((_, i) => i);

  let foundPath = false;

  while (unvisitedVertices.length && !foundPath) {
    unvisitedVertices.sort((a, b) => costs[a] - costs[b]);

    const cheapestVertex = unvisitedVertices[0];

    unvisitedVertices.shift();

    const unvisitedNeighbours = unvisitedVertices.filter(
      (vertex) => graph[cheapestVertex][vertex] !== Infinity,
    );

    for (const neighbour of unvisitedNeighbours) {
      const distanceFromSource = costs[cheapestVertex] + graph[cheapestVertex][neighbour];

      if (distanceFromSource < costs[neighbour]) {
        costs[neighbour] = distanceFromSource;
        parents[neighbour] = cheapestVertex;
      }
    }

    if (isSmallestCost(target, unvisitedVertices, costs)) {
      foundPath = true;
    }
  }

  if (!foundPath) {
    return null;
  }

  const path = [target];

  while (path[0] !== source) {
    path.unshift(parents[path[0]]);
  }

  return path;
};

function checkSourceAndTargetDifferent(source: number, target: number): void {
  if (source === target) {
    throw new Error('Source and target must be different');
  }
}

function checkTargetInBounds(target: number, vertexCount: number): void {
  if (target < 0 || target >= vertexCount) {
    throw new Error('Target is out of bounds');
  }
}

function checkSourceInBounds(source: number, vertexCount: number): void {
  if (source < 0 || source >= vertexCount) {
    throw new Error('Source is out of bounds');
  }
}

function checkSquareMatrix(graph: number[][], vertexCount: number): void {
  const isSquareMatrix = graph.every((row) => row.length === vertexCount);

  if (!isSquareMatrix) {
    throw new Error('Graph should be a square matrix');
  }
}

function isSmallestCost(vertex: number, vertices: number[], costs: number[]): boolean {
  if (costs[vertex] === Infinity) {
    return false;
  }
  return [...vertices].map((v) => costs[v]).sort()[0] >= costs[vertex];
}
