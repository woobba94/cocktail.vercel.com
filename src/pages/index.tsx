import type { NextPage } from 'next';
import ResultContainer from 'src/components/ResultContainer';
import { useEffect, useRef, useState } from 'react';
import { API_ENDPOINT } from 'src/constants';
import SearchContainer from 'src/components/SearchContainer';
import styled from 'styled-components';

// selectedList 전역 사용 준비
import { SelectedContext } from './../context/SelectedContext';

const Home: NextPage = () => {
  const [selectedList, setSelectedList] = useState<string[]>([]);
  const [urlArray, setUrlArray] = useState<string[]>([]);
  const [isToggleOn, setIsToggleOn] = useState<boolean>(false);
  const scrollValue = useRef(0);

  useEffect(() => {
    setSelectedList(
      JSON.parse(sessionStorage.getItem('selectedHistory') || '{}'),
    );

    if (parseFloat(sessionStorage.getItem('scrollHistory') || '0') === 0)
      setIsToggleOn(true);

    const setScrollHistory = () => {
      if (location.pathname === '/') {
        sessionStorage.setItem(
          'scrollHistory',
          JSON.stringify(window.pageYOffset),
        );
      }
    };
    const checkToggle = () => {
      setIsToggleOn(scrollValue.current < window.scrollY ? false : true);

      scrollValue.current = window.scrollY;
    };

    const handleScroll = () => {
      setScrollHistory();
      checkToggle();
    };

    // 스크롤 이벤트
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
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
      <TopContainer isToggleOn={isToggleOn}>
        <SearchContainer
          selectedList={selectedList}
          setSelectedList={setSelectedList}
        />
      </TopContainer>
      <BottomContainer>
        {urlArray ? (
          <ResultContainer urlArray={urlArray} selectedList={selectedList} />
        ) : null}
      </BottomContainer>
    </>
  );
};

const TopContainer = styled.div<{ isToggleOn: boolean }>`
  position: fixed;
  top: ${(props) => (props.isToggleOn ? '50px' : '-110px')};
  z-index: 1;
  transition: 0.3s all;
`;
const BottomContainer = styled.div`
  margin-top: 200px;
`;

export default Home;
