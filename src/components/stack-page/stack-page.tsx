import React, { FormEvent, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from '../forms.module.css';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { TArray } from '../../types/array';
import { Stack } from './stack-utils';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { ElementStates } from '../../types/element-states';
import { Circle } from '../ui/circle/circle';
import { ActionType } from '../../types/action-types';
import { delayVisualisation } from '../../utils/utils';

export const StackPage: React.FC = () => {
  const [stack] = useState(new Stack<TArray>(20));
  const [inputValue, setInputValue] = useState('');
  const [stackArray, setStackArray] = useState<TArray[]>([]);
  const [typeOfAction, setTypeOfAction] = useState<ActionType>();
  const [isLoading, setIsLoading] = useState(false);

  const onInputChange = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.trim();
    setInputValue(value);
  };

  const handleAddItem = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    stack.push({ value: inputValue, state: ElementStates.Changing });
    setTypeOfAction(ActionType.Add);
    setIsLoading(true);
    setStackArray([...stack.getItems()]);
    setInputValue('');
    await delayVisualisation(SHORT_DELAY_IN_MS);
    const lastItem = stack.peak();
    if (lastItem) {
      lastItem.state = ElementStates.Default;
    }
    setStackArray([...stack.getItems()]);
    setIsLoading(false);
  };

  const handleDeleteItem = async () => {
    setTypeOfAction(ActionType.Delete);
    setIsLoading(true);
    const lastItem = stack.peak();
    if (lastItem) {
      lastItem.state = ElementStates.Changing;
    }
    setStackArray([...stack.getItems()]);
    await delayVisualisation(SHORT_DELAY_IN_MS);
    stack.pop();
    setStackArray([...stack.getItems()]);
    setIsLoading(false);
  };

  const deleteAllStackItems = () => {
    setTypeOfAction(ActionType.DeleteAll);
    setIsLoading(true);
    stack.clear();
    setStackArray([...stack.getItems()]);
    setIsLoading(false);
  };

  const setButtonLoading = (actionType: ActionType) => {
    if (actionType === typeOfAction && isLoading) {
      return true;
    }
    return false;
  };

  const setButtonDisabled = (actionType: ActionType) => {
    if (actionType !== typeOfAction && isLoading) {
      return true;
    }
    return false;
  };

  const setJustifyContent = stackArray.length > 9 ? `${styles.list_type_modified}` : '';

  return (
    <SolutionLayout title='Стек'>
      <form
        className={styles.stack__area}
        onSubmit={handleAddItem}
      >
        <Input
          isLimitText={true}
          maxLength={4}
          onChange={onInputChange}
          value={inputValue}
        />
        <Button
          text={'Добавить'}
          disabled={!inputValue || setButtonDisabled(ActionType.Add) || stackArray.length > 19}
          isLoader={setButtonLoading(ActionType.Add)}
          type={'submit'}
        />
        <Button
          text={'Удалить'}
          onClick={handleDeleteItem}
          disabled={stackArray.length === 0 || setButtonDisabled(ActionType.Delete)}
          isLoader={setButtonLoading(ActionType.Delete)}
        />

        <Button
          text={'Очистить'}
          extraClass={styles.stack__button}
          onClick={deleteAllStackItems}
          disabled={stackArray.length === 0 || setButtonDisabled(ActionType.DeleteAll)}
          isLoader={setButtonLoading(ActionType.DeleteAll)}
        />
      </form>
      <ul className={`${styles.list} ${setJustifyContent}`}>
        {stackArray &&
          stackArray.map((item, index) => (
            <li key={index}>
              <Circle
                letter={item.value}
                state={item.state}
                index={index}
                head={stackArray.length - 1 === index ? 'top' : ''}
              />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
