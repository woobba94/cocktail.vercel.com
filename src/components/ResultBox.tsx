import Item from './Item';
import { useRef } from 'react';
import { Cocktail } from '../types/Cocktail';

const ResultBox = (data: []) => {
  console.log(data);
  if (data) {
    const myData = useRef({});
    myData.current = data;
    console.log(myData.current);
  }

  return (
    <div>
      {data.map((contailData: Cocktail) => {
        console.log(contailData);
        return <Item key={contailData.idDrink} />;
      })}
    </div>
  );
};
export default ResultBox;
