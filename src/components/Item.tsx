import Link from 'next/link';
import { useData } from 'src/hooks/useData';
import { Cocktail } from 'src/types/Cocktail';

interface CocktailProps {
  id: string;
}

const Item = ({ id }: CocktailProps) => {
  const pathname = `/lookup.php?i=${id}`;
  const { data, error } = useData(`${pathname}`, '');
  if (data) {
    console.log(data.drinks[0].idDrink);
  }

  return (
    <Link href={`/detail?${data?.drinks[0].idDrink}`}>
      <div>
        <div>{data?.drinks[0].idDrink}</div>
        <div>{data?.drinks[0].strDrink}</div>
        <img src={data?.drinks[0].strDrinkThumb}></img>
      </div>
    </Link>
  );
};

export default Item;
