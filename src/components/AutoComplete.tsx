import { useEffect, useRef, useState } from 'react';
import { useData } from 'src/hooks/useData';
interface AutoCompleteProps {
  inputValue: string;
}

const AutoComplete = ({ inputValue }: AutoCompleteProps) => {
  const { data, error } = useData('list.php?i=list', '');
  const [ingredients, setIngredients] = useState<any>([]);

  useEffect(() => {
    ingredients?.map((ingredient: string) => {
      console.log(ingredient);
    });
  }, [ingredients]);

  useEffect(() => {
    if (data) {
      const newArr: string[] = [];
      Object.values(data.drinks).forEach((ingredient: any) => {
        if (
          ingredient.strIngredient1
            .toLowerCase()
            .indexOf(inputValue.toLowerCase()) > -1
        ) {
          newArr.push(ingredient.strIngredient1);
        }
      });
      setIngredients(newArr);
    }
  }, [inputValue]);

  return (
    <div>
      {ingredients.map((ingredient: string) => {
        return <div key={ingredient}>{ingredient}</div>;
      })}
    </div>
  );
};

export default AutoComplete;
