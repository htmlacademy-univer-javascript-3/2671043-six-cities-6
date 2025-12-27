import { describe, it, expect } from 'vitest';
import { userProcess } from './user-process';
import { AuthorizationStatus } from '../../const';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { makeFakeUser } from '../../utils/mocks';

describe('UserProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
    };

    const result = userProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "Auth" status with "checkAuthAction.fulfilled"', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
    };
    const mockUser = makeFakeUser();

    const result = userProcess.reducer(
      initialState,
      checkAuthAction.fulfilled(mockUser, '', undefined)
    );

    expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(result.user).toEqual(mockUser);
  });

  it('should set "NoAuth" status with "checkAuthAction.rejected"', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
    };

    const result = userProcess.reducer(
      initialState,
      loginAction.rejected(null, '', { login: 'test', password: '123' })
    );
    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    expect(result.user).toBeNull();
  });

  it('should set "Auth" status with "loginAction.fulfilled"', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null,
    };
    const mockUser = makeFakeUser();

    const result = userProcess.reducer(
      initialState,
      loginAction.fulfilled(mockUser, '', { login: 'test', password: '123' })
    );

    expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(result.user).toEqual(mockUser);
  });

  it('should set "NoAuth" status with "loginAction.rejected"', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
    };

    const result = userProcess.reducer(
      initialState,
      loginAction.rejected(null, '', { login: 'test', password: '123' })
    );

    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });

  it('should set "NoAuth" status with "logoutAction.fulfilled"', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Auth,
      user: makeFakeUser(),
    };

    const result = userProcess.reducer(
      initialState,
      logoutAction.fulfilled(undefined, '', undefined)
    );

    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    expect(result.user).toBeNull();
  });
});
