import type { NextPage } from 'next';
import { useRef, useState } from 'react';
import ResultBox from 'src/components/ResultBox';
import SearchBar from 'src/components/SearchBar';
import { useData } from 'src/hooks/useData';

const Home: NextPage = () => {
  const [ingredient, setIngredient] = useState('');
  const setValue = (value: string) => {
    setIngredient(value);
  };

  const { data, error } = useData(`filter.php?i=${ingredient}`);
  if (data) console.log(Object.values(data)[0]);

  return (
    <>
      <SearchBar setValue={setValue} />
      <div>INDEX</div>
      {data ? <ResultBox data={Object.values(data)[0]} /> : <></>}
    </>
  );
};

export default Home;
