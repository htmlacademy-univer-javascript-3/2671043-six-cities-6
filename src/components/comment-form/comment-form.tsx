import { useState, ChangeEvent, FormEvent, Fragment } from 'react';

import { useAppDispatch } from '../../hooks/use-store';
import { postCommentAction } from '../../store/api-actions';
import { AxiosError } from 'axios';
import { CommentLength, RatingMap } from '../../const';
import './comment-form.css';
type CommentFormProps = {
  offerId: string;
};

export const CommentForm = ({ offerId }: CommentFormProps) => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    rating: 0,
    review: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleFormChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = evt.target;
    const parsedValue = name === 'rating' ? Number(value) : value;

    setFormData({
      ...formData,
      [name]: parsedValue,
    });

    if (serverError) {
      setServerError(null);
    }
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    setIsSubmitting(true);
    setServerError(null);

    dispatch(
      postCommentAction({
        offerId,
        comment: formData.review,
        rating: formData.rating,
      })
    )
      .unwrap()
      .then(() => {
        setFormData({ rating: 0, review: '' });
        setServerError(null);
      })
      .catch((err) => {
        const error = err as AxiosError;
        setServerError(error.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const isValid =
    formData.rating > 0 &&
    formData.review.length >= CommentLength.Min &&
    formData.review.length <= CommentLength.Max;

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

      {serverError && (
        <div className="reviews__error-message">Error: {serverError}</div>
      )}

      <div className="reviews__rating-form form__rating">
        {Object.entries(RatingMap)
          .reverse()
          .map(([score, title]) => (
            <Fragment key={score}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={score}
                id={`${score}-stars`}
                type="radio"
                onChange={handleFormChange}
                checked={formData.rating === Number(score)}
                disabled={isSubmitting}
              />
              <label
                htmlFor={`${score}-stars`}
                className="reviews__rating-label form__rating-label"
                title={title}
              >
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>
          ))}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleFormChange}
        value={formData.review}
        maxLength={CommentLength.Max}
        disabled={isSubmitting}
      >
      </textarea>

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least{' '}
          <b className="reviews__text-amount">{CommentLength.Min} characters</b>
          .
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};
