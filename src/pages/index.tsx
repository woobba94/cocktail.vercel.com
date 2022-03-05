import type { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import Item from 'src/components/Item';
import SearchBar from 'src/components/SearchBar';
import { useData } from 'src/hooks/useData';
import { Cocktail } from 'src/types/Cocktail';

const Home: NextPage = () => {
  // const [selectedItems, setSelectedItems] = useState<string[] | []>([
  //   '',
  //   '',
  //   '',
  // ]);
  const selectedItems = useRef<any>(['', '', '']);
  const itemList = useRef<any>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  selectedItems.current[1] = 'lemon';

  useEffect(() => {
    console.log(selectedItems.current);

    // itemList.current = [];
  }, [isSubmitted]);
  // for (let i = 0; i < tagLength.current; i++) {
  //   console.log(i);
  //   const { data: item, error: itemsError } = useData(
  //     `filter.php?i=${selectedItems[i]}`,
  //     '',
  //   );
  //   console.log(item);
  // }
  if (selectedItems.current[0] !== '') {
    console.log(selectedItems.current[0]);

    const { data: item, error: itemsError } = useData(
      `filter.php?i=${selectedItems.current[0]}`,
      '',
    );
    // itemList.current.push(item);
    // console.log(itemList.current);
  }

  // if (selectedItems[1] !== '') {
  //   const { data: item1, error: itemsError1 } = useData(
  //     `filter.php?i=${selectedItems[1]}`,
  //     '',
  //   );
  //   itemList.current.push(item1);
  // }

  // if (selectedItems[2] !== '') {
  //   const { data: item2, error: itemsError2 } = useData(
  //     `filter.php?i=${selectedItems[2]}`,
  //     '',
  //   );
  //   itemList.current.push(item2);
  //   console.log(itemList.current);
  // }
  // // if (error) return <div>error</div>;
  // // if (!data) return <div>loading</div>;
  // // useEffect(() => {
  // //   console.log(selectedItems);
  // // }, [selectedItems]);

  return (
    <>
      <SearchBar
        selectedItems={selectedItems.current}
        // setSelectedItems={setSelectedItems}
        setIsSubmitted={setIsSubmitted}
      />
      <h1>홈</h1>
      {itemList ? (
        <div>
          {/* {Object.values(items.drinks).map((cocktailData: Cocktail) => {
            return (
              <Item
                key={`${cocktailData.idDrink}`}
                cocktailData={cocktailData}
              />
            );
          })} */}
        </div>
      ) : (
        <div>Enter the ingredient</div>
      )}
    </>
  );
};

export default Home;
