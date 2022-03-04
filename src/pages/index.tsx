import type { NextPage } from 'next';
import { useState } from 'react';
import Item from 'src/components/Item';
import SearchBar from 'src/components/SearchBar';
import { useData } from 'src/hooks/useData';
import { Cocktail } from 'src/types/Cocktail';

const Home: NextPage = () => {
  const [ingredient, setIngredient] = useState('');
  const setValue = (value: string) => {
    setIngredient(value);
  };

  const { data, error } = useData(`filter.php?i=${ingredient}`, '');
  console.log(data);

  // if (error) return <div>error</div>;
  // if (!data) return <div>loading</div>;

  return (
    <>
      <SearchBar setValue={setValue} />
      <h1>홈</h1>
      {data ? (
        <div>
          {Object.values(data.drinks).map((cocktailData: Cocktail) => {
            return (
              <Item
                key={`${cocktailData.idDrink}`}
                cocktailData={cocktailData}
              />
            );
          })}
        </div>
      ) : (
        <div>Enter the ingredient</div>
      )}
    </>
  );
};

export default Home;
