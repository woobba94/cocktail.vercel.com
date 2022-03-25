import { useEffect, useState } from 'react';
import styled from 'styled-components';
interface AutoCompleteProps {
  inputValue: string;
  ingredients: string[];
  handleOnAdd: (value: any) => void;
  currentFocus: number;
  setCurrentFocus: (value: number) => void;
  setInputValue: (value: string) => void;
  isNewInput: boolean;
  setCurrentItem: (value: string) => void;
  isArrowPressed: boolean;
}

const AutoComplete = ({
  inputValue,
  ingredients,
  handleOnAdd,
  currentFocus,
  setInputValue,
  setCurrentFocus,
  isNewInput,
  setCurrentItem,
  isArrowPressed,
}: AutoCompleteProps) => {
  const [searchedIngredients, setSearchedIngredients] = useState<string[]>([]);

  useEffect(() => {
    // 포커스가 넘어갈 때 포커스 컨트롤
    if (currentFocus < 0 || currentFocus === searchedIngredients.length) {
      currentFocus < 0
        ? setCurrentFocus(searchedIngredients.length - 1)
        : setCurrentFocus(0);
    }

    // null인 경우 return => 오버플로우가 일어남
    if (!searchedIngredients[currentFocus]) return;
    const ingredient = removeHighlight(searchedIngredients[currentFocus]);
    setCurrentItem(ingredient);

    // 포커스에 따라 input값 세팅
    isArrowPressed && setInputValue(ingredient);
  }, [currentFocus]);

  useEffect(() => {
    setCurrentFocus(0);
    // null인 경우 return => 오버플로우가 일어남
    if (!searchedIngredients[currentFocus]) return;
    const ingredient = removeHighlight(searchedIngredients[currentFocus]);
    setCurrentItem(ingredient);
  }, [searchedIngredients]);

  useEffect(() => {
    // 새로운값이 아니거나 빈문자열
    if (!isNewInput || !inputValue) {
      !inputValue && setSearchedIngredients([]);
      return;
    }
    const newArr: string[] = [];

    ingredients.sort();
    ingredients.forEach((ingredient: string) => {
      ingredient = ingredient.toLowerCase();
      inputValue = inputValue.toLowerCase();
      const index = ingredient.indexOf(inputValue);
      // 일치하는 문자가 없으면 return
      if (index === -1) return;

      ingredient = addHighlight(ingredient);

      // 첫번째 문자부터 일치하면 inputValue 첫글자를 대문자로
      // 아니면 ingredient 첫글자 변경
      ingredient =
        index === 0
          ? ingredient.replaceAll(inputValue, capitalize(inputValue))
          : capitalize(ingredient);

      newArr.push(ingredient);
    });

    setSearchedIngredients(newArr);
  }, [inputValue]);

  // 첫글자 대문자로 반환
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // 문자열 강조
  const addHighlight = (str: string) => {
    return str.replaceAll(inputValue, `<b>${inputValue}</b>`);
  };
  // 문자열 일반화
  const removeHighlight = (str: string) => {
    return str.replaceAll('<b>', '').replaceAll('</b>', '');
  };

  return (
    <Container>
      {searchedIngredients.map((ingredient: string, index: number) => {
        return (
          <Button
            key={ingredient}
            color={currentFocus === index ? 'pink' : 'skyblue'}
            dangerouslySetInnerHTML={{ __html: ingredient }}
            onClick={handleOnAdd}
          ></Button>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  width: 100%;
  max-width: 400px;
  background-color: royalblue;
  top: 50px;
`;

const Button = styled.button`
  background-color: ${(props) => props.color};
`;

export default AutoComplete;
