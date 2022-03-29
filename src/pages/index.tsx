import type { NextPage } from 'next';
import ResultContainer from 'src/components/ResultContainer';
import { useEffect, useState } from 'react';
import { API_ENDPOINT } from 'src/constants';
import SearchContainer from 'src/components/SearchContainer';
import Header from 'src/components/Header';
import styled from 'styled-components';

const Home: NextPage = () => {
  const [selectedList, setSelectedList] = useState<string[]>([]);
  const [urlArray, setUrlArray] = useState<string[]>([]);

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
      <TopContainer>
        <Header />
        <SearchContainer
          selectedList={selectedList}
          setSelectedList={setSelectedList}
        />
      </TopContainer>
      <BottomContainer>
        {urlArray ? <ResultContainer urlArray={urlArray} /> : null}
      </BottomContainer>
    </>
  );
};

const TopContainer = styled.div`
  position: fixed;
  top: 0;
  z-index: 2;
`;
const BottomContainer = styled.div`
  margin-top: 200px;
`;

export default Home;
