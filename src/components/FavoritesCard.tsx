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
    <>
      <div>{cocktailData?.strDrink}</div>
      <Link href={`/detail?${id}`}>
        <div>
          <ItemDetail image={cocktailData?.strDrinkThumb}></ItemDetail>
        </div>
      </Link>
    </>
  );
};

const ItemDetail = styled.div<{ image: string }>`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  max-height: 300px;
  margin: 10px 10px 50px 10px;
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

export default FavoritesCard;
