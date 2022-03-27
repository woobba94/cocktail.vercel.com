import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import FavoritesCard from 'src/components/FavoritesCard';

const Favorites: NextPage = () => {
  const [favoritesList, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const arr = JSON.parse(localStorage.getItem('favoritesHistory') || '[]');
    setFavorites(arr);
  }, []);

  return (
    <div>
      {favoritesList.map((item) => {
        return <FavoritesCard key={item} id={item} />;
      })}
    </div>
  );
};

export default Favorites;
