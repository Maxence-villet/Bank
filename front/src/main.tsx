import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createFlagster, FlagsterProvider } from "flagster-react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import './index.css';
import App from './App';
  
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FlagsterProvider
      flagster={createFlagster()}
      config={{
          environment: import.meta.env.VITE_KEY_FLAG,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster position="bottom-right" />
      </QueryClientProvider>
    </FlagsterProvider>
  </StrictMode>,
)