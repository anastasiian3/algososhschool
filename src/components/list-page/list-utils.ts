import { ElementStates } from '../../types/element-states';
import { ILinkedList } from '../../types/linked-list';

export const getRandomArray = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private size: number;
  private stateArray(values: T[]) {
    values.forEach((value) => this.append(value));
  }

  constructor(elements: T[]) {
    this.head = null;
    this.tail = null;
    this.size = 0;

    if (elements?.length) {
      this.stateArray(elements);
    }
  }

  append(element: T) {
    const node = new Node(element);
    let current;
    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.size++;
  }

  prepend = (item: T) => {
    const node = new Node(item);

    if (this.head) {
      node.next = this.head;
    } else {
      this.tail = node;
    }
    this.head = node;
    this.size++;
  };

  insertAt(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return;
    }
    if (!this.head || index <= 0) {
      this.prepend(element);
    } else if (index > this.size - 1) {
      this.append(element);
    } else {
      let current = this.head;
      let currentIndex = 0;
      while (currentIndex !== index - 1 && current.next) {
        current = current.next;
        currentIndex++;
      }
      const node = new Node(element, current.next);
      current.next = node;
      this.size++;
    }
  }

  removeHead() {
    if (!this.head) return null;

    if (this.size === 1) {
      this.head = null;
      this.tail = null;
      this.size = 0;
      return;
    }

    const currHead = this.head;
    const newHead = currHead.next;
    this.head = newHead;
    this.size--;
  }

  removeTail() {
    let current;
    if (!this.head?.next) {
      this.head = null;
    } else {
      current = this.head;
      while (current.next?.next) {
        current = current.next;
      }
      current.next = null;
    }
    this.size--;
  }

  deleteAt(index: number) {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return;
    }
    let curr = this.head;
    if (index === 0) {
      if (this.head) {
        this.head = this.head.next;
      }
    } else {
      let prev = null;
      let currIndex = 0;
      while (currIndex++ < index) {
        prev = curr;
        if (curr) {
          curr = curr.next;
        }
      }
      if (prev?.next) {
        prev.next = curr?.next ? curr.next : null;
      }
    }
    this.size--;
  }

  getSize = () => this.size;

  toArray() {
    let curr = this.head;
    let result: T[] = [];
    while (curr) {
      result.push(curr.value);
      curr = curr.next;
    }
    return [...result].map((value) => ({
      value: value,
      state: ElementStates.Default,
    }));
  }
}
