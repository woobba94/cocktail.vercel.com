import type { NextPage } from 'next';
import ResultBox from 'src/components/ResultBox';
import { useEffect, useRef, useState } from 'react';
import Item from 'src/components/Item';
import SearchBar from 'src/components/SearchBar';
import TagList from 'src/components/TagList';
import { useData } from 'src/hooks/useData';

const Home: NextPage = () => {
  const [selectedList, setSelectedList] = useState<any>([]);
  const [result, setResult] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    console.log(selectedList);
  }, [selectedList]);

  // const beforeItem = useRef<any>();

  // const { data: item, error: itemError } = useData(
  //   `filter.php?i=${selected}`,
  //   '',
  // );

  // if (item !== undefined && item !== '' && beforeItem.current !== item) {
  //   result.push(item);
  //   beforeItem.current = item;
  //   console.log('푸시');
  // }

  const index = 0;
  return (
    <div>
      <SearchBar
        selectedList={selectedList}
        setSelectedList={setSelectedList}
        setIsSubmitted={setIsSubmitted}
      />
      <TagList selectedList={selectedList} setSelectedList={setSelectedList} />
      {isSubmitted ? (
        <ResultBox
          index={index}
          selectedList={selectedList}
          result={result}
          setResult={setResult}
        />
      ) : (
        <></>
      )}

      <h1>홈</h1>
    </div>
  );
};

export default Home;
