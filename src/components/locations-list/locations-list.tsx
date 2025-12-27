import { memo } from 'react';
import { CITIES } from '../../const';

type LocationsListProps = {
  cityActive: string;
  onCityChange: (city: string) => void;
};

export const LocationsList = memo(({ cityActive, onCityChange }: LocationsListProps) => (
  <section className="locations container">
    <ul className="locations__list tabs__list">
      {CITIES.map((city) => (
        <li className="locations__item" key={city}>
          <a
            className={`locations__item-link tabs__item ${city === cityActive ? 'tabs__item--active' : ''}`}
            href="#"
            onClick={(evt) => {
              evt.preventDefault();
              onCityChange(city);
            }}
          >
            <span>{city}</span>
          </a>
        </li>
      ))}
    </ul>
  </section>
));

LocationsList.displayName = 'LocationsList';
