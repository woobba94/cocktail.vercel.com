export const resetStorage = () => {
  sessionStorage.setItem('countHistory', '0');
  sessionStorage.setItem('scrollHistory', '0');
};

export const getNewArray = (baseArray: string[], value: string) => {
  const newArr = [...baseArray];
  newArr.push(value);
  return newArr;
};

export const getLocalStorageArray = (key: string) => {
  const object = JSON.parse(localStorage.getItem(key) || '[]');
  const newArr: string[] = [];
  for (const item of object) {
    newArr.push(item);
  }
  return newArr;
};
