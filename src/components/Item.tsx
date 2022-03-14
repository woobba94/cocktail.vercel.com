import Link from 'next/link';
import { Cocktail } from 'src/types/Cocktail';

interface CocktailProps {
  cocktailData: Cocktail;
}

const Item = ({ cocktailData }: CocktailProps) => {
  return (
    <Link href={`/detail?${cocktailData?.idDrink}`}>
      <div>
        <div>{cocktailData?.idDrink}</div>
        <div>{cocktailData?.strDrink}</div>
        <img src={cocktailData?.strDrinkThumb}></img>
      </div>
    </Link>
    // <>
    //   <div>{cocktailData?.idDrink}</div>
    //   <div>{cocktailData?.strDrink}</div>
    //   <img src={cocktailData?.strDrinkThumb}></img>
    // </>
  );
};

export default Item;
