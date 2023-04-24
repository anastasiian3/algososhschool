import React, { FormEvent, useState } from 'react';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from '../forms.module.css';
import { Button } from '../ui/button/button';
import { arrayLength, initialArray, Queue } from './queue-utils';
import { Circle } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { ActionType } from '../../types/action-types';
import { delayVisualisation } from '../../utils/utils';

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [queue] = useState(new Queue<string>(arrayLength));
  const [queueArray, setQueueArray] = useState(initialArray);
  const [typeOfAction, setTypeOfAction] = useState<ActionType>();
  const [isLoading, setIsLoading] = useState(false);

  const onInputChange = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.trim();
    setInputValue(value);
  };

  const addItemToQueue = async () => {
    if (queue.getSize() < 7) {
      setIsLoading(true);
      setTypeOfAction(ActionType.Add);
      const array = [...queueArray];
      const tailIndex = queue.getTailIndex();
      array[tailIndex].state = ElementStates.Changing;
      setQueueArray([...array]);
      await delayVisualisation(SHORT_DELAY_IN_MS);
      queue.enqueue(inputValue);
      array[tailIndex].value = inputValue;
      setQueueArray([...array]);
      setInputValue('');
      array[tailIndex].state = ElementStates.Default;
      setQueueArray([...array]);
      setIsLoading(false);
    } else {
      throw new Error('Maximum queue length exceeded');
    }
  };

  const deleteItemFromQueue = async () => {
    setIsLoading(true);
    setTypeOfAction(ActionType.Delete);
    queue.dequeue();
    const array = [...queueArray];
    const headIndex = queue.getHeadIndex();
    array[headIndex - 1].state = ElementStates.Changing;
    setQueueArray([...array]);
    await delayVisualisation(SHORT_DELAY_IN_MS);
    array[headIndex - 1].value = '';
    setQueueArray([...array]);
    setInputValue('');
    array[headIndex - 1].state = ElementStates.Default;
    setQueueArray([...array]);
    setIsLoading(false);
  };

  const deleteAllQueueItems = () => {
    setTypeOfAction(ActionType.DeleteAll);
    setIsLoading(true);
    queue.clear();
    setQueueArray(
      Array.from({ length: arrayLength }, () => ({
        value: '',
        state: ElementStates.Default,
      }))
    );
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

  return (
    <SolutionLayout title='Очередь'>
      <div className={styles.stack__area}>
        <Input
          value={inputValue}
          isLimitText={true}
          maxLength={4}
          onChange={onInputChange}
          data-testid={'input'}
        />
        <Button
          text={'Добавить'}
          disabled={!inputValue || queue.getTailIndex() === 7 || setButtonDisabled(ActionType.Add)}
          onClick={addItemToQueue}
          isLoader={setButtonLoading(ActionType.Add)}
          data-testid={'button'}
        />
        <Button
          text={'Удалить'}
          onClick={deleteItemFromQueue}
          disabled={queue.isEmpty() || setButtonDisabled(ActionType.Delete)}
          isLoader={setButtonLoading(ActionType.Delete)}
          data-testid={'button_delete'}
        />
        <Button
          text={'Очистить'}
          extraClass={styles.stack__button}
          disabled={queue.isEmpty() || setButtonDisabled(ActionType.DeleteAll)}
          onClick={deleteAllQueueItems}
          isLoader={setButtonLoading(ActionType.DeleteAll)}
          data-testid={'button_clear'}
        />
      </div>
      <ul className={`${styles.list} `}>
        {queueArray &&
          queueArray.map((item, index) => (
            <li key={index}>
              <Circle
                letter={item.value}
                state={item.state}
                index={index}
                head={
                  (index === queue.getHeadIndex() && !queue.isEmpty()) ||
                  (index === queue.getHeadIndex() && queue.getHeadIndex() === queue.getSize() - 1)
                    ? 'top'
                    : ''
                }
                tail={queue.getTailIndex() - 1 === index && !queue.isEmpty() ? 'tail' : ''}
              />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
