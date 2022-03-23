import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import ResultCard from './ResultCard';

interface InfiniteScrollContainerProps {
  initialData: [string, number][];
}

const InfiniteScrollContainer = ({
  initialData,
}: InfiniteScrollContainerProps) => {
  const [itemList, setItemList] = useState<[string, number][]>([]);
  const [countItem, setCountItem] = useState(12);
  const [ref, inView] = useInView();
  useEffect(() => {
    setCountItem(parseInt(sessionStorage.getItem('countHistory') || '12'));
  }, []);

  useEffect(() => {
    setItemList(initialData.slice(0, countItem));
  }, [initialData, countItem]);

  useEffect(() => {
    if (inView) {
      setCountItem(countItem + 4);
      sessionStorage.setItem('countHistory', JSON.stringify(countItem));
    }
  }, [inView]);

  return (
    <>
      {itemList.map((key, index: number) => {
        return index === itemList.length - 1 ? (
          <div key={`item-${key[0]}`} ref={ref}>
            <ResultCard key={`item-${key[0]}`} id={key[0]} />
          </div>
        ) : (
          <ResultCard key={`item-${key[0]}`} id={key[0]} />
        );
      })}
    </>
  );
};

export default InfiniteScrollContainer;
