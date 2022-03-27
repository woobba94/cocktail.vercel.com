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
    <div>
      <button type="button" onClick={() => router.back()}>
        Go Back
      </button>
      <ResponsiveGrid>
        {favoritesList.map((item) => {
          return <FavoritesCard key={item} id={item} />;
        })}
      </ResponsiveGrid>
    </div>
  );
};

export default Favorites;
