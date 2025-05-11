import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.scss';
import GamePage from './pages/Games';

let router = createBrowserRouter([
  {
    path: '/',
    Component: GamePage
  }
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
