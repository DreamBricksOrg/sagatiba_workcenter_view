import App from '@/App';
import { useApp } from '@/context/AppContext';
import Login from '@/pages/login/Login';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';

const AppRoutes: React.FC = () => {
  const { user } = useApp();

  return (
    <BrowserRouter>
      <Routes>
        {user ? (
          <Route
            index
            element={<App />}
          />
        ) : (
          <Route
            index
            element={<Login />}
          />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
