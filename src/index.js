import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ContextAPI from './ContextAPI';
import { ThemeProvider, createTheme } from '@material-ui/core';

const root = ReactDOM.createRoot(document.getElementById('root'));
const darkTheme = createTheme({
    palette: {
        primary: {
            main: '#fff'
        },
        type: 'dark'
    }
});

root.render(
    <ThemeProvider theme = {darkTheme}>
        <ContextAPI>
            <App />
        </ContextAPI>
    </ThemeProvider>
);
