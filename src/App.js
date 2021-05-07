import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/private_route/private_route';
import { UserContextProvider } from './context/user_context';
import Login from './pages/login/login';
import SignUp from './pages/signup/signup';
import NotFound from './pages/not_found/not_found';
import './styles/reset.scss';
import './App.scss';

import HomeCard from './components/home_card/home_card';

const animes = [
  {
    link: 'http://source.unsplash.com/nKO_1QyFh9o',
    name: 'anime1'
  },
  {
    link: 'http://source.unsplash.com/tq8Cuap8_wY',
    name: 'anime1'
  },
  {
    link: 'http://source.unsplash.com/rz3eCYGgGSc',
    name: 'anime1'
  },
  {
    link: 'http://source.unsplash.com/tq8Cuap8_wY',
    name: 'anime1'
  },
  {
    link: 'http://source.unsplash.com/rz3eCYGgGSc',
    name: 'anime1'
  },
  {
    link: 'http://source.unsplash.com/tq8Cuap8_wY',
    name: 'anime1'
  },
  {
    link: 'http://source.unsplash.com/rz3eCYGgGSc',
    name: 'anime1'
  },
  {
    link: 'http://source.unsplash.com/rz3eCYGgGSc',
    name: 'anime1'
  }
];

export default function App() {
  return (
    <div className='contain'>
      <div className='sidebar'>SideBar</div>
      <div className='main'>
        <HomeCard list={animes} name='Recent' />
      </div>
      <div className='main'>
        <HomeCard list={animes} name='Seasonal Anime' />
      </div>
    </div>
    // <BrowserRouter>
    //   <Switch>
    //     <UserContextProvider>
    //       <h1>hello</h1>
    //     </UserContextProvider>
    //   </Switch>
    // </BrowserRouter>
  );
}
