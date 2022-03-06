import { useEffect, useRef, useState } from 'react';

interface Props {
  setSelected: (value: string) => void;
}

const SearchBar = ({ setSelected }: Props) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setIsSubmitted(false);
  }, [isSubmitted]);

  const handleOnChange = (e: any) => {
    setInputValue(e.target.value);
  };
  const handleOnAdd = () => {
    // 다중 재료 추가
    if (inputValue !== '') {
      setSelected(inputValue);
      // 추가했으면 입력창 비우기
      setInputValue('');
    }
  };

  const handleOnSubmit = () => {
    // 조회
    setIsSubmitted(true);
  };

  return (
    <div>
      <input
        placeholder="재료 입력"
        onChange={handleOnChange}
        value={inputValue}
      />
      <button onClick={handleOnAdd}>추가</button>
      <button onClick={handleOnSubmit}>제출</button>
    </div>
  );
};

export default SearchBar;
