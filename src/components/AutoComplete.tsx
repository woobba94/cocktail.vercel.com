import { useEffect, useState } from 'react';
import styled from 'styled-components';
interface AutoCompleteProps {
  inputValue: string;
  ingredients: string[];
  handleOnAdd: (value: any) => void;
  currentFocus: number;
  setCurrentFocus: (value: any) => void;
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
    if (currentFocus >= searchedIngredients.length) {
      setCurrentFocus(0);
    } else if (currentFocus < 0) {
      setCurrentFocus(searchedIngredients.length - 1);
    }

    if (searchedIngredients[currentFocus]) {
      const ingredient = searchedIngredients[currentFocus]
        .replaceAll('<b>', '')
        .replaceAll('</b>', '');
      if (isArrowPressed) setInputValue(ingredient);
    }

    setCurrentItem(
      searchedIngredients[currentFocus]
        ?.replaceAll('<b>', '')
        .replaceAll('</b>', ''),
    );
  }, [currentFocus]);

  useEffect(() => {
    setCurrentFocus(0);
    setCurrentItem(
      searchedIngredients[currentFocus]
        ?.replaceAll('<b>', '')
        .replaceAll('</b>', ''),
    );
  }, [searchedIngredients]);

  useEffect(() => {
    if (!inputValue) {
      setSearchedIngredients([]);
    } else if (isNewInput && ingredients) {
      ingredients.sort();
      const newArr: string[] = [];

      ingredients.forEach((ingredient: string) => {
        ingredient = ingredient.toLowerCase();
        inputValue = inputValue.toLowerCase();

        const index = ingredient.indexOf(inputValue);

        // 일치할 때
        if (index > -1) {
          ingredient = ingredient.replaceAll(
            inputValue,
            `<b>${inputValue}</b>`,
          );

          // 첫번째 문자가 일치
          if (index === 0) {
            ingredient = ingredient.replaceAll(
              inputValue,
              // 대문자로 변경
              inputValue.charAt(0).toUpperCase() + inputValue.slice(1),
            );
          } else {
            ingredient =
              ingredient.charAt(0).toUpperCase() + ingredient.slice(1);
          }

          newArr.push(ingredient);
        }
      });
      setSearchedIngredients(newArr);
    }
  }, [inputValue]);

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
