import { render, screen } from '@testing-library/react';
import { FavoritesEmpty } from './favorites-empty';

describe('Component: FavoritesEmpty', () => {
  it('should render correctly', () => {
    render(<FavoritesEmpty />);

    const headerElement = screen.getByText(/Favorites \(empty\)/i);
    const statusElement = screen.getByText(/Nothing yet saved/i);
    const descriptionElement = screen.getByText(/Save properties to narrow down search/i);

    expect(headerElement).toBeInTheDocument();
    expect(statusElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });
});
