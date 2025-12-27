import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Footer } from './footer';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();

    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
