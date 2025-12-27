import { render, screen } from '@testing-library/react';
import { MainEmpty } from './main-empty';

describe('Component: MainEmpty', () => {
  it('should render correctly with given city', () => {
    const expectedCity = 'Paris';

    render(<MainEmpty city={expectedCity} />);

    expect(
      screen.getByText(/No places to stay available/i)
    ).toBeInTheDocument();

    expect(screen.getByText(new RegExp(expectedCity, 'i'))).toBeInTheDocument();
  });
});
