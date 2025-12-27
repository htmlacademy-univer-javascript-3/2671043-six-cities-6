import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CITY_DEFAULT, NameSpace, SortOption } from '../../const';

type AppProcess = {
  cityActive: string;
  currentSortOption: SortOption;
};

const initialState: AppProcess = {
  cityActive: CITY_DEFAULT,
  currentSortOption: SortOption.Popular,

};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.cityActive = action.payload;
    },
    changeSort: (state, action: PayloadAction<SortOption>) => {
      state.currentSortOption = action.payload;
    },

  },
});

export const { changeCity, changeSort } = appProcess.actions;
