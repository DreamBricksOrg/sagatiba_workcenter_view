import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import AppRoutes from './routes/AppRoutes.routes.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider>
      <AppRoutes />
    </ChakraProvider>
  </StrictMode>
);
