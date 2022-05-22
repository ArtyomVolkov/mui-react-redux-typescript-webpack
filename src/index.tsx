import React from 'react';

import { createRoot } from 'react-dom/client';

import App from '@components/app-entry';

createRoot(document.getElementById('client-app')).render(<App />);
