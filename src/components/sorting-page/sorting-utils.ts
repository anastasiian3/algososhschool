import { Dispatch, SetStateAction } from 'react';
import { DELAY_IN_MS } from '../../constants/delays';
import { TArrayNumber } from '../../types/array';
import { ElementStates } from '../../types/element-states';
import { delayVisualisation } from '../../utils/utils';

export const randomizeArray = (minLen = 3, maxLen = 17, minNum = 0, maxNum = 100): TArrayNumber[] => {
  let arr: TArrayNumber[] = [];
  let count = Math.floor(Math.random() * (maxLen - minLen) + minLen);

  for (let i = 0; i < count; i++) {
    arr.push({ value: Math.round(Math.random() * (maxNum - minNum) + minNum), state: ElementStates.Default });
  }
  return arr;
};

export const doSlcSortAscending = async (
  arr: TArrayNumber[],
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setArray: Dispatch<SetStateAction<TArrayNumber[]>>
) => {
  if (arr.length < 2) {
    return;
  }
  setIsLoading(true);
  for (let i = 0; i < arr.length - 1; i++) {
    let minInd = i;
    for (let j = i + 1; j < arr.length; j++) {
      arr[i].state = ElementStates.Changing;
      arr[j].state = ElementStates.Changing;
      setArray([...arr]);
      await delayVisualisation(DELAY_IN_MS);
      if (arr[j].value < arr[minInd].value) {
        minInd = j;
      }
      arr[j].state = ElementStates.Default;
      setArray([...arr]);
    }
    [arr[i].value, arr[minInd].value] = [arr[minInd].value, arr[i].value];
    arr[i].state = ElementStates.Modified;
  }
  arr[arr.length - 1].state = ElementStates.Modified;
  setIsLoading(false);
};

export const doSlcSortDescending = async (
  arr: TArrayNumber[],
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setArray: Dispatch<SetStateAction<TArrayNumber[]>>
) => {
  if (arr.length < 2) {
    return;
  }
  setIsLoading(true);
  for (let i = 0; i < arr.length - 1; i++) {
    let maxInd = i;
    for (let j = i + 1; j < arr.length; j++) {
      arr[i].state = ElementStates.Changing;
      arr[j].state = ElementStates.Changing;
      setArray([...arr]);
      await delayVisualisation(DELAY_IN_MS);
      if (arr[j].value > arr[maxInd].value) {
        maxInd = j;
      }
      arr[j].state = ElementStates.Default;
      setArray([...arr]);
    }
    [arr[i].value, arr[maxInd].value] = [arr[maxInd].value, arr[i].value];
    arr[i].state = ElementStates.Modified;
  }
  arr[arr.length - 1].state = ElementStates.Modified;
  setIsLoading(false);
};

export const doBblSortAscending = async (
  arr: TArrayNumber[],
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setArray: Dispatch<SetStateAction<TArrayNumber[]>>
) => {
  if (arr.length < 2) {
    return;
  }
  setIsLoading(true);
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      arr[j].state = ElementStates.Changing;
      arr[j + 1].state = ElementStates.Changing;
      setArray([...arr]);
      await delayVisualisation(DELAY_IN_MS);
      if (arr[j].value > arr[j + 1].value) {
        [arr[j].value, arr[j + 1].value] = [arr[j + 1].value, arr[j].value];
      }
      arr[j].state = ElementStates.Default;
    }
    arr[arr.length - i - 1].state = ElementStates.Modified;
  }
  setIsLoading(false);
};

export const doBblSortDescending = async (
  arr: TArrayNumber[],
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setArray: Dispatch<SetStateAction<TArrayNumber[]>>
) => {
  if (arr.length < 2) {
    return;
  }
  setIsLoading(true);
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      arr[j].state = ElementStates.Changing;
      arr[j + 1].state = ElementStates.Changing;
      setArray([...arr]);
      await delayVisualisation(DELAY_IN_MS);
      if (arr[j].value < arr[j + 1].value) {
        [arr[j].value, arr[j + 1].value] = [arr[j + 1].value, arr[j].value];
      }
      arr[j].state = ElementStates.Default;
    }
    arr[arr.length - i - 1].state = ElementStates.Modified;
  }
  setIsLoading(false);
};
