import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useData } from 'src/hooks/useData';
import { Cocktail } from 'src/types/Cocktail';

interface CocktailProps {
  cocktailData: Cocktail;
}

const Detail: NextPage = () => {
  const router = useRouter();
  const id = Object.keys(router.query)[0];
  const pathname = `/lookup.php?i=${id}`;
  const { data, error } = useData(`${pathname}`, '');

  const cocktailData = data?.drinks[0];
  console.log(cocktailData);
  // const { idDrink, strDrink, strIngredient1, strIngredient2 } = cocktailData ? cocktailData : { '','','',''};

  // const { data, error } = useData(pathname, id);
  return (
    <div>
      <h1>디테일</h1>
      <div>{cocktailData?.idDrink}</div>
      <div>{cocktailData?.strDrink}</div>
      <br></br>
      <div>{cocktailData?.strIngredient1}</div>
      <div>{cocktailData?.strIngredient2}</div>
      <img src={cocktailData?.strDrinkThumb}></img>
    </div>
  );
};

export default Detail;
