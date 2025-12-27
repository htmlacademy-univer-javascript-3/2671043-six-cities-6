import { describe, it, expect } from 'vitest';
import { appProcess, changeCity, changeSort } from './app-process';
import { CITY_DEFAULT, SortOption } from '../../const';

describe('AppProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      cityActive: CITY_DEFAULT,
      currentSortOption: SortOption.Popular,
    };

    const result = appProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should change city with "changeCity" action', () => {
    const initialState = {
      cityActive: CITY_DEFAULT,
      currentSortOption: SortOption.Popular,
    };
    const newCity = 'Hamburg';

    const result = appProcess.reducer(initialState, changeCity(newCity));

    expect(result.cityActive).toBe(newCity);
  });

  it('should change sort option with "changeSort" action', () => {
    const initialState = {
      cityActive: CITY_DEFAULT,
      currentSortOption: SortOption.Popular,
    };
    const newSort = SortOption.PriceLowToHigh;

    const result = appProcess.reducer(initialState, changeSort(newSort));

    expect(result.currentSortOption).toBe(newSort);
  });
});
