import { useRef, useState } from 'react';
import styled from 'styled-components';
import AutoComplete from './AutoComplete';
import { useData } from 'src/hooks/useData';
import Category from './Category';
import { getNewArray, resetStorage } from 'src/utils/utils';
import TagList from './TagList';
import Error from 'src/components/Error';

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
  const [isNewInput, setIsNewInput] = useState<boolean>(true);
  const [isArrowPressed, setIsArrowPressed] = useState<boolean>(false);
  const ingredients = useRef<string[]>([]);

  const { data, error } = useData('list.php?i=list', '');

  if (error) {
    return <Error />;
  }

  const initIngredients = () => {
    Object.values<{ strIngredient1: string }>(data.drinks).forEach(
      (ingredient) => {
        ingredients.current.push(ingredient.strIngredient1);
      },
    );
    ingredients.current.sort();
  };

  data && ingredients.current.length === 0 && initIngredients();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleOnAdd = (
    e: React.TouchEvent | React.MouseEvent | React.KeyboardEvent,
  ) => {
    let value =
      e.currentTarget.textContent === ''
        ? currentItem
        : e.currentTarget.textContent;

    if (value && Object.values(selectedList).includes(value) == false) {
      value = value[0].toUpperCase() + value.slice(1).toLowerCase();
      setSelectedList(getNewArray(Object.values(selectedList), value));
      setInputValue('');
    }
    resetStorage();
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      setIsArrowPressed(true);
      setIsNewInput(false);
      setCurrentFocus(
        e.key === 'ArrowDown' ? currentFocus + 1 : currentFocus - 1,
      );
      return;
    } else {
      setIsNewInput(true);
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

  const handleReset = () => {
    setInputValue('');
  };

  return (
    <Container>
      <div className="cont-input">
        <Input
          placeholder="재료 입력"
          onChange={handleInput}
          value={inputValue}
          onKeyUp={handleKeyUp}
        />
        <button
          onClick={handleReset}
          style={{ display: inputValue === '' ? 'none' : 'inline-block' }}
        >
          ⓧ
        </button>
      </div>
      <TagList selectedList={selectedList} setSelectedList={setSelectedList} />
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

  .cont-input {
    display: flex;
    align-items: center;
    button {
      position: relative;
      left: -50px;
      font-size: 24px;
      color: #c5c5c5;
      cursor: pointer;
    }
  }
`;
const Input = styled.input`
  margin: 10px;
  width: 100%;
  max-width: 300px;
  height: 50px;
  border-radius: 10px;
  border: 1px solid #bbb;
  padding: 5px 18px;
  font-size: 20px;
  ::placeholder {
    font-size: 18px;
  }
  :focus {
    outline: none;
    border: 1px solid pink;
  }
`;

export default SearchContainer;
