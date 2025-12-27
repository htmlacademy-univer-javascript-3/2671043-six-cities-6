import { Link, Navigate } from 'react-router-dom';
import { Header } from '../../components/header/header';
import { AppRoute, AuthorizationStatus, CITIES } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/use-store';
import { loginAction } from '../../store/api-actions';
import { FormEvent, useRef, useState } from 'react';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { changeCity } from '../../store/app-process/app-process';
import { getRandomCity } from '../../utils/mocks';
const PASSWORD_PATTERN = '(?=.*\\d)(?=.*[a-zA-Z])\\S+';
export const LoginPage = () => {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const [randomCity] = useState(() => getRandomCity(CITIES));

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Main} />;
  }

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current && passwordRef.current) {
      dispatch(
        loginAction({
          login: loginRef.current.value,
          password: passwordRef.current.value,
        })
      );
    }
  };

  return (
    <div className="page page--gray page--login">
      <Header />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  ref={loginRef}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  ref={passwordRef}
                  pattern={PASSWORD_PATTERN}
                  title="Пароль должен содержать хотя бы одну цифру и букву и не должен содержать пробелы"
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to={AppRoute.Main}
                onClick={() => {
                  dispatch(changeCity(randomCity));
                }}
              >
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
