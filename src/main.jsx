// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx';
import {Provider} from 'react-redux'
import { HelmetProvider  } from 'react-helmet-async'
import store from './redux/store.js';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Provider store={store}>
    <HelmetProvider>
      <App />
    </HelmetProvider>
    </Provider>
  // </StrictMode>
)