import { memo, useState } from 'react';
import { SortOption } from '../../const';

type PlacesSortingProps = {
  currentSort: SortOption;
  onChange: (option: SortOption) => void;
};
export const PlacesSorting = memo(({
  currentSort,
  onChange,
}: PlacesSortingProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleTypeClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option: SortOption) => {
    onChange(option);
    setIsOpen(false);
  };


  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>


      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleTypeClick}
      >
        {currentSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>

      <ul
        className={`places__options places__options--custom ${
          isOpen ? 'places__options--opened' : ''
        }`}
      >
        {Object.values(SortOption).map((option) => (
          <li
            key={option}
            className={`places__option ${
              option === currentSort ? 'places__option--active' : ''
            }`}
            tabIndex={0}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
});

PlacesSorting.displayName = 'PlacesSorting';
