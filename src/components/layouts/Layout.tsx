import React from 'react';
import styled from 'styled-components';
import Header from './Header';

// React.FC를 사용할 때는 props 의 타입을 Generics 로 넣어서 사용
// props 에 기본적으로 children 이 들어가있다
// 컴포넌트의 defaultProps, propTypes, contextTypes 를 설정 할 때 자동완성
export const Layout: React.FC = ({ children }) => {
  return (
    <Container>
      <Header />
      <Content>{children}</Content>
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  display: block;
`;

const Content = styled.article`
  margin-top: 50px;
`;
