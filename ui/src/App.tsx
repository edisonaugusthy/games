import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.scss';
import IndexPage from './pages/index';

let router = createBrowserRouter([
  {
    path: '/',
    Component: IndexPage
  }
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
