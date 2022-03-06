import { useEffect, useState } from 'react';
// import styled from '@emotion/styled';
interface Props {
  selected: string;
  setSelectedList: (value: any) => void;
  selectedList: any;
}

const TagList = ({ selected, selectedList, setSelectedList }: Props) => {
  // selected값이 들어올때 태그 하나 더 푸시
  useEffect(() => {
    // 새로운 값만 푸시
    if (selectedList.includes(selected) == false && selected !== '') {
      const newArr = [...selectedList];
      newArr.push(selected);
      setSelectedList(newArr);
      console.log(selectedList);
    }
  }, [selected]);

  const handleOnRemove = (e: any) => {
    let targetIndex = 0;
    // 기본적으로 배열을 할당하는 것은 참조를 복사. React는 배열에 대한 참조가 변경되지 않기 때문에 그것을 변경으로 보지 않음.
    // 스프레드 연산자 [...] 사용해야함.
    // const tempArr = tagArr;
    const tempArr = [...selectedList];
    for (let i = 0; i < tempArr.length; i++) {
      if (tempArr[i] === e.target.value) {
        targetIndex = i;
        break;
      }
    }
    // targetIndex의 원소를 삭제
    tempArr.splice(targetIndex, 1);
    setSelectedList(tempArr);
  };

  return (
    <div>
      {selectedList ? (
        <div>
          {selectedList.map((tag: string) => {
            return (
              <div key={tag}>
                <button onClick={handleOnRemove} value={tag}>
                  {tag} [x]
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div>Enter the ingredient</div>
      )}
    </div>
  );
};

// const tagWrap = styled.div``;

export default TagList;
