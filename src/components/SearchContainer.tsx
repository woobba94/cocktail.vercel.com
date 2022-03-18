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
  const ingredients = useRef<string[]>([]);

  const { data, error } = useData('list.php?i=list', '');

  if (data && ingredients.current.length === 0) {
    Object.values(data.drinks).forEach((ingredient: any) => {
      ingredients.current.push(ingredient.strIngredient1);
    });
    ingredients.current.sort();
  }

  useEffect(() => {
    setIsSubmitted(false);
  }, [selectedList]);

  const handleOnChange = (e: any) => {
    setInputValue(e.target.value);
  };
  const handleOnAdd = () => {
    if (inputValue !== '' && selectedList.includes(inputValue) == false) {
      const newArr = [...selectedList];
      newArr.push(inputValue);
      setSelectedList(newArr);
    }
    setInputValue('');
  };

  const handleOnSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <Container>
      <Input
        placeholder="재료 입력"
        onChange={handleOnChange}
        value={inputValue}
      />
      {ingredients.current !== [] ? (
        <AutoComplete
          inputValue={inputValue}
          ingredients={ingredients.current}
        />
      ) : (
        <></>
      )}
      <MenuTab ingredients={ingredients.current} />
      <button onClick={handleOnAdd}>추가</button>
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
