interface Props {
  setValue: (value: string) => void;
}

const SearchBar = ({ setValue }: Props) => {
  const handleOnChange = (e: any) => {
    setValue(e.target.value);
  };
  const handleOnClick = () => {
    // 다중 재료 추가
  };

  return (
    <div>
      <input placeholder="재료 입력" onChange={handleOnChange} />
      <button onClick={handleOnClick}>제출</button>
    </div>
  );
};

export default SearchBar;
