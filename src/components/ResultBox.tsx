import { useEffect } from 'react';
import { useData } from 'src/hooks/useData';
import { Cocktail } from 'src/types/Cocktail';
import Item from './Item';

interface ResultProps {
  index: number;
  setResult: (value: [] | string[]) => void;
  result: string[];
  selectedList: string[];
}

const ResultBox = ({ index, selectedList, setResult, result }: ResultProps) => {
  const { data, error } = useData(`filter.php?i=${selectedList[index]}`, '');
  useEffect(() => {
    if (data) {
      const newArr: string[] = [...result];
      newArr.push(data.drinks); // 바뀔 부분
      setResult(newArr);
    }
  }, [data]);

  return (
    <div>
      {data ? (
        <div>
          {Object.values(data.drinks).map((cocktailData: any | Cocktail) => {
            return (
              <Item
                key={`${cocktailData.idDrink}`}
                cocktailData={cocktailData}
              />
            );
          })}
        </div>
      ) : (
        <div>재료를 추가해주세요</div>
      )}
    </div>
  );
};

export default ResultBox;
