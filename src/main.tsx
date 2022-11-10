import React from 'react';
import ReactDOM from 'react-dom/client';
import './Config/i18n';
import App from './App';
import './global.css';
import 'react-datepicker/dist/react-datepicker.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
