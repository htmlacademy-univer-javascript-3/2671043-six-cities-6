
import { MapOffers } from './map-offers';
import { City, Offer } from '../../types/offer';
import { render, screen } from '@testing-library/react';

vi.mock('../../hooks/use-map', () => ({
  useMap: () => null,
}));


const mockCity: City = {
  name: 'Paris',
  location: { latitude: 48.85, longitude: 2.35, zoom: 10 }
};

const mockOffers: Offer[] = [];

describe('Component: MapOffers', () => {
  it('should render correctly', () => {

    render(
      <MapOffers
        city={mockCity}
        offers={mockOffers}
        selectedOffer={null}
        className="cities__map"
      />
    );

    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
});
