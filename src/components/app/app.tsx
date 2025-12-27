import { Route, Routes } from 'react-router-dom';
import { MainPage } from '../../pages/main-page/main-page';
import { AppRoute, AuthorizationStatus } from '../../const';
import { LoginPage } from '../../pages/login-page/login-page';
import { FavoritesPage } from '../../pages/favorites-page/favorites-page';
import { OfferPage } from '../../pages/offer-page/offer-page';
import { NotFoundPage } from '../../pages/not-found-page/not-found-page';
import { PrivateRoute } from '../private-route/private-route';

import { useAppSelector } from '../../hooks/use-store';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getIsOffersDataLoading } from '../../store/app-data/selectors';
import { LoadingScreen } from '../loading-screen/loading-screen';

export const App = () => {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isDataLoading = useAppSelector(getIsOffersDataLoading);


  if (authorizationStatus === AuthorizationStatus.Unknown || isDataLoading) {
    return <LoadingScreen />;
  }
  return (
    <Routes>
      <Route path={AppRoute.Main} element={<MainPage />} />
      <Route path={AppRoute.Login} element={<LoginPage />} />
      <Route
        path={AppRoute.Favorites}
        element={
          <PrivateRoute>
            <FavoritesPage />
          </PrivateRoute>
        }
      />
      <Route path={AppRoute.Offer} element={<OfferPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
