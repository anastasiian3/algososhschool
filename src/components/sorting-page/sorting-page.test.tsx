import { ElementStates } from '../../types/element-states';
import { doBblSortAscending, doBblSortDescending, doSlcSortAscending, doSlcSortDescending } from './sorting-utils';

const arrayWithOneElement = [{ value: 0, state: ElementStates.Modified }];

const arrayWithElements = [
  { value: 3, state: ElementStates.Modified },
  { value: 7, state: ElementStates.Modified },
  { value: 1, state: ElementStates.Modified },
  { value: 100, state: ElementStates.Modified },
];

const arrayAscendingResult = [
  { value: 1, state: ElementStates.Modified },
  { value: 3, state: ElementStates.Modified },
  { value: 7, state: ElementStates.Modified },
  { value: 100, state: ElementStates.Modified },
];

const arrayDescendingResult = [
  { value: 100, state: ElementStates.Modified },
  { value: 7, state: ElementStates.Modified },
  { value: 3, state: ElementStates.Modified },
  { value: 1, state: ElementStates.Modified },
];

const setArray = jest.fn();
const setLoading = jest.fn();

jest.setTimeout(35000);

describe('test if choosing to sort with ascending type', () => {
  it('test if selection sort works properly on an empty array', async () => {
    await doSlcSortAscending([], setLoading, setArray);
    expect(setArray).toHaveBeenCalledTimes(0);
  });
  it('test if bubble sort works properly on an empty array', async () => {
    await doBblSortAscending([], setLoading, setArray);
    expect(setArray).toHaveBeenCalledTimes(0);
  });

  it('test if selection sort works properly on an array with one element', async () => {
    await doSlcSortAscending(arrayWithOneElement, setLoading, setArray);
    expect(setArray).toHaveBeenCalledTimes(0);
  });
  it('test if bubble sort works properly on an array with one element', async () => {
    await doBblSortAscending(arrayWithOneElement, setLoading, setArray);
    expect(setArray).toHaveBeenCalledTimes(0);
  });

  it('test if selection sort works properly on an array with some elements', async () => {
    await doSlcSortAscending(arrayWithElements, setLoading, setArray);
    expect(setArray).toHaveBeenLastCalledWith(arrayAscendingResult);
  });
  it('test if bubble sort works properly on an array with some elements', async () => {
    await doBblSortAscending(arrayWithElements, setLoading, setArray);
    expect(setArray).toHaveBeenLastCalledWith(arrayAscendingResult);
  });
});

describe('test if choosing to sort with descending type', () => {
  it('test if selection sort works properly on an empty array', async () => {
    await doSlcSortDescending([], setLoading, setArray);
    expect(setArray).toHaveBeenCalledTimes(0);
  });
  it('test if bubble sort works properly on an empty array', async () => {
    await doBblSortDescending([], setLoading, setArray);
    expect(setArray).toHaveBeenCalledTimes(0);
  });

  it('test if selection sort works properly on an array with one element', async () => {
    await doSlcSortDescending(arrayWithOneElement, setLoading, setArray);
    expect(setArray).toHaveBeenCalledTimes(0);
  });
  it('test if bubble sort works properly on an array with one element', async () => {
    await doBblSortDescending(arrayWithOneElement, setLoading, setArray);
    expect(setArray).toHaveBeenCalledTimes(0);
  });

  it('test if selection sort works properly on an array with some elements', async () => {
    await doSlcSortDescending(arrayWithElements, setLoading, setArray);
    expect(setArray).toHaveBeenLastCalledWith(arrayDescendingResult);
  });
  it('test if bubble sort works properly on an array with some elements', async () => {
    await doBblSortDescending(arrayWithElements, setLoading, setArray);
    expect(setArray).toHaveBeenLastCalledWith(arrayDescendingResult);
  });
});
