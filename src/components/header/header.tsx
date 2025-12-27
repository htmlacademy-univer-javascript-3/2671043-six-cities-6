import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/use-store';
import { fetchFavoritesAction, logoutAction } from '../../store/api-actions';
import { AppRoute, AuthorizationStatus } from '../../const';
import {
  getAuthorizationStatus,
  getUser,
} from '../../store/user-process/selectors';
import { useEffect } from 'react';
import { getFavoritesCount } from '../../store/app-data/selectors';

export const Header = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const user = useAppSelector(getUser);
  const favoritesCount = useAppSelector(getFavoritesCount);

  const shouldRenderUserNav = pathname !== AppRoute.Login.toString();
  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoritesAction());
    }
  }, [authorizationStatus, dispatch]);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={AppRoute.Main}>
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </Link>
          </div>

          {shouldRenderUserNav && (
            <nav className="header__nav">
              <ul className="header__nav-list">
                {authorizationStatus === AuthorizationStatus.Auth ? (
                  <>
                    <li className="header__nav-item user">
                      <Link
                        className="header__nav-link header__nav-link--profile"
                        to={AppRoute.Favorites}
                      >
                        <div
                          className="header__avatar-wrapper user__avatar-wrapper"
                          style={{
                            backgroundImage: user
                              ? `url(${user.avatarUrl})`
                              : '',
                          }}
                        >
                        </div>
                        <span className="header__user-name user__name">
                          {user ? user.email : ''}
                        </span>
                        <span className="header__favorite-count">
                          {favoritesCount}
                        </span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <Link
                        className="header__nav-link"
                        to={AppRoute.Main}
                        onClick={(evt) => {
                          evt.preventDefault();
                          dispatch(logoutAction());
                        }}
                      >
                        <span className="header__signout">Sign out</span>
                      </Link>
                    </li>
                  </>
                ) : (
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to={AppRoute.Login}
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

Header.displayName = 'Header';
