import styled from 'styled-components';

const Header = () => {
  return (
    <HeaderContainer>
      <div>로고</div>
      <div>즐겨찾기</div>
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
