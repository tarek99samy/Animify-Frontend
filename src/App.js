import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/private_route/private_route';
import { UserContextProvider } from './context/user_context';
import Login from './pages/login/login';
import SignUp from './pages/signup/signup';
import NotFound from './pages/not_found/not_found';
import './styles/reset.scss';
import SideBar from './components/side_bar/side_bar';
import NavBar from './components/nav_bar/nav_bar';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <UserContextProvider>
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={SignUp} />
          <SideBar />
          <NavBar />
          {/* <Route exact path='/notfound' component={NotFound} />
          <Redirect to='/notfound' /> */}
        </UserContextProvider>
      </Switch>
    </BrowserRouter>
  );
}
