import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from '@/components/ui/provider';
import AppRoutes from './routes/AppRoutes.routes.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <AppRoutes />
    </Provider>
  </StrictMode>
);
