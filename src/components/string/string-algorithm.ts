import { swap } from '../../utils/utils';

export const reverse = (string: string) => {
  const mid = Math.ceil(string.length / 2);
  const array: string[] = string.split('');

  for (let i = 0; i < mid; i++) {
    let j = array.length - 1 - i;
    if (array.length === 1) {
    } else if (i < j) {
      swap(array, i, j);
    }
  }
  return array;
};
