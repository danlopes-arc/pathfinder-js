import { dijkstra } from './dijkstra';

/**
 * Tupple: [description, arguments]
 */
type TestCase = [
  string,
  {
    graph: number[][];
    source: number;
    target: number;
    expectedPath: number[];
  },
];

const testCases: TestCase[] = [
  [
    'basic 2x2',
    {
      graph: [
        [Infinity, 2],
        [2, Infinity],
      ],
      source: 0,
      target: 1,
      expectedPath: [0, 1],
    },
  ],
  [
    'basic 3x3',
    {
      graph: [
        [Infinity, 2, 1],
        [2, Infinity, 4],
        [1, 4, Infinity],
      ],
      source: 0,
      target: 2,
      expectedPath: [0, 2],
    },
  ],
  [
    '4x4 and target is found by parent but path is cheaper through a further parent',
    {
      graph: [
        [Infinity, 4, 1, 1],
        [4, Infinity, 6, 1],
        [1, 6, Infinity, Infinity],
        [1, 1, Infinity, Infinity],
      ],
      source: 2,
      target: 1,
      expectedPath: [2, 0, 3, 1],
    },
  ],
  // TODO
  // returns null when path was not found
  // accepts only square matrices for the cost
  // source and target should be within bounds
  // source and target should not be the same
];

describe('dijkstra', () => {
  it.each<TestCase>(testCases)(
    'solves correctly: %s',
    (_, { graph, source, target, expectedPath }) => {
      const path = dijkstra(graph, source, target);
      expect(path).toEqual(expectedPath);
    },
  );

  it('returns null when no path is found', () => {
    const graph = [
      [Infinity, Infinity, 1, 1],
      [4, Infinity, 6, 1],
      [1, Infinity, Infinity, Infinity],
      [1, Infinity, Infinity, Infinity],
    ];
    const source = 2;
    const target = 1;
    const path = dijkstra(graph, source, target);

    expect(path).toBeNull();
  });
});
