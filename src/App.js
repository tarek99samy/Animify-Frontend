import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/private_route/private_route';
import { UserContextProvider } from './context/user_context';
import Login from './pages/login/login';
import SignUp from './pages/signup/signup';
import ResetPassword from './pages/reset_password/reset_password';
import NotFound from './pages/not_found/not_found';
import AnimeInfo from './pages/anime_info/anime_info';
import './styles/reset.scss';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <UserContextProvider>
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/reset-password' component={ResetPassword} />
          <Route exact path='/info/:animeId' component={AnimeInfo} />

          {/* <Route exact path='/notfound' component={NotFound} />
          <Redirect to='/notfound' /> */}
        </UserContextProvider>
      </Switch>
    </BrowserRouter>
  );
}
