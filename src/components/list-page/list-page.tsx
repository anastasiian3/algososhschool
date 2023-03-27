import React, { FormEvent, useMemo, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from '../forms.module.css';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import { LinkedList } from './list-utils';
import { ActionType } from '../../types/action-types';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { Circle } from '../ui/circle/circle';
import { ArrowIcon } from '../ui/icons/arrow-icon';
import { ElementStates } from '../../types/element-states';
import { TArray } from '../../types/array';
import { delayVisualisation } from '../../utils/utils';

export const ListPage: React.FC = () => {
  const initialValues = useMemo(() => ['0', '97', '81', '17'], []);
  const list = useMemo(() => new LinkedList<string>(initialValues), [initialValues]);
  const [inputValue, setInputValue] = useState('');
  const [inputIndex, setInputIndex] = useState('');
  const [typeOfAction, setTypeOfAction] = useState<ActionType>();
  const [isLoading, setIsLoading] = useState(false);
  const [listArray, setListArray] = useState<TArray[]>(list.toArray());
  const [addToHeadAction, setAddToHeadAction] = useState(false);
  const [addToTailAction, setAddToTailAction] = useState(false);
  const [deleteFromHeadAction, setDeleteFromHeadAction] = useState(false);
  const [deleteFromTailAction, setDeleteFromTailAction] = useState(false);
  const [addByIndexAction, setAddByIndexAction] = useState(false);
  const [deleteByIndexAction, setDeleteByIndexAction] = useState(false);
  const [deletedValue, setDeletedValue] = useState('');
  const [userIndex, setUserIndex] = useState<number>();

  const handleInputValueChange = (e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value.trim());
  };

  const handleInputIndexChange = (e: FormEvent<HTMLInputElement>) => {
    setInputIndex(e.currentTarget.value.trim());
  };

  const addToHead = async () => {
    if (list.getSize() < 7) {
      setIsLoading(true);
      setTypeOfAction(ActionType.AddToHead);
      setUserIndex(0);
      setAddToHeadAction(true);
      await delayVisualisation(SHORT_DELAY_IN_MS);
      list.prepend(inputValue);
      setAddToHeadAction(false);
      const modifiedArray = list.toArray();
      modifiedArray[0].state = ElementStates.Modified;
      setListArray(modifiedArray);
      await delayVisualisation(SHORT_DELAY_IN_MS);
      modifiedArray[0].state = ElementStates.Default;
      setListArray(modifiedArray);
    }
    setInputValue('');
    setIsLoading(false);
  };

  const addToTail = async () => {
    if (list.getSize() < 7) {
      setIsLoading(true);
      setTypeOfAction(ActionType.AddToTail);
      setUserIndex(list.getSize() - 1);
      setAddToTailAction(true);
      await delayVisualisation(SHORT_DELAY_IN_MS);
      list.append(inputValue);
      setAddToTailAction(false);
      const modifiedArray = list.toArray();
      modifiedArray[list.getSize() - 1].state = ElementStates.Modified;
      setListArray(modifiedArray);
      modifiedArray[list.getSize() - 1].state = ElementStates.Default;
      await delayVisualisation(SHORT_DELAY_IN_MS);
    }
    setInputValue('');
    setIsLoading(false);
  };

  const deleteHead = async () => {
    setInputValue('');
    if (list.getSize()) {
      let listItems = list.toArray();
      setDeletedValue(listItems[0].value);
      setIsLoading(true);
      setUserIndex(0);
      listItems[0] = { value: '', state: ElementStates.Default };
      setListArray(listItems);
      setDeleteFromHeadAction(true);
      await delayVisualisation(SHORT_DELAY_IN_MS);
      setTypeOfAction(ActionType.DeleteHead);
      await delayVisualisation(SHORT_DELAY_IN_MS);
      setDeleteFromHeadAction(false);
      setListArray(listItems);
      list.removeHead();
      setListArray(list.toArray());
      setIsLoading(false);
    }
  };

  const deleteTail = async () => {
    setInputValue('');
    if (list.getSize() > 0) {
      let listItems = list.toArray();
      setDeletedValue(listItems[list.getSize() - 1].value);
      setTypeOfAction(ActionType.DeleteTail);
      setIsLoading(true);
      setUserIndex(list.getSize() - 1);
      listItems[list.getSize() - 1] = { value: '', state: ElementStates.Default };
      setListArray(listItems);
      setDeleteFromTailAction(true);
      await delayVisualisation(SHORT_DELAY_IN_MS);
      list.removeTail();
      await delayVisualisation(SHORT_DELAY_IN_MS);
      setListArray(list.toArray());
      setDeleteFromTailAction(false);
      setIsLoading(false);
    }
  };

  const addValueByIndex = async () => {
    if (Number(inputIndex) < 5 && list.getSize() < 6) {
      setIsLoading(true);
      setAddByIndexAction(true);
      const modifiedArray = list.toArray();
      for (let i = 0; i <= Number(inputIndex); i++) {
        setUserIndex(i);
        await delayVisualisation(SHORT_DELAY_IN_MS);
        if (i < Number(inputIndex)) {
          modifiedArray[i].state = ElementStates.Changing;
          setListArray(modifiedArray);
        }
      }
      setAddByIndexAction(false);
      list.insertAt(inputValue, Number(inputIndex));
      const finalArr = list.toArray();
      finalArr[Number(inputIndex)].state = ElementStates.Modified;

      setListArray(finalArr);
      await delayVisualisation(SHORT_DELAY_IN_MS);
      finalArr[Number(inputIndex)].state = ElementStates.Default;
      setListArray(finalArr);
    }
    setInputValue('');
    setInputIndex('');
    setIsLoading(false);
  };

  const deleteValueByIndex = async () => {
    if (Number(inputIndex) < list.getSize() && Number(inputIndex) < 7) {
      setIsLoading(true);
      const modifiedArray = list.toArray();
      for (let i = 0; i <= Number(inputIndex); i++) {
        await delayVisualisation(SHORT_DELAY_IN_MS);
        modifiedArray[i].state = ElementStates.Changing;
        setListArray([...modifiedArray]);
      }
      setUserIndex(Number(inputIndex));
      await delayVisualisation(SHORT_DELAY_IN_MS);
      setDeletedValue(modifiedArray[Number(inputIndex)].value);
      modifiedArray[Number(inputIndex)].value = '';
      setDeleteByIndexAction(true);
      modifiedArray[Number(inputIndex)].state = ElementStates.Default;
      setListArray(modifiedArray);
      await delayVisualisation(SHORT_DELAY_IN_MS);
      list.deleteAt(Number(inputIndex));
      setListArray(list.toArray());
      setInputIndex('');
      setDeleteByIndexAction(false);
      setIsLoading(false);
    }
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

  const showHeadName = (index: number) => {
    if (index === 0 && !addToHeadAction && !addByIndexAction) {
      return 'head';
    } else if (index === 0 && addByIndexAction && userIndex !== 0) {
      return 'head';
    } else {
      return '';
    }
  };

  const showTailName = (index: number) => {
    if (index === listArray.length - 1 && !deleteFromTailAction && !deleteByIndexAction) {
      return 'tail';
    } else if (listArray.length === 1) {
      return '';
    } else {
      return '';
    }
  };

  return (
    <SolutionLayout title='Связный список'>
      <div className={styles.list__area}>
        <div className={styles.list__area_text}>
          <Input
            isLimitText={true}
            maxLength={4}
            value={inputValue}
            onChange={handleInputValueChange}
            data-testid={'input-value'}
          />
          <Button
            text={'Добавить в head'}
            onClick={addToHead}
            isLoader={setButtonLoading(ActionType.AddToHead)}
            disabled={!inputValue || setButtonDisabled(ActionType.AddToHead)}
            data-testid={'button-add-to-head'}
          />
          <Button
            text={'Добавить в tail'}
            onClick={addToTail}
            isLoader={setButtonLoading(ActionType.AddToTail)}
            disabled={!inputValue || setButtonDisabled(ActionType.AddToTail)}
            data-testid={'button-add-to-tail'}
          />
          <Button
            text={'Удалить из head'}
            onClick={deleteHead}
            isLoader={setButtonLoading(ActionType.DeleteHead)}
            disabled={setButtonDisabled(ActionType.DeleteHead) || list.getSize() === 0}
            data-testid={'button-delete-from-head'}
          />
          <Button
            text={'Удалить из tail'}
            onClick={deleteTail}
            isLoader={setButtonLoading(ActionType.DeleteTail)}
            disabled={setButtonDisabled(ActionType.DeleteTail) || list.getSize() === 0}
            data-testid={'button-delete-from-tail'}
          />
        </div>
        <div className={styles.list__area_index}>
          <Input
            placeholder={'Введите индекс'}
            value={inputIndex}
            onChange={handleInputIndexChange}
            type={'number'}
            min={0}
            data-testid={'input-index'}
          />
          <Button
            text={'Добавить по индексу'}
            disabled={!inputIndex || !inputValue || Number(inputIndex) > list.getSize()}
            onClick={addValueByIndex}
            data-testid={'button-add-by-index'}
          />
          <Button
            text={'Удалить по индексу'}
            disabled={!inputIndex || Number(inputIndex) > list.getSize() - 1}
            onClick={deleteValueByIndex}
            data-testid={'button-delete-by-index'}
          />
        </div>
      </div>
      <ul className={`${styles.list}`}>
        {listArray &&
          listArray.map((item, index) => (
            <li
              key={index}
              className={`${styles.list__arrow} `}
            >
              {isLoading && (addToHeadAction || addToTailAction || addByIndexAction) && index === userIndex && (
                <div className={styles.circle_type_top}>
                  <Circle
                    letter={inputValue}
                    state={ElementStates.Changing}
                    isSmall
                  />
                </div>
              )}

              {isLoading && (deleteFromHeadAction || deleteFromTailAction || deleteByIndexAction) && index === userIndex && (
                <div className={styles.circle_type_bottom}>
                  <Circle
                    letter={deletedValue}
                    state={ElementStates.Changing}
                    isSmall
                  />
                </div>
              )}
              <Circle
                letter={item.value}
                state={item.state}
                index={index}
                head={showHeadName(index)}
                tail={showTailName(index)}
              />
              {index < listArray.length - 1 && (
                <ArrowIcon fill={item.state !== ElementStates.Changing ? '#0032FF' : '#d252e1'} />
              )}
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
