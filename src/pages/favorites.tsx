import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import FavoritesCard from 'src/components/FavoritesCard';
import { ResponsiveGrid } from 'src/styles/ResponsiveGrid';
import styled from 'styled-components';

const Favorites: NextPage = () => {
  const router = useRouter();
  const [favoritesList, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const arr = JSON.parse(localStorage.getItem('favoritesHistory') || '[]');
    setFavorites(arr);
  }, []);

  return (
    <>
      <FavoritesContainer>
        <button
          className="btn-goback"
          type="button"
          onClick={() => router.back()}
        >
          Go Back
        </button>
        <ResponsiveGrid>
          {favoritesList.map((item) => {
            return <FavoritesCard key={item} id={item} />;
          })}
        </ResponsiveGrid>
      </FavoritesContainer>
    </>
  );
};

const FavoritesContainer = styled.div`
  display: flex;
  flex-direction: column;
  .btn-goback {
    position: absolute;
    width: 80px;
    top: 10px;
    left: 10px;
    margin-top: 10px;
    border: none;
    border-radius: 10%;
    background: #dbdbdb;
  }
`;

export default Favorites;
