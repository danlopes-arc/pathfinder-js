"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dijkstra_1 = require("./dijkstra");
describe('dijkstra', () => {
    it.each([
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
        const path = (0, dijkstra_1.dijkstra)(graph, source, target);
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
        const path = (0, dijkstra_1.dijkstra)(graph, source, target);
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
        const path = (0, dijkstra_1.dijkstra)(graph, source, target);
        expect(path).toBeNull();
    });
    it.each([
        [
            {
                graph: [
                    [Infinity, 2, 1],
                    [2, Infinity, 4],
                ],
            },
        ],
        [
            {
                graph: [
                    [Infinity, 2],
                    [2, Infinity],
                    [1, 4],
                ],
            },
        ],
        [
            {
                graph: [
                    [Infinity, 2, 1],
                    [2, Infinity],
                    [1, 4, Infinity],
                ],
            },
        ],
    ])('throws when non square matrix is given for the graph #%#', ({ graph }) => {
        const source = 0;
        const target = 1;
        expect(() => (0, dijkstra_1.dijkstra)(graph, source, target)).toThrowError('Graph should be a square matrix');
    });
    it.each([-1, 3])('throws when source is out of bounds #%#', (source) => {
        const graph = [
            [Infinity, 2, 1],
            [2, Infinity, 4],
            [1, 4, Infinity],
        ];
        const target = 1;
        expect(() => (0, dijkstra_1.dijkstra)(graph, source, target)).toThrowError('Source is out of bounds');
    });
    it.each([-1, 3])('throws when target is out of bounds #%#', (target) => {
        const graph = [
            [Infinity, 2, 1],
            [2, Infinity, 4],
            [1, 4, Infinity],
        ];
        const source = 1;
        expect(() => (0, dijkstra_1.dijkstra)(graph, source, target)).toThrowError('Target is out of bounds');
    });
    it.each([0, 1, 2])('throws when source and target are the same #%#', (source) => {
        const graph = [
            [Infinity, 2, 1],
            [2, Infinity, 4],
            [1, 4, Infinity],
        ];
        const target = source;
        expect(() => (0, dijkstra_1.dijkstra)(graph, source, target)).toThrowError('Source and target must be different');
    });
    it('works unidirectionally', () => {
        const graph = [
            [Infinity, Infinity, 1, Infinity],
            [5, Infinity, Infinity, 1],
            [Infinity, 1, Infinity, Infinity],
            [1, Infinity, Infinity, Infinity],
        ];
        const source = 1;
        const target = 2;
        const path = (0, dijkstra_1.dijkstra)(graph, source, target);
        expect(path).toEqual([1, 3, 0, 2]);
    });
});
//# sourceMappingURL=dijkstra.spec.js.map