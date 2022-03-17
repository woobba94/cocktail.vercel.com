import { useEffect, useState } from 'react';
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
      const newArr: string[] = [];

      ingredients.forEach((ingredient: string) => {
        if (ingredient.toLowerCase().indexOf(inputValue.toLowerCase()) > -1) {
          newArr.push(ingredient);
        }
      });
      setSearchedIngredients(newArr.sort());
    }
  }, [inputValue]);

  return (
    <div>
      {searchedIngredients.map((ingredient: string) => {
        return <div key={ingredient}>{ingredient}</div>;
      })}
    </div>
  );
};

export default AutoComplete;
