import useSWR from 'swr';
import { arrayFetcher } from 'src/utils/fetcher';
import { Cocktail } from 'src/types/Cocktail';
import InfiniteScrollContainer from './InfiniteScrollContainer';
import { ResponsiveGrid } from 'src/styles/ResponsiveGrid';
import Loading from './Loading';
import Error from './Error';

interface ResultContainerProps {
  urlArray: string[];
}

const ResultContainer = ({ urlArray }: ResultContainerProps) => {
  const { data, error } = useSWR([urlArray], arrayFetcher);

  if (!data) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

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
  }
  return (
    <ResponsiveGrid>
      {mapToArray ? <InfiniteScrollContainer initialData={mapToArray} /> : null}
    </ResponsiveGrid>
  );
};

export default ResultContainer;
