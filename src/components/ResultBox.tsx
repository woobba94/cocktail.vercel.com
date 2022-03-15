import useSWR from 'swr';
import Item from 'src/components/Item';
import { arrayFetcher } from 'src/utils/fetcher';
import { Cocktail } from 'src/types/Cocktail';
import styled from 'styled-components';

interface ResultProps {
  urlArray: string[];
}

const ResultBox = ({ urlArray }: ResultProps) => {
  const { data, error } = useSWR([urlArray], arrayFetcher);
  const result: Cocktail[][] = [];

  const realResult = new Map<string, number>();

  let mapToArray: [string, number][] = [];

  if (data && data !== []) {
    data.map((arr: { drinks: [] }) => {
      result.push(arr.drinks);
    });

    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < result[i].length; j++) {
        // 중복아니라면
        if (!realResult.has(result[i][j].idDrink)) {
          realResult.set(result[i][j].idDrink, 1);
        } else {
          let count = realResult.get(result[i][j].idDrink);
          if (count) {
            count += 1;
            realResult.set(result[i][j].idDrink, count);
          }
        }
      }
    }
    mapToArray = [...realResult];
    mapToArray.sort((a, b) => b[1] - a[1]);
    console.log(mapToArray);
  }

  return (
    <ResultContainer>
      {mapToArray.map((key) => {
        return <Item key={`item-${key[0]}`} id={key[0]} />;
      })}
    </ResultContainer>
  );
};

const ResultContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  position: relative;
  width: 100%;
  height: 100%;
`;

export default ResultBox;
