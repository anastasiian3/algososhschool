interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getSize: () => number;
  getItems: () => T[];
  clear: () => void;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];
  private containerSize: number;

  constructor(containerSize?: number) {
    this.containerSize = containerSize === undefined ? Infinity : containerSize;
  }

  push = (item: T): void => {
    if (this.container.length >= this.containerSize) {
      throw new Error('Reached max capacity');
    }
    this.container.push(item);
  };

  pop = (): void => {
    this.container.pop();
  };

  peak = (): T | null => {
    if (this.container.length > 0) {
      return this.container[this.container.length - 1];
    }
    return null;
  };

  clear() {
    this.container = [];
  }

  getSize = () => this.container.length;

  getItems = () => this.container;
}
