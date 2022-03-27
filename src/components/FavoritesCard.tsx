import Link from 'next/link';
import { useData } from 'src/hooks/useData';
import styled from 'styled-components';

interface FavoritesCardProps {
  id: string;
}

const FavoritesCard = ({ id }: FavoritesCardProps) => {
  const pathname = `/lookup.php?i=${id}`;
  const { data, error } = useData(`${pathname}`, '');
  const cocktailData = data?.drinks[0];
  return (
    <Container>
      <div>{cocktailData?.strDrink}</div>
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
