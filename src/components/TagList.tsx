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

export default TagList;
