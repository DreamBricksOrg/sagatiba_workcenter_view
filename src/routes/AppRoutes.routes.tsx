import React from 'react';
import App from '@/App';
import { useApp } from '@/context/AppContext';
import Login from '@/pages/login/Login';

const AppRoutes: React.FC = () => {
  const { user } = useApp();

  if (user) return <App />;

  return <Login />;
};

export default AppRoutes;
