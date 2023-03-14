import React, { ChangeEvent, useState } from 'react';
import { Button } from '../ui/button/button';
import { RadioInput } from '../ui/radio-input/radio-input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Direction } from '../../types/direction';
import styles from '../forms.module.css';
import { Column } from '../ui/column/column';
import { TArrayNumber } from '../../types/array';
import {
  doBblSortAscending,
  doBblSortDescending,
  doSlcSortAscending,
  doSlcSortDescending,
  randomizeArray,
} from './sorting-utils';

export const SortingPage: React.FC = () => {
  const [array, setArray] = useState<Array<TArrayNumber>>([]);
  const [sortingType, setSortingType] = useState('выбор');
  const [sortingDirection, setSortingDirection] = useState<Direction>();
  const [isLoading, setIsLoading] = useState(false);

  const chooseTypeOfSorting = (e: ChangeEvent<HTMLInputElement>) => {
    setSortingType(e.target.value);
  };

  const onNewArrayClick = () => {
    setArray([...randomizeArray()]);
  };

  const startSortingProcedure = (sortingDirection: Direction) => {
    setSortingDirection(sortingDirection);

    if (sortingDirection === Direction.Ascending && sortingType === 'выбор')
      doSlcSortAscending(array, setIsLoading, setArray);
    if (sortingDirection === Direction.Descending && sortingType === 'выбор')
      doSlcSortDescending(array, setIsLoading, setArray);
    if (sortingDirection === Direction.Ascending && sortingType === 'пузырёк')
      doBblSortAscending(array, setIsLoading, setArray);
    if (sortingDirection === Direction.Descending && sortingType === 'пузырёк')
      doBblSortDescending(array, setIsLoading, setArray);
  };

  const setButtonLoading = (direction: Direction) => {
    if (direction === sortingDirection && isLoading) {
      return true;
    }
    return false;
  };

  const setButtonDisabled = (direction: Direction) => {
    if (direction !== sortingDirection && isLoading) {
      return true;
    }
    return false;
  };

  return (
    <SolutionLayout title='Сортировка массива'>
      <div className={styles.sorting__area}>
        <div className={styles.sorting__input}>
          <RadioInput
            label={'Выбор'}
            name={'radio'}
            value={'выбор'}
            onChange={chooseTypeOfSorting}
            disabled={isLoading}
            checked={sortingType === 'выбор'}
          />
          <RadioInput
            label={'Пузырёк'}
            name={'radio'}
            value={'пузырёк'}
            onChange={chooseTypeOfSorting}
            disabled={isLoading}
            checked={sortingType === 'пузырёк'}
          />
        </div>
        <div className={styles.sorting__button}>
          <Button
            text={'По возрастанию'}
            sorting={Direction.Ascending}
            onClick={() => startSortingProcedure(Direction.Ascending)}
            isLoader={setButtonLoading(Direction.Ascending)}
            disabled={setButtonDisabled(Direction.Ascending) || array.length === 0}
          />
          <Button
            text={'По убыванию'}
            sorting={Direction.Descending}
            onClick={() => startSortingProcedure(Direction.Descending)}
            isLoader={setButtonLoading(Direction.Descending)}
            disabled={setButtonDisabled(Direction.Descending) || array.length === 0}
          />
        </div>
        <Button
          text={'Новый массив'}
          onClick={onNewArrayClick}
          disabled={isLoading}
        />
      </div>
      <ul className={styles.sorting__list}>
        {array.map((item, index) => {
          return (
            <li key={index}>
              <Column
                index={item.value}
                state={item.state}
              />
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
