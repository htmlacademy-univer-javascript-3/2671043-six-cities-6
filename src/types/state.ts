
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { store } from '../store';
import { createAPI } from '../services/api';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunkDispatch = ThunkDispatch<
  State,
  ReturnType<typeof createAPI>,
  Action
>;
