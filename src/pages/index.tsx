import type { NextPage } from 'next';
import { useState } from 'react';
import Item from 'src/components/Item';
import SearchBar from 'src/components/SearchBar';
import { useData } from 'src/hooks/useData';

const Home: NextPage = () => {
  const [ingredient, setIngredient] = useState('');
  const setValue = (value: string) => {
    setIngredient(value);
  };

  const { data, error } = useData(`filter.php?i=${ingredient}`);

  // if (error) return <div>error</div>;
  // if (!data) return <div>loading</div>;

  return (
    <>
      <SearchBar setValue={setValue} />
      <div>INDEX</div>
      {data ? (
        <div>
          {Object.entries(data.drinks).map((it) => {
            return <Item key={it[0]} value={it[1]} />;
          })}
        </div>
      ) : (
        <div>Enter the ingredient</div>
      )}
    </>
  );
};

export default Home;
