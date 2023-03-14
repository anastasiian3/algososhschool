import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from '../forms.module.css';
import { Circle } from '../ui/circle/circle';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { v4 as key } from 'uuid';
import { delayVisualisation } from '../../utils/utils';

export const FibonacciPage: React.FC = () => {
  const [number, setNumber] = useState('');
  const [fibonacciArray, setFibonacciArray] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNumber(value);
  };

  const getFibonacciSequence = (number: number) => {
    const arr = [1, 1];
    for (let i = 2; i < number + 1; i++) {
      arr.push(arr[i - 2] + arr[i - 1]);
    }
    return arr;
  };

  const setJustifyContent = fibonacciArray.length > 9 ? `${styles.list_type_modified}` : '';

  const onNumberSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const fibonacciArray: number[] = getFibonacciSequence(Number(number));
    let index = 0;
    const array: number[] = [];
    while (index <= Number(number)) {
      await delayVisualisation(SHORT_DELAY_IN_MS);
      array.push(fibonacciArray[index]);
      setFibonacciArray([...array]);
      index++;
    }
    setIsLoading(false);
  };

  return (
    <SolutionLayout title='Последовательность Фибоначчи'>
      <form
        className={styles.input__area}
        onSubmit={onNumberSubmit}
      >
        <Input
          isLimitText
          type={'number'}
          max={19}
          onChange={handleChange}
          value={number}
        />
        <Button
          text={'Рассчитать'}
          type={'submit'}
          isLoader={isLoading}
          disabled={!number || (Number(number) >= 1 && Number(number) <= 19 ? false : true)}
        />
      </form>
      <ul className={`${styles.list} ${setJustifyContent}`}>
        {fibonacciArray.map((number, index) => (
          <Circle
            key={key()}
            letter={String(number)}
            index={index}
          />
        ))}
      </ul>
    </SolutionLayout>
  );
};
