import { reverse } from './string-algorithm';

describe('testing string algorithm', () => {
  it('if string with even number of characters is reversed correctly', () => {
    expect(reverse('test')).toEqual(['t', 's', 'e', 't']);
  });
  it('if string with odd number of characters is reversed correctly', () => {
    expect(reverse('testing')).toEqual(['g', 'n', 'i', 't', 's', 'e', 't']);
  });
  it('if string consisting of one character is reversed correctly', () => {
    expect(reverse('0')).toEqual(['0']);
  });
  it('if empty string is reversed correctly', () => {
    expect(reverse('')).toEqual([]);
  });
});
