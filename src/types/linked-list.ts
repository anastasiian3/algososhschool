import { ElementStates } from './element-states';

// export interface TListArray {
//   value: string;
//   state: ElementStates;
// }

export interface ILinkedList<T> {
  append: (element: T) => void;
  prepend: (element: T) => void;
  insertAt: (element: T, index: number) => void;
  removeHead: () => void;
  removeTail: () => void;
  deleteAt: (index: number) => void;
  getSize: () => number;
  toArray: () => Array<{ value: T; state: ElementStates }>;
}
