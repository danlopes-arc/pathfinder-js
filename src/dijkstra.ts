export const dijkstra = (graph: number[][], source: number, target: number): number[] | null => {
  const vertexCount = graph.length;

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

function isSmallestCost(vertex: number, vertices: number[], costs: number[]): boolean {
  return [...vertices].map((v) => costs[v]).sort()[0] >= costs[vertex];
}
