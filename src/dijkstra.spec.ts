import { dijkstra } from './dijkstra';

describe('dijkstra', () => {
  /**
   * Tupple: [description, arguments]
   */
  type ItFindsRightPathParams = [
    string,
    {
      graph: number[][];
      source: number;
      target: number;
      expectedPath: number[];
    },
  ];

  it.each<ItFindsRightPathParams>([
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
  ])('finds right path: %s', (_, { graph, source, target, expectedPath }) => {
    const path = dijkstra(graph, source, target);
    expect(path).toEqual(expectedPath);
  });

  it('finds right path when target is found by parent but path is cheaper through a further parent', () => {
    const graph = [
      [Infinity, 4, 1, 1],
      [4, Infinity, 6, 1],
      [1, 6, Infinity, Infinity],
      [1, 1, Infinity, Infinity],
    ];
    const source = 2;
    const target = 1;
    const path = dijkstra(graph, source, target);
    const expectedPath = [2, 0, 3, 1];

    expect(path).toEqual(expectedPath);
  });

  it('returns null when no path is found', () => {
    const graph = [
      [Infinity, Infinity, 1, 1],
      [Infinity, Infinity, Infinity, Infinity],
      [1, Infinity, Infinity, 1],
      [1, Infinity, 1, Infinity],
    ];
    const source = 2;
    const target = 1;
    const path = dijkstra(graph, source, target);

    expect(path).toBeNull();
  });

  it.each([
    {
      graph: [
        [Infinity, 2, 1],
        [2, Infinity, 4],
      ],
    },
    {
      graph: [
        [Infinity, 2],
        [2, Infinity],
        [1, 4],
      ],
    },
    {
      graph: [
        [Infinity, 2, 1],
        [2, Infinity],
        [1, 4, Infinity],
      ],
    },
  ])('throws when non square matrix is given for the graph # %#', ({ graph }) => {
    const source = 0;
    const target = 1;

    expect(() => dijkstra(graph, source, target)).toThrowError('Graph should be a square matrix');
  });

  it.each([-1, 3])('throws when source is out of bounds # %#', (source) => {
    const graph = [
      [Infinity, 2, 1],
      [2, Infinity, 4],
      [1, 4, Infinity],
    ];
    const target = 1;

    expect(() => dijkstra(graph, source, target)).toThrowError('Source is out of bounds');
  });

  it.each([-1, 3])('throws when target is out of bounds # %#', (target) => {
    const graph = [
      [Infinity, 2, 1],
      [2, Infinity, 4],
      [1, 4, Infinity],
    ];
    const source = 1;

    expect(() => dijkstra(graph, source, target)).toThrowError('Target is out of bounds');
  });
  it.todo('throws when source and target are the same');
  // describe: works unidirectionally
});
