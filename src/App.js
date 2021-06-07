import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/private_route/private_route';
import Login from './pages/login/login';
import SignUp from './pages/signup/signup';
import ResetPassword from './pages/reset_password/reset_password';
import NotFound from './pages/not_found/not_found';
import AnimeInfo from './pages/anime_info/anime_info';
import AnimeSource from './pages/anime_source/anime_source';
import './styles/reset.scss';
import Home from './pages/home/home';
import Trending from './pages/trending_anime/trending_anime';
import Seasonal from './pages/seasonal_anime/seasonal_anime';
import AnimeSchedule from './pages/anime_schedule/anime_schedule';
import SearchResult from './pages/search_results/search_results';
import RecentSearch from './pages/recent_search/recent_search';
import SideBar from './components/side_bar/side_bar';
import NavBar from './components/nav_bar/nav_bar';
import Streaming from './pages/streaming/streaming';

export default function App() {
  return (
    <BrowserRouter>
      <SideBar />
      {!window.location.pathname.includes('/watch') && <NavBar />}
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/reset-password' component={ResetPassword} />
        <Route exact path='/anime-source/:sourceServer/category/:gotoURL' component={AnimeSource} />
        <Route exact path='/watch/:totalEposides' component={Streaming} />
        <Route exact path='/anime-info/:listingId/:animeId' component={AnimeInfo} />
        <Route exact path='/' component={Home} />
        <Route exact path='/trending-anime' component={Trending} />
        <Route exact path='/seasonal-anime' component={Seasonal} />
        <Route exact path='/anime-schedule' component={AnimeSchedule} />
        <Route exact path='/search-result/:sourceID/:query' component={SearchResult} />
        <Route exact path='/search' component={RecentSearch} />
        {/* <Route exact path='/notfound' component={NotFound} />
          <Redirect to='/notfound' /> */}
      </Switch>
    </BrowserRouter>
  );
}
