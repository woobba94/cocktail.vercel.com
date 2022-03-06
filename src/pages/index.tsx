import type { NextPage } from 'next';
import ResultBox from 'src/components/ResultBox';
import { useEffect, useRef, useState } from 'react';
import Item from 'src/components/Item';
import SearchBar from 'src/components/SearchBar';
import TagList from 'src/components/TagList';
import { useData } from 'src/hooks/useData';

const Home: NextPage = () => {
  const [selected, setSelected] = useState<string>('');
  const [selectedList, setSelectedList] = useState<any>([]);
  // const dataList = useRef<any>([]);
  const [result, setResult] = useState<string[]>([]);

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

  // console.log('뿌려줄 데이터 -> ');
  // console.log(result);
  const index = 0;
  return (
    <div>
      <SearchBar setSelected={setSelected} />
      <TagList
        selected={selected}
        selectedList={selectedList}
        setSelectedList={setSelectedList}
      />
      <ResultBox
        index={index}
        selectedList={selectedList}
        result={result}
        setResult={setResult}
      />
      <h1>홈</h1>
    </div>
  );
};

export default Home;
