import { NameSpace, SortOption } from '../../const';
import { State } from '../../types/state';


export const getCity = (state: State): string => state[NameSpace.App].cityActive;
export const getSortOption = (state: State): SortOption => state[NameSpace.App].currentSortOption;

