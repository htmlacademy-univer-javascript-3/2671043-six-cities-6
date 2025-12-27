import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { Header } from './header';
import { AuthorizationStatus, NameSpace } from '../../const';
import { logoutAction } from '../../store/api-actions';
import { AnyAction } from 'redux';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Component: Header', () => {
  it('should render correctly and handle logout', async () => {
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: { email: 'test@test.ru', avatarUrl: '' },
      },
      [NameSpace.Data]: { favorites: [] },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('test@test.ru')).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();

    await userEvent.click(screen.getByText('Sign out'));

    const actions = store.getActions();
    const actionsTypes = actions.map(
      (action: AnyAction) => action.type as string
    );

    expect(actionsTypes).toContain(logoutAction.pending.type);
  });
});
