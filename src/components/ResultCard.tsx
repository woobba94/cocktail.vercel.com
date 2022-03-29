import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useData } from 'src/hooks/useData';
import { getLocalStorageArray } from 'src/utils/utils';
import styled from 'styled-components';
import Error from './Error';

interface ResultCardProps {
  id: string;
  selectedList: string[];
}

const ResultCard = ({ id, selectedList }: ResultCardProps) => {
  const pathname = `/lookup.php?i=${id}`;
  const { data, error } = useData(`${pathname}`, '');
  const cocktailData = data?.drinks[0];
  const INGREDIENT_SIZE = 5;
  let ingredientList: string[] = [];
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

  const isOverlab = (arr: string[], str: string) => {
    if (arr.includes(str)) return true;
    return false;
  };

  if (cocktailData) {
    let key = '';
    for (let i = 1; i <= 15; i++) {
      key = 'strIngredient' + i.toString();
      if (!cocktailData[key]) break;

      const temp: string =
        cocktailData[key][0].toUpperCase() +
        cocktailData[key].slice(1).toLowerCase();

      if (selectedList.includes(temp)) {
        const result = `<b>${temp}</b>`;
        if (!isOverlab(ingredientList, result)) {
          ingredientList.unshift(result);
        }
      } else {
        if (!isOverlab(ingredientList, temp)) {
          ingredientList.push(temp);
        }
      }
    }
    ingredientList = ingredientList.splice(0, INGREDIENT_SIZE);
  }

  return (
    <ItemContainer>
      <ItemTitle>
        {cocktailData?.strDrink}
        <button onClick={handleFavorites}>{isFavorite ? '❤️' : '🤍'}</button>
      </ItemTitle>

      <Link href={`/detail?${data?.drinks[0].idDrink}`}>
        <CocktailImage src={cocktailData?.strDrinkThumb} alt="칵테일 이미지" />
      </Link>
      {ingredientList?.map((val: string) => {
        return (
          <ItemIngredient
            key={`ingredient${val}`}
            dangerouslySetInnerHTML={{ __html: val }}
          ></ItemIngredient>
        );
      })}
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

const CocktailImage = styled.img`
  width: 300px;
  height: 300px;
  background-color: #c8c8c8;
  margin-top: 20px;
  transition: all 0.3s;
  border-radius: 20px;
  &:hover {
    transform: scale(1.02);
    cursor: pointer;
  }
`;

const ItemIngredient = styled.div`
  background-color: rgba(999, 999, 999, 0.3);
  margin: 1px;
  font-size: 1.1rem;
  font-weight: 500;
  b {
    color: #b9001f;
  }
`;

export default ResultCard;
