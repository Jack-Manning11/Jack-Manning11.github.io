import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { PatinaProvider } from './system/patina';

// Typefaces (self-hosted): Space Grotesk (display), Newsreader (body), Space Mono (data).
import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/newsreader';
import '@fontsource/space-mono/400.css';
import '@fontsource/space-mono/700.css';

import './styles/tokens.css';
import './styles/base.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <PatinaProvider>
        <App />
      </PatinaProvider>
    </BrowserRouter>
  </StrictMode>,
);
