import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { LoginPage } from './login-page';
import { NameSpace, AuthorizationStatus } from '../../const';
import userEvent from '@testing-library/user-event';
import { loginAction } from '../../store/api-actions';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

const api = createAPI();

const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

describe('Page: LoginPage', () => {
  it('should render login form', () => {
    const store = mockStore({
      [NameSpace.User]: { authorizationStatus: AuthorizationStatus.NoAuth },
      [NameSpace.Data]: { favorites: [] },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    expect(
      screen.getByRole('heading', { name: /Sign in/i })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Sign in/i })
    ).toBeInTheDocument();
  });

  it('should dispatch loginAction when form is submitted', async () => {
    vi.spyOn(api, 'post').mockResolvedValue({
      data: { token: 'six-cities-token' },
    });

    const store = mockStore({
      [NameSpace.User]: { authorizationStatus: AuthorizationStatus.NoAuth },
      [NameSpace.Data]: { favorites: [] },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    await userEvent.type(screen.getByPlaceholderText(/Email/i), 'test@test.ru');
    await userEvent.type(screen.getByPlaceholderText(/Password/i), '123aa');

    await userEvent.click(screen.getByRole('button', { name: /Sign in/i }));

    const actions = store.getActions();

    expect(actions[0].type).toBe(loginAction.pending.type);
  });
});
