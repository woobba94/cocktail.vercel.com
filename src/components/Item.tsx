import Link from 'next/link';
import { useData } from 'src/hooks/useData';
import { Cocktail } from 'src/types/Cocktail';
import styled from 'styled-components';

interface CocktailProps {
  id: string;
}

const Item = ({ id }: CocktailProps) => {
  const pathname = `/lookup.php?i=${id}`;
  const { data, error } = useData(`${pathname}`, '');
  const cocktailData = data?.drinks[0];

  return (
    <Link href={`/detail?${data?.drinks[0].idDrink}`}>
      <ItemContainer>
        <ItemTitle>{cocktailData?.strDrink}</ItemTitle>
        <ItemDetail image={cocktailData?.strDrinkThumb}>
          <ItemIngredient>{cocktailData?.strIngredient1}</ItemIngredient>
          <ItemIngredient>{cocktailData?.strIngredient2}</ItemIngredient>
          <ItemIngredient>{cocktailData?.strIngredient3}</ItemIngredient>
          <ItemIngredient>{cocktailData?.strIngredient4}</ItemIngredient>
          <ItemIngredient>{cocktailData?.strIngredient5}</ItemIngredient>
        </ItemDetail>
      </ItemContainer>
    </Link>
  );
};

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const ItemTitle = styled.h4`
  font-style: italic;
  font-weight: 600;
  font-size: 1.2rem;
`;

const ItemDetail = styled.div<{ image: string }>`
  display: flex;
  flex-direction: column;
  position: relative;
  width: calc(100% / 3);
  height: 100%;
  margin: 50px 10px;
  padding: 30%;
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
  display: block;
  position: relative;
  background-color: rgba(999, 999, 999, 0.3);
  margin: 1px;
  font-size: 1.1rem;
  font-weight: 500;
`;

export default Item;
