import { Cocktail } from 'src/types/Cocktail';

const Item = (value: any) => {
  return <div>{value.value.strDrink}</div>;
};

export default Item;
