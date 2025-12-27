import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { OfferPage } from './offer-page';
import { NameSpace, AuthorizationStatus } from '../../const';

vi.mock('../../components/map-offers/map-offers', () => ({
  MapOffers: () => <div data-testid="map-offers" />,
}));

window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;

const mockStore = configureMockStore([thunk]);

const mockFullOffer = {
  id: '1',
  title: 'Luxury Studio',
  type: 'apartment',
  price: 200,
  images: ['img1.jpg'],
  isPremium: true,
  isFavorite: false,
  rating: 4.5,
  description: 'Desc',
  bedrooms: 3,
  maxAdults: 4,
  goods: ['Wi-Fi'],
  host: { name: 'Host', avatarUrl: '', isPro: true },
  city: { name: 'Paris', location: { latitude: 0, longitude: 0, zoom: 10 } },
  location: { latitude: 0, longitude: 0, zoom: 10 },
};

describe('Page: OfferPage', () => {
  it('should render offer details when data is loaded', () => {
    const store = mockStore({
      [NameSpace.Data]: {
        offer: mockFullOffer,
        nearbyOffers: [],
        comments: [],
        isOfferLoading: false,
        hasError: false,
        favorites: [],
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: { email: 'test@test.ru' },
      },
      [NameSpace.App]: { error: null },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/offer/1']}>
          <Routes>
            <Route path="/offer/:id" element={<OfferPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Luxury Studio')).toBeInTheDocument();
    expect(screen.getByText('Meet the host')).toBeInTheDocument();
    expect(screen.getByText('What\'s inside')).toBeInTheDocument();
    expect(screen.getByTestId('map-offers')).toBeInTheDocument();
  });
});
