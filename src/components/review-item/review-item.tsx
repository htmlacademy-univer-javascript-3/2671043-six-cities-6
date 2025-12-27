import { RATING_MULTIPLIER } from '../../const';
import { Review } from '../../types/review';

type ReviewItemProps = {
  review: Review;
};

export const ReviewItem = ({ review }: ReviewItemProps) => {

  const { user, rating, comment, date } = review;


  const ratingWidth = Math.round(rating) * RATING_MULTIPLIER;
  const dateText = new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
  });
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={user.avatarUrl}
            width="54"
            height="54"
            alt={user.name}
          />
        </div>
        <span className="reviews__user-name">{user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${ratingWidth}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment}</p>

        <time className="reviews__time" dateTime={date}>
          {dateText}
        </time>
      </div>
    </li>
  );
};
