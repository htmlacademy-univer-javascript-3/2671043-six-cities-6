import { Link } from 'react-router-dom';
import { AppRoute, PlaceCardType } from '../../const';
import { Offer } from '../../types/offer';
import { PlaceCard } from '../place-card/place-card';
import { useAppDispatch } from '../../hooks/use-store';
import { changeCity } from '../../store/app-process/app-process';

type FavoritesListProps = {
  favorites: Offer[];
  cities: string[];
};

export const FavoritesList = ({ favorites, cities }: FavoritesListProps) => {
  const dispatch = useAppDispatch();
  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {cities.map((cityName) => (
          <li className="favorites__locations-items" key={cityName}>
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <Link
                  className="locations__item-link"
                  to={AppRoute.Main}
                  onClick={() => {
                    dispatch(changeCity(cityName));
                  }}
                >
                  <span>{cityName}</span>
                </Link>
              </div>
            </div>
            <div className="favorites__places">
              {favorites
                .filter((offer) => offer.city.name === cityName)
                .map((offer) => (
                  <PlaceCard
                    key={offer.id}
                    offer={offer}
                    cardType={PlaceCardType.Favorites}
                    onActiveCard={() => {}}
                  />
                ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
