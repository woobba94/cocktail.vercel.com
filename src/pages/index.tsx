import type { NextPage } from 'next';
import ResultContainer from 'src/components/ResultContainer';
import { useEffect, useState } from 'react';
import TagList from 'src/components/TagList';
import { API_ENDPOINT } from 'src/constants';
import { resetStorage } from 'src/utils/utils';
import SearchContainer from 'src/components/SearchContainer';

const Home: NextPage = () => {
  const [selectedList, setSelectedList] = useState<string[]>([]);
  const [urlArray, setUrlArray] = useState<string[]>([]);

  useEffect(() => {
    resetStorage();
  }, [selectedList]);

  useEffect(() => {
    setSelectedList(
      JSON.parse(sessionStorage.getItem('selectedHistory') || '{}'),
    );

    const setScrollHistory = () => {
      if (location.pathname === '/') {
        sessionStorage.setItem(
          'scrollHistory',
          JSON.stringify(window.pageYOffset),
        );
      }
    };

    // 스크롤 이벤트
    window.addEventListener('scroll', setScrollHistory);
    return () => {
      window.removeEventListener('scroll', setScrollHistory);
    };
  }, []);

  useEffect(() => {
    sessionStorage.setItem('selectedHistory', JSON.stringify(selectedList));

    const newArr = [];
    for (let i = 0; i < selectedList.length; i++) {
      newArr.push(`${API_ENDPOINT}filter.php?i=${selectedList[i]}`);
    }
    setUrlArray(newArr);
  }, [selectedList]);

  return (
    <>
      <SearchContainer
        selectedList={selectedList}
        setSelectedList={setSelectedList}
      />
      <TagList selectedList={selectedList} setSelectedList={setSelectedList} />
      {urlArray ? <ResultContainer urlArray={urlArray} /> : null}
    </>
  );
};

export default Home;
