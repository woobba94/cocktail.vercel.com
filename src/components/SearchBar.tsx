import { useRef, useState } from 'react';

interface Props {
  // setSelectedItems: (value: [] | string[]) => void;
  selectedItems: string[];
  setIsSubmitted: (value: boolean) => void;
}

const SearchBar = ({ selectedItems, setIsSubmitted }: Props) => {
  const [inputValue, setInputValue] = useState('');
  const count = useRef(0);

  const handleOnChange = (e: any) => {
    setInputValue(e.target.value);
  };
  const handleOnClick = () => {
    // 다중 재료 추가
    if (inputValue !== '' && count.current < 3) {
      const newArr: string[] = [...selectedItems];
      newArr[count.current] = inputValue;
      selectedItems = newArr;
      // setSelectedItems(newArr);
      count.current += 1;
      console.log(selectedItems);
    }
  };

  const handleOnSubmit = () => {
    // 조회
    setIsSubmitted(true);
  };

  return (
    <div>
      <input placeholder="재료 입력" onChange={handleOnChange} />
      <button onClick={handleOnClick}>추가</button>
      <button onClick={handleOnSubmit}>제출</button>
    </div>
  );
};

export default SearchBar;
