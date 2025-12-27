import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { MainPage } from './main-page';
import { NameSpace, AuthorizationStatus, SortOption } from '../../const';


vi.mock('../../components/map-offers/map-offers', () => ({
  MapOffers: () => <div data-testid="map-offers" />,
}));

const mockStore = configureMockStore();

describe('Page: MainPage', () => {
  it('should render correctly with offers', () => {
    const store = mockStore({
      [NameSpace.Data]: {
        offers: [
          {
            id: '1',
            title: 'Main Page Offer',
            city: {
              name: 'Paris',
              location: { latitude: 0, longitude: 0, zoom: 10 },
            },
            price: 120,
            type: 'room',
            isFavorite: false,
            rating: 4,
            previewImage: 'img.jpg',
            location: { latitude: 0, longitude: 0, zoom: 10 },
          },
        ],
        isOffersLoading: false,
        favorites: [],
      },
      [NameSpace.App]: {
        cityActive: 'Paris',
        currentSortOption: SortOption.Popular,
        error: null,
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
    expect(screen.getByText('Main Page Offer')).toBeInTheDocument();
    expect(screen.getByTestId('map-offers')).toBeInTheDocument();
  });
});
