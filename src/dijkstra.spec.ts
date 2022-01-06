import { dijkstra } from './dijkstra';

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
];

describe('dijkstra', () => {
  it.each<TestCase>(testCases)(
    'solves correctly: %s',
    (_, { graph, source, target, expectedPath }) => {
      const path = dijkstra(graph, source, target);

      expect(path).toEqual(expectedPath);
    },
  );
});
