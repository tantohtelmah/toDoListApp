import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'
import './styles/index.css';
import 'react-calendar/dist/Calendar.css';



// Home link
const root = createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
