import { useEffect, useState } from 'react';
import styled from 'styled-components';
interface AutoCompleteProps {
  inputValue: string;
  ingredients: string[];
  handleOnAdd: (
    e: React.TouchEvent | React.MouseEvent | React.KeyboardEvent,
  ) => void;
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
    let newArr: string[] = [];

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

    // 최대 개수 조절
    if (newArr.length > 10) {
      newArr = newArr.slice(0, 10);
    }

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
    <>
      {searchedIngredients.length ? (
        <Container>
          {searchedIngredients.map((ingredient: string, index: number) => {
            return (
              <Button
                key={ingredient}
                color={currentFocus === index ? 'pink' : '#fff'}
                dangerouslySetInnerHTML={{ __html: ingredient }}
                onClick={handleOnAdd}
              ></Button>
            );
          })}
        </Container>
      ) : null}
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  background-color: #fff;
  border: 1px solid #bbbbbb;
  border-radius: 10px;
  top: 100px;
  z-index: 1;
  padding: 8px;
  width: 100%;
  max-width: 300px;
  margin: 15px 10px 10px 10px;
`;

const Button = styled.button`
  width: 100%;
  margin: 2px 0;
  background-color: ${(props) => props.color};
  border: none;
  font-size: 24px;
  padding: 5px 10px;
  text-align: start;
  border-radius: 8px;
  cursor: pointer;
  :hover {
    background-color: pink;
  }
  b {
    color: #d86679;
  }
`;

export default AutoComplete;
