import { greet } from '.';

describe('greet', () => {
  it('returns hey', () => {
    expect(greet()).toBe('hey');
  });
});
