import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import AutoComplete from './AutoComplete';
import { useData } from 'src/hooks/useData';
import MenuTab from './Category';

interface SearchContainerProps {
  selectedList: string[];
  setSelectedList: (value: string[]) => void;
  setIsSubmitted: (value: boolean) => void;
}

const SearchContainer = ({
  selectedList,
  setSelectedList,
  setIsSubmitted,
}: SearchContainerProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [currentItem, setCurrentItem] = useState<string>('');
  const [currentFocus, setCurrentFocus] = useState<number>(0);
  const [isNewInput, setIsNewInput] = useState<boolean>(false);
  const [isArrowPressed, setIsArrowPressed] = useState<boolean>(false);
  const ingredients = useRef<string[]>([]);

  const { data, error } = useData('list.php?i=list', '');

  if (data && ingredients.current.length === 0) {
    Object.values(data.drinks).forEach((ingredient: any) => {
      ingredients.current.push(ingredient.strIngredient1);
    });
    ingredients.current.sort();
  }

  useEffect(() => {
    console.log(currentItem);
  }, [currentItem]);

  useEffect(() => {
    setIsSubmitted(false);
  }, [selectedList]);

  const handleOnChange = (e: any) => {
    setInputValue(e.target.value);
  };
  const handleOnAdd = (e: any) => {
    const value = e.currentTarget.textContent;

    if (value && inputValue !== '' && selectedList.includes(value) == false) {
      const newArr = [...selectedList];
      newArr.push(value);
      setSelectedList(newArr);
    }
    setInputValue('');
  };

  const handleOnSubmit = () => {
    setIsSubmitted(true);
  };

  const handleKeyUp = (e: any) => {
    if (e.key === 'Enter') {
      if (
        currentItem &&
        inputValue !== '' &&
        selectedList.includes(currentItem) == false
      ) {
        const newArr = [...selectedList];
        newArr.push(currentItem);
        setSelectedList(newArr);
      }
      setInputValue('');
      return;
    }
    if (
      (/[a-zA-Z]/g.test(e.key) && e.key.length === 1) ||
      e.key === 'Backspace'
    ) {
      setIsNewInput(true);
      setIsArrowPressed(false);
    } else {
      setIsNewInput(false);
      setIsArrowPressed(false);
    }
    if (e.key == 'ArrowDown') {
      setCurrentFocus(currentFocus + 1);
      setIsArrowPressed(true);
    } else if (e.key == 'ArrowUp') {
      setCurrentFocus(currentFocus - 1);
      setIsArrowPressed(true);
    }
  };

  return (
    <Container>
      <Input
        placeholder="재료 입력"
        onChange={handleOnChange}
        value={inputValue}
        onKeyUp={handleKeyUp}
      />
      {ingredients.current !== [] ? (
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
      ) : (
        <></>
      )}
      <MenuTab ingredients={ingredients.current} />
      <button onClick={handleOnSubmit}>제출</button>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  position: fixed;
  background-color: whitesmoke;
  z-index: 2;
`;
const Input = styled.input`
  width: 100%;
  max-width: 400px;
  height: 50px;
`;

export default SearchContainer;
