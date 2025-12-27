import { render, screen } from '@testing-library/react';
import { ReviewItem } from './review-item';
import { Review } from '../../types/review';


const mockReview: Review = {
  id: '1',
  date: '2023-05-25T12:00:00.000Z',
  user: {
    name: 'Oliver',
    avatarUrl: 'https://url-to-image/image.jpg',
    isPro: false,
  },
  comment: 'A quiet place.',
  rating: 4,
};

describe('Component: ReviewItem', () => {
  it('should render correctly', () => {
    render(<ReviewItem review={mockReview} />);

    expect(screen.getByText(mockReview.user.name)).toBeInTheDocument();

    expect(screen.getByText(mockReview.comment)).toBeInTheDocument();


    const image = screen.getByAltText(mockReview.user.name);
    expect(image).toHaveAttribute('src', mockReview.user.avatarUrl);


    expect(screen.getByText(/May 2023/i)).toBeInTheDocument();
  });
});
