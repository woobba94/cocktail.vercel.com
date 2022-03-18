import { useEffect, useState } from 'react';
import styled from 'styled-components';
interface AutoCompleteProps {
  inputValue: string;
  ingredients: string[];
}

const AutoComplete = ({ inputValue, ingredients }: AutoCompleteProps) => {
  const [searchedIngredients, setSearchedIngredients] = useState<any>([]);
  useEffect(() => {
    if (!inputValue) {
      setSearchedIngredients([]);
    } else if (ingredients) {
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
            `<span style="background-color: tomato">${inputValue}</span>`,
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
      {searchedIngredients.map((ingredient: string) => {
        return (
          <div
            key={ingredient}
            dangerouslySetInnerHTML={{ __html: ingredient }}
          ></div>
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
  max-height: 200px;
  overflow-y: scroll;
  background-color: royalblue;
  top: 50px;
`;

export default AutoComplete;
