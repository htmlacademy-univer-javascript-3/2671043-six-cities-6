import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { PlaceCard } from './place-card';
import { AuthorizationStatus, NameSpace, AppRoute, PlaceCardType } from '../../const';
import { Offer } from '../../types/offer';

import { setFavoriteAction } from '../../store/api-actions';

const mockStore = configureMockStore([thunk]);

const mockOffer = {
  id: '1',
  title: 'Beautiful apartment',
  type: 'apartment',
  price: 120,
  previewImage: 'img/apartment-01.jpg',
  isFavorite: false,
  isPremium: true,
  rating: 4.8,
} as Offer;

describe('Component: PlaceCard', () => {
  it('should render correctly', () => {
    const store = mockStore({
      [NameSpace.User]: { authorizationStatus: AuthorizationStatus.NoAuth },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlaceCard
            offer={mockOffer}
            onActiveCard={vi.fn()}
            cardType={PlaceCardType.Cities}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Beautiful apartment')).toBeInTheDocument();
    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByText(/€120/i)).toBeInTheDocument();
  });

  it('should redirect to Login page when unauthorized user clicks bookmark', async () => {
    const store = mockStore({
      [NameSpace.User]: { authorizationStatus: AuthorizationStatus.NoAuth },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={
              <PlaceCard
                offer={mockOffer}
                onActiveCard={vi.fn()}
                cardType={PlaceCardType.Cities}
              />
            }
            />
            <Route path={AppRoute.Login} element={<h1>Login Page</h1>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
  });

  it('should dispatch setFavoriteAction when authorized user clicks bookmark', async () => {
    const store = mockStore({
      [NameSpace.User]: { authorizationStatus: AuthorizationStatus.Auth },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlaceCard
            offer={mockOffer}
            onActiveCard={vi.fn()}
            cardType={PlaceCardType.Cities}
          />
        </MemoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByRole('button'));

    const actions = store.getActions();

    expect(actions[0].type).toBe(setFavoriteAction.pending.type);

  });
});
