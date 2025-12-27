import { describe, it, expect, beforeEach } from 'vitest';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AnyAction } from 'redux';
import { AppThunkDispatch, State } from '../types/state';
import {
  checkAuthAction,
  fetchOffersAction,
  fetchOfferDataAction,
  postCommentAction,
  fetchFavoritesAction,
  setFavoriteAction,
  loginAction,
  logoutAction,
} from './api-actions';
import { APIRoute, AuthorizationStatus } from '../const';
import {
  makeFakeOffer,
  makeFakeDetailedOffer,
  makeFakeReviewData,
  makeFakeAuthData,
  makeFakeUser,
} from '../utils/mocks';
import { userProcess } from './user-process/user-process';

describe('Async actions', () => {
  const api = createAPI();
  const mockAxiosAdapter = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<State, AnyAction, AppThunkDispatch>(
    middlewares
  );

  beforeEach(() => {
    mockAxiosAdapter.reset();
  });

  describe('fetchOffersAction', () => {
    it('should dispatch "fetchOffersAction.pending" and "fetchOffersAction.fulfilled" when server response 200', async () => {
      const mockOffers = [makeFakeOffer()];
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, mockOffers);

      const store = mockStore();

      await store.dispatch(fetchOffersAction());

      const actions = store.getActions();

      expect(actions[0].type).toBe(fetchOffersAction.pending.type);
      expect(actions[1].type).toBe(fetchOffersAction.fulfilled.type);
      expect(actions[1].payload).toEqual(mockOffers);
    });
  });

  it('should dispatch "user null" and "checkAuthAction.rejected" when server response 401', async () => {
    mockAxiosAdapter.onGet(APIRoute.Login).reply(401);

    const store = mockStore();

    try {
      await store.dispatch(checkAuthAction());
    } catch {
      /* empty */
    }

    const actions = store.getActions();

    expect(actions).toHaveLength(2);

    expect(actions[0].type).toBe(checkAuthAction.pending.type);

    expect(actions[1].type).toBe(checkAuthAction.rejected.type);

    const state = userProcess.reducer(
      { authorizationStatus: AuthorizationStatus.Unknown, user: null },
      actions[1]
    );
    expect(state.user).toBeNull();
  });

  describe('fetchOfferDataAction', () => {
    it('should dispatch fulfilled with combined data when all requests success', async () => {
      const mockOfferId = '1';
      const mockDetailedOffer = makeFakeDetailedOffer();
      const mockNearby = [makeFakeOffer()];
      const mockComments = [makeFakeReviewData()];

      mockAxiosAdapter
        .onGet(`${APIRoute.Offers}/${mockOfferId}`)
        .reply(200, mockDetailedOffer);
      mockAxiosAdapter
        .onGet(`${APIRoute.Offers}/${mockOfferId}/nearby`)
        .reply(200, mockNearby);
      mockAxiosAdapter
        .onGet(`${APIRoute.Comments}/${mockOfferId}`)
        .reply(200, mockComments);

      const store = mockStore();

      await store.dispatch(fetchOfferDataAction(mockOfferId));

      const actions = store.getActions();

      expect(actions[0].type).toBe(fetchOfferDataAction.pending.type);
      expect(actions[1].type).toBe(fetchOfferDataAction.fulfilled.type);
      expect(actions[1].payload).toEqual({
        offer: mockDetailedOffer,
        nearby: mockNearby,
        comments: mockComments,
      });
    });
  });

  describe('postCommentAction', () => {
    it('should dispatch fulfilled with updated comments when POST and GET success', async () => {
      const mockReviewData = makeFakeReviewData();
      const mockComments = [makeFakeReviewData()];

      mockAxiosAdapter
        .onPost(`${APIRoute.Comments}/${mockReviewData.offerId}`)
        .reply(201);

      mockAxiosAdapter
        .onGet(`${APIRoute.Comments}/${mockReviewData.offerId}`)
        .reply(200, mockComments);

      const store = mockStore();

      await store.dispatch(postCommentAction(mockReviewData));

      const actions = store.getActions();

      expect(actions[0].type).toBe(postCommentAction.pending.type);
      expect(actions[1].type).toBe(postCommentAction.fulfilled.type);
      expect(actions[1].payload).toEqual(mockComments);
    });
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending", "fetchOffers", "fetchFavorites" and "loginAction.fulfilled" when server response 200', async () => {
      const fakeUser = makeFakeUser();
      const fakeAuthData = makeFakeAuthData();

      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeUser);

      const store = mockStore();

      await store.dispatch(loginAction(fakeAuthData));

      const actions = store.getActions();

      const actionsTypes = actions.map((action) => action.type as string);

      expect(actionsTypes).toContain(loginAction.pending.type);
      expect(actionsTypes).toContain(fetchOffersAction.pending.type);
      expect(actionsTypes).toContain(fetchFavoritesAction.pending.type);
      expect(actionsTypes).toContain(loginAction.fulfilled.type);

      const fulfilledAction = actions.find(
        (action) => action.type === loginAction.fulfilled.type
      );
      expect(fulfilledAction?.payload).toEqual(fakeUser);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.fulfilled" and fetch offers', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

      const store = mockStore();

      await store.dispatch(logoutAction());

      const actions = store.getActions();
      const actionsTypes = actions.map((action) => action.type as string);

      expect(actionsTypes).toContain(logoutAction.pending.type);
      expect(actionsTypes).toContain(fetchOffersAction.pending.type);
      expect(actionsTypes).toContain(logoutAction.fulfilled.type);
    });
  });

  describe('setFavoriteAction', () => {
    it('should dispatch fulfilled with updated offer', async () => {
      const mockOffer = makeFakeOffer();
      const status = 1;

      mockAxiosAdapter
        .onPost(`${APIRoute.Favorite}/${mockOffer.id}/${status}`)
        .reply(200, mockOffer);

      const store = mockStore();

      await store.dispatch(
        setFavoriteAction({ offerId: mockOffer.id, status })
      );

      const actions = store.getActions();

      expect(actions[0].type).toBe(setFavoriteAction.pending.type);
      expect(actions[1].type).toBe(setFavoriteAction.fulfilled.type);
      expect(actions[1].payload).toEqual(mockOffer);
    });
  });
});
