import Link from 'next/link';
import styled from 'styled-components';
const Header = () => {
  const handleOnStar = () => {
    console.log('즐겨찾기 클릭');
  };

  return (
    <HeaderContainer>
      <div>로고</div>
      <Link href={`/favorites`}>즐겨찾기</Link>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: tomato;
  height: 50px;
`;

export default Header;
