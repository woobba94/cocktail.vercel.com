import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useData } from 'src/hooks/useData';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.div`
  margin: 50px 0;
  font-size: 2rem;
  font-weight: 700;
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  img {
    margin: 0 10px;
    width: 40%;
    border-radius: 30px;
  }
`;

const IngredientBox = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;
const Contents = styled.div`
  font-size: 1rem;
  width: 80%;
  margin: 40px 0;
`;

const Detail: NextPage = () => {
  const router = useRouter();
  const id = Object.keys(router.query)[0];
  const pathname = `/lookup.php?i=${id}`;
  const { data, error } = useData(`${pathname}`, '');
  const cocktailData = data?.drinks[0];
  const ingredientList: string[] = [];

  if (cocktailData) {
    let key = '';
    let Volume = '';
    for (let i = 1; i <= 15; i++) {
      key = 'strIngredient' + i.toString();
      Volume = 'strMeasure' + i.toString();
      if (!cocktailData[key]) break;
      const k = cocktailData[Volume] ? cocktailData[Volume] : '적당히';

      ingredientList.push(`${cocktailData[key]} ${k}`);
    }
  }
  console.log(cocktailData);

  return (
    <Container>
      <button type="button" onClick={() => router.back()}>
        Go Back
      </button>
      <Title>{cocktailData?.strDrink}</Title>
      <InnerContainer>
        <img src={cocktailData?.strDrinkThumb}></img>
        <IngredientBox>
          재료
          {ingredientList?.map((val) => {
            return <div key={`ingredient-${val}`}>{val}</div>;
          })}
        </IngredientBox>
      </InnerContainer>
      <Contents>만드는법 : {cocktailData?.strInstructions}</Contents>
    </Container>
  );
};

export default Detail;
