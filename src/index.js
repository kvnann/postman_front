import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Login, Register, Account, News, NotFound, Search, User} from './pages';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'/feed',
    element:<App initialPage="feed"/>
  },
  {
    path:'/account',
    element:<App initialPage="account"/>
  },
  {
    path:'/news',
    element:<App initialPage="news"/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/register',
    element:<Register/>
  },
  {
    path:'/search',
    element:<Search/>
  },  
  {
    path:'/user',
    element:<User/>
  },
  {
    path:'*',
    element:<NotFound/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);