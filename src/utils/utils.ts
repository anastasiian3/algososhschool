export const swap = <T>(arr: Array<T>, firstIndex: number, secondIndex: number): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

export const delayVisualisation = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
