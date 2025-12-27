import { render, screen } from '@testing-library/react';
import { LocationsList } from './locations-list';
import { CITIES } from '../../const';
import userEvent from '@testing-library/user-event';

describe('Component: LocationsList', () => {
  it('should render correctly', () => {
    const activeCity = CITIES[0];

    render(<LocationsList cityActive={activeCity} onCityChange={vi.fn()} />);

    CITIES.forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument();
    });

    const activeLink = screen.getByText(activeCity).closest('a');

    expect(activeLink).toHaveClass('tabs__item--active');
  });
  it('should call onCityChange when a city is clicked', async () => {
    const onCityChange = vi.fn();
    const activeCity = CITIES[0];
    const targetCity = CITIES[1];

    render(
      <LocationsList cityActive={activeCity} onCityChange={onCityChange} />
    );

    const cityLink = screen.getByText(targetCity);

    await userEvent.click(cityLink);

    expect(onCityChange).toHaveBeenCalledTimes(1);
    expect(onCityChange).toHaveBeenCalledWith(targetCity);
  });
});
