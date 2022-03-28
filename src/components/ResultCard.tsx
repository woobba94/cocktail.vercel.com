import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useData } from 'src/hooks/useData';
import { getLocalStorageArray } from 'src/utils/utils';
import styled from 'styled-components';
import Error from './Error';

interface ResultCardProps {
  id: string;
}

const ResultCard = ({ id }: ResultCardProps) => {
  const pathname = `/lookup.php?i=${id}`;
  const { data, error } = useData(`${pathname}`, '');
  const cocktailData = data?.drinks[0];

  if (error) {
    return <Error />;
  }

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const newFavorites = getLocalStorageArray('favoritesHistory');

    if (newFavorites.includes(id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, []);

  if (data) {
    window.scrollTo(
      0,
      parseFloat(sessionStorage.getItem('scrollHistory') || '0'),
    );
  }

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
    <ItemContainer>
      <ItemTitle>
        {cocktailData?.strDrink}
        <button onClick={handleFavorites}>{isFavorite ? '❤️' : '🤍'}</button>
      </ItemTitle>

      <Link href={`/detail?${data?.drinks[0].idDrink}`}>
        <ItemDetail image={cocktailData?.strDrinkThumb}>
          <ItemIngredient>{cocktailData?.strIngredient1}</ItemIngredient>
          <ItemIngredient>{cocktailData?.strIngredient2}</ItemIngredient>
          <ItemIngredient>{cocktailData?.strIngredient3}</ItemIngredient>
          <ItemIngredient>{cocktailData?.strIngredient4}</ItemIngredient>
          <ItemIngredient>{cocktailData?.strIngredient5}</ItemIngredient>
        </ItemDetail>
      </Link>
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ItemTitle = styled.h4`
  font-style: italic;
  font-weight: 600;
  font-size: 1.2rem;
  margin: 0;

  button {
    margin-left: 10px;
    border: none;
    border-radius: 10%;
    background: #dbdbdb;
  }
`;

const ItemDetail = styled.div<{ image: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 95%;
  max-width: 300px;
  min-width: 250px;
  height: 300px;
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

const ItemIngredient = styled.div`
  background-color: rgba(999, 999, 999, 0.3);
  margin: 1px;
  font-size: 1.1rem;
  font-weight: 500;
`;

export default ResultCard;
