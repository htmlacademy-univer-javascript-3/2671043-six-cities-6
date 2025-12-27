import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { FavoritesList } from './favorites-list';
import { makeFakeOffer } from '../../utils/mocks';
import { vi } from 'vitest';
import { changeCity } from '../../store/app-process/app-process';

vi.mock('../place-card/place-card', () => ({
  PlaceCard: () => <div data-testid="place-card">Mock Place Card</div>,
}));

const mockStore = configureMockStore();

describe('Component: FavoritesList', () => {
  it('should render correctly and dispatch changeCity on city click', () => {
    const store = mockStore({});
    const mockCity = 'Paris';
    const mockOffer = makeFakeOffer();
    mockOffer.city.name = mockCity;

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesList favorites={[mockOffer]} cities={[mockCity]} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
    expect(screen.getByText(mockCity)).toBeInTheDocument();

    expect(screen.getByTestId('place-card')).toBeInTheDocument();

    const cityLink = screen.getByText(mockCity);
    fireEvent.click(cityLink);

    const actions = store.getActions();

    expect(actions[0].type).toBe(changeCity.type);
    expect(actions[0].payload).toBe(mockCity);
  });
});
