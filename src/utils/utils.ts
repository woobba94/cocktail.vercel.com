export const resetStorage = () => {
  sessionStorage.setItem('countHistory', '0');
  sessionStorage.setItem('scrollHistory', '0');
};

export const getNewArray = (baseArray: string[], value: string) => {
  const newArr = [...baseArray];
  newArr.push(value);
  return newArr;
};
