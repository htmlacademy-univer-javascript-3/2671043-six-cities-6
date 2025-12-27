import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { useAppDispatch, useAppSelector } from './use-store';
import { NameSpace } from '../const';
import { State } from '../types/state';
import { Action } from 'redux';


const mockStore = configureMockStore<State, Action>();

describe('Hooks: useAppDispatch & useAppSelector', () => {
  it('useAppDispatch should return dispatch function', () => {

    const store = mockStore({});

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => useAppDispatch(), { wrapper });


    expect(result.current).toBeInstanceOf(Function);

    const action = { type: 'TEST_ACTION' };
    result.current(action);
    expect(store.getActions()).toContainEqual(action);
  });

  it('useAppSelector should return state value', () => {
    const initialState = {
      [NameSpace.User]: { user: { name: 'TestUser' } }
    } as unknown as State;

    const store = mockStore(initialState);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );


    const { result } = renderHook(
      () => useAppSelector((state) => state[NameSpace.User].user?.name),
      { wrapper }
    );

    expect(result.current).toBe('TestUser');
  });
});
