import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.scss';
import './i18';

import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import store from './application/redux/store/store';
import globalTheme from './application/themes/GlobalTheme';
import { ThemeProvider } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <ThemeProvider theme={globalTheme}>
            <BrowserRouter>
                <Provider store={store}>
                    <App />
                </Provider>
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>
);

reportWebVitals();
