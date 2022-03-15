import { useEffect, useState } from 'react';
import AutoComplete from './AutoComplete';

interface SearchBarProps {
  selectedList: string[];
  setSelectedList: (value: string[]) => void;
  setIsSubmitted: (value: boolean) => void;
}

const SearchBar = ({
  selectedList,
  setSelectedList,
  setIsSubmitted,
}: SearchBarProps) => {
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    setIsSubmitted(false);
  }, [selectedList]);

  const handleOnChange = (e: any) => {
    setInputValue(e.target.value);
  };
  const handleOnAdd = () => {
    if (inputValue !== '' && selectedList.includes(inputValue) == false) {
      const newArr = [...selectedList];
      newArr.push(inputValue);
      setSelectedList(newArr);
    }
    setInputValue('');
  };

  const handleOnSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <div>
      <input
        placeholder="재료 입력"
        onChange={handleOnChange}
        value={inputValue}
      />
      <AutoComplete inputValue={inputValue} />
      <button onClick={handleOnAdd}>추가</button>
      <button onClick={handleOnSubmit}>제출</button>
    </div>
  );
};

export default SearchBar;
