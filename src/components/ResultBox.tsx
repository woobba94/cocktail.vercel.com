import useSWR from 'swr';
import Item from 'src/components/Item';
import { arrayFetcher } from 'src/utils/fetcher';

interface ResultProps {
  urlArray: string[];
}

const ResultBox = ({ urlArray }: ResultProps) => {
  const { data, error } = useSWR([urlArray], arrayFetcher);

  if (data && data !== []) {
    console.log(data); // 데이터 가공
  }

  return null;
};

export default ResultBox;
