import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { CommentForm } from './comment-form';
import { vi } from 'vitest';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Component: CommentForm', () => {
  it('should render correctly', () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <CommentForm offerId="1" />
      </Provider>
    );

    expect(screen.getByLabelText(/Your review/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Tell how was your stay/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  it('should enable submit button only when form is valid', async () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <CommentForm offerId="1" />
      </Provider>
    );

    const submitButton = screen.getByRole('button', { name: /Submit/i });
    const commentInput = screen.getByPlaceholderText(/Tell how was your stay/i);

    const ratingInputs = screen.getAllByRole('radio');
    const fiveStarRating = ratingInputs[0];


    expect(submitButton).toBeDisabled();


    await userEvent.type(commentInput, 'Short review');
    await userEvent.click(fiveStarRating);
    expect(submitButton).toBeDisabled();

    const longText = 'This is a really long text that describes my stay in details so it passes validation rules.';
    await userEvent.type(commentInput, longText);


    expect(submitButton).toBeEnabled();
  });

  it('should dispatch postCommentAction on submit', async () => {
    const store = mockStore({});

    store.dispatch = vi.fn().mockReturnValue({
      unwrap: () => Promise.resolve()
    });

    render(
      <Provider store={store}>
        <CommentForm offerId="1" />
      </Provider>
    );


    const commentInput = screen.getByPlaceholderText(/Tell how was your stay/i);
    const ratingInputs = screen.getAllByRole('radio');

    await userEvent.click(ratingInputs[0]);
    await userEvent.type(commentInput, 'Valid text for the review component greater than fifty chars.');
    await userEvent.click(screen.getByRole('button', { name: /Submit/i }));

    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
