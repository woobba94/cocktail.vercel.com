import type { NextPage } from 'next';
import ResultBox from 'src/components/ResultBox';
import SearchBar from 'src/components/SearchBar';
import { useData } from 'src/hooks/useData';

const Home: NextPage = () => {
  const { data, error } = useData('list.php?i=list');

  return (
    <>
      <SearchBar />
      <div>INDEX</div>
      <ResultBox name={data?.drinks[0].strIngredient1} />
    </>
  );
};

export default Home;
