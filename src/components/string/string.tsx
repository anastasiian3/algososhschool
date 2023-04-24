import React, { FormEvent, useState } from 'react';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from '../forms.module.css';
import { Circle } from '../ui/circle/circle';
import { DELAY_IN_MS } from '../../constants/delays';
import { ElementStates } from '../../types/element-states';
import { TArray } from '../../types/array';
import { delayVisualisation, swap } from '../../utils/utils';

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [array, setArray] = useState<Array<TArray>>([]);
  const [isLoader, setIsLoader] = useState(false);

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.currentTarget.value;
    setInputValue(value);
  };

  const reverseString = async (array: TArray[]) => {
    setIsLoader(true);
    const mid = Math.ceil(array.length / 2);

    for (let i = 0; i < mid; i++) {
      let j = array.length - 1 - i;

      if (i !== j) {
        array[i].state = ElementStates.Changing;
        array[j].state = ElementStates.Changing;
        setArray([...array]);
        await delayVisualisation(DELAY_IN_MS);
      }

      swap(array, i, j);

      array[i].state = ElementStates.Modified;
      array[j].state = ElementStates.Modified;

      setArray([...array]);
    }
    setIsLoader(false);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const stringToArray = inputValue.split('').map((value) => ({ value, state: ElementStates.Default }));
    reverseString(stringToArray);
    setInputValue('');
  };

  return (
    <SolutionLayout title='Строка'>
      <form
        className={styles.input__area}
        onSubmit={handleFormSubmit}
      >
        <Input
          isLimitText
          maxLength={11}
          value={inputValue}
          onChange={handleInputChange}
          data-testid={'input'}
        />
        <Button
          text={'Развернуть'}
          disabled={!inputValue}
          isLoader={isLoader}
          type={'submit'}
          data-testid={'button'}
        />
      </form>
      <ul className={styles.list}>
        {array &&
          array.map((item, index) => (
            <li key={index}>
              <Circle
                letter={item.value}
                state={item.state}
              />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
