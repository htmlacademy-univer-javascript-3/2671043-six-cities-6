import { useEffect, useMemo } from 'react';
import { Header } from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks/use-store';
import { fetchFavoritesAction } from '../../store/api-actions';
import { getFavorites } from '../../store/app-data/selectors';
import { Footer } from '../../components/footer/footer';
import { FavoritesEmpty } from '../../components/favorites-empty/favorites-empty';
import { FavoritesList } from '../../components/favorites-list/favorites-list';

export const FavoritesPage = () => {
  const dispatch = useAppDispatch();

  const favorites = useAppSelector(getFavorites);

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  const cities = useMemo(
    () => Array.from(new Set(favorites.map((offer) => offer.city.name))),
    [favorites]
  );

  return (
    <div
      className={`page ${
        favorites.length === 0 ? 'page--favorites-empty' : ''
      }`}
    >
      <Header />

      <main
        className={`page__main page__main--favorites ${
          favorites.length === 0 ? 'page__main--favorites-empty' : ''
        }`}
      >
        <div className="page__favorites-container container">
          {favorites.length === 0 ? (
            <FavoritesEmpty />
          ) : (
            <FavoritesList cities={cities} favorites={favorites} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

