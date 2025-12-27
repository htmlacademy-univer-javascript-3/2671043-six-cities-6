import { Link } from 'react-router-dom';
import { Header } from '../../components/header/header';
import { AppRoute } from '../../const';

export const NotFoundPage = () => (
  <div className="page page--gray page--login">
    <Header />

    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">404. Page not found</h1>

          <img className="login__image" src="img/404.png" alt="404" />

          <Link to={AppRoute.Main}>Вернуться на главную</Link>
        </section>
      </div>
    </main>
  </div>
);
