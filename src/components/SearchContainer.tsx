import { useRef, useState } from 'react';
import styled from 'styled-components';
import AutoComplete from './AutoComplete';
import { useData } from 'src/hooks/useData';
import Category from './Category';
import { getNewArray, resetStorage } from 'src/utils/utils';

interface SearchContainerProps {
  selectedList: string[];
  setSelectedList: (value: string[]) => void;
}

const SearchContainer = ({
  selectedList,
  setSelectedList,
}: SearchContainerProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [currentItem, setCurrentItem] = useState<string>('');
  const [currentFocus, setCurrentFocus] = useState<number>(0);
  const [isNewInput, setIsNewInput] = useState<boolean>(false);
  const [isArrowPressed, setIsArrowPressed] = useState<boolean>(false);
  const ingredients = useRef<string[]>([]);

  const { data, error } = useData('list.php?i=list', '');

  const initIngredients = () => {
    Object.values<{ strIngredient1: string }>(data.drinks).forEach(
      (ingredient) => {
        ingredients.current.push(ingredient.strIngredient1);
      },
    );
    ingredients.current.sort();
  };

  if (error) {
    console.log('api error');
  }

  data && ingredients.current.length === 0 && initIngredients();

  const handleInput = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleOnAdd = (e: any) => {
    const value =
      e.currentTarget.textContent === ''
        ? currentItem
        : e.currentTarget.textContent;

    if (value && selectedList.includes(value) == false) {
      setSelectedList(getNewArray(selectedList, value));
      setInputValue('');
    }
    resetStorage();
  };

  const handleKeyUp = (e: any) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      setIsArrowPressed(true);
      setIsNewInput(false);
      setCurrentFocus(
        e.key === 'ArrowDown' ? currentFocus + 1 : currentFocus - 1,
      );
      return;
    } else {
      setIsArrowPressed(false);
    }
    if (e.key === 'Enter') {
      handleOnAdd(e);
      return;
    }

    const isChar = (str: string) => {
      return /[a-zA-Z]/g.test(str) && str.length === 1;
    };

    if (isChar(e.key)) {
      setIsNewInput(true);
      return;
    }
  };

  return (
    <Container>
      <Input
        placeholder="재료 입력"
        onChange={handleInput}
        value={inputValue}
        onKeyUp={handleKeyUp}
      />
      {ingredients.current.length > 0 ? (
        <AutoComplete
          inputValue={inputValue}
          ingredients={ingredients.current}
          handleOnAdd={handleOnAdd}
          currentFocus={currentFocus}
          setCurrentFocus={setCurrentFocus}
          setInputValue={setInputValue}
          isNewInput={isNewInput}
          setCurrentItem={setCurrentItem}
          isArrowPressed={isArrowPressed}
        />
      ) : null}
      <Category
        ingredients={ingredients.current}
        setSelectedList={setSelectedList}
        selectedList={selectedList}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  background-color: whitesmoke;
`;
const Input = styled.input`
  width: 100%;
  max-width: 400px;
  height: 50px;
`;

export default SearchContainer;
