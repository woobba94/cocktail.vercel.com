import Link from 'next/link';
import { useState } from 'react';
import { useData } from 'src/hooks/useData';
import { getLocalStorageArray } from 'src/utils/utils';
import styled from 'styled-components';
import Error from './Error';

interface FavoritesCardProps {
  id: string;
}

const FavoritesCard = ({ id }: FavoritesCardProps) => {
  const pathname = `/lookup.php?i=${id}`;
  const { data, error } = useData(`${pathname}`, '');

  if (error) {
    return <Error />;
  }

  const cocktailData = data?.drinks[0];

  const [isFavorite, setIsFavorite] = useState(true);

  const handleFavorites = () => {
    const newFavorites = getLocalStorageArray('favoritesHistory');

    if (newFavorites.includes(id)) {
      setIsFavorite(false);
      newFavorites.filter((element) => element !== id);
      localStorage.setItem(
        'favoritesHistory',
        JSON.stringify(newFavorites.filter((element) => element !== id)),
      );
    } else {
      setIsFavorite(true);
      newFavorites.push(id);
      localStorage.setItem('favoritesHistory', JSON.stringify(newFavorites));
    }
  };

  return (
    <Container>
      <div>
        {cocktailData?.strDrink}
        <button onClick={handleFavorites}>{isFavorite ? '❤️' : '🤍'}</button>
      </div>
      <Link href={`/detail?${id}`}>
        <ItemImage image={cocktailData?.strDrinkThumb}></ItemImage>
      </Link>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  button {
    margin-left: 10px;
  }
`;

const ItemImage = styled.div<{ image: string }>`
  display: flex;
  flex-direction: column;
  width: 95%;
  max-width: 300px;
  min-width: 250px;
  height: 250px;
  margin-top: 20px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  transition: all 0.3s;
  border-radius: 20px;
  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

export default FavoritesCard;
