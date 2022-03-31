# 투칵(Today's Cocktail)

💡 TypeScript와 Next프레임웍, CI/CD, Jest라이브러리를 이용한 단위테스트 등 기존 지식을 베이스로 여러 기술스택을 확장시키기 위해 구현한 CocktailDB API를 활용하여 검색한 재료로 만들 수 있는 칵테일을 추천해주는 서비스입니다.

## 0. Release.

준비중.
<!-- [Link](https://woobba.site/) -->

## 1. Tech stack.

TypeScript | React.js | Next.js | ESLint | Jest | Axios

## 2. Details.

- 추후 실 서비스를 위해 SEO에 유리한 CNA로 개발환경을 구축하고 Vercel로 배포
- 기존 SPA의 단점인 긴 초기렌더링 시간과 SEO가 원활히 되지 않는점을 고려하여 사전 렌더링 및 SSR을 제공하는 Next.js프레임워크 사용
- 일관성 있는 프로젝트 관리를 위한 airbnb eslint 설정
- 데이터를 로드 시 상태 관리를 위해 axios, swr 라이브러리를 활용
- GitHub Actions를 활용한 CI/CD를 구축해 개발을 자동화하고 Slack과 연동해 효율적인 협업 진행
- 사용자 경험 향상을 위해 데이터 로딩중, 로딩 실패시 렌더링되는 컴포넌트를 구현 & 검색시 결과 데이터가 다량 로드될 때 무한 스크롤 구현 & 검색기능 자동완성과 키보드컨트롤 구현
- Agile한 협업을 위해 Jest로 TDD를 진행하여 단위 테스트 구축
- API 중복 호출 및 임시 저장 데이터로 인한 성능 저하를 최소화하기 위해 페어프로그래밍을 통한 교집합 알고리즘 설계
