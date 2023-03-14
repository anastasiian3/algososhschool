import { ElementStates } from '../../types/element-states';

export const arrayLength = 7;
export const initialArray = Array.from({ length: arrayLength }, () => ({
  value: '',
  state: ElementStates.Default,
}));

export interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
  isEmpty: () => boolean;
  getSize: () => number;
  getHeadIndex: () => number;
  getTailIndex: () => number;
  getItems: () => (T | null)[];
  clear: () => void;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error('Maximum length exceeded');
    }
    this.container[this.tail % this.size] = item;
    this.tail++;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error('No elements in the queue');
    }
    this.container[this.head % this.size] = null;
    this.head++;
    this.length--;
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error('No elements in the queue');
    }
    return this.container[this.head % this.size];
  };

  isEmpty = () => this.length === 0;

  getSize = () => this.length;

  getHeadIndex = () => this.head;

  getTailIndex = () => this.tail;

  getItems = () => this.container;

  clear = () => {
    this.container = [];
    this.length = 0;
    this.tail = 0;
    this.head = 0;
  };
}
