import { resetStorage } from 'src/utils/utils';
import styled from 'styled-components';

interface Props {
  setSelectedList: (value: string[]) => void;
  selectedList: string[];
}

const TagList = ({ selectedList, setSelectedList }: Props) => {
  const handleOnRemove = (e: any) => {
    let targetIndex = 0;
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
    resetStorage();
  };

  return (
    <Container>
      <Tag>
        {Object.values(selectedList).map((tag: string) => {
          return (
            <button key={tag} onClick={handleOnRemove} value={tag}>
              {tag} [x]
            </button>
          );
        })}
      </Tag>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  overflow: hidden;
  height: 30px;
  margin: 0 10px;
`;

const Tag = styled.div`
  position: absolute;
  display: flex;
  width: 100vw;
  overflow-x: scroll;
  white-space: nowrap;
  button {
    border-radius: 5px;
    height: 30px;
    margin: 0 0.1rem;
    background-color: #ddd;
    border: 2px solid #bbb;
  }
`;

export default TagList;
