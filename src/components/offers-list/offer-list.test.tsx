import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { NameSpace, AuthorizationStatus, PlaceCardType } from '../../const';
import { Offer } from '../../types/offer';
import { OfferList } from './offers-list';

const mockStore = configureMockStore();


const mockOffers = [
  {
    id: '1',
    title: 'Offer 1',
    type: 'apartment',
    price: 100,
    isFavorite: false,
    isPremium: false,
    rating: 4,
    previewImage: 'img1.jpg'
  },
  {
    id: '2',
    title: 'Offer 2',
    type: 'room',
    price: 50,
    isFavorite: true,
    isPremium: false,
    rating: 3,
    previewImage: 'img2.jpg'
  }
] as Offer[];

describe('Component: OfferList', () => {
  it('should render correct number of cards', () => {

    const store = mockStore({
      [NameSpace.User]: { authorizationStatus: AuthorizationStatus.NoAuth },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OfferList
            offers={mockOffers}
            onActiveCard={vi.fn()}
            cardType={PlaceCardType.Cities}
          />
        </MemoryRouter>
      </Provider>
    );


    expect(screen.getAllByRole('article')).toHaveLength(2);

    expect(screen.getByText('Offer 1')).toBeInTheDocument();
    expect(screen.getByText('Offer 2')).toBeInTheDocument();
  });
});
