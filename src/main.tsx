import React from 'react';
import ReactDOM from 'react-dom/client';
import './Config/i18n';
import { BrowserRouter } from 'react-router-dom';

import './global.css';
import 'react-datepicker/dist/react-datepicker.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DarkModeProvider } from './Hooks/UseDarkMode';
import { TestProvider } from './Hooks/UseTest';
import Routes from './Pages/Routes';
import { Header } from './Components/Header';

ReactDOM.createRoot(document.getElementById('root')!).render(
	// <React.StrictMode>
	<BrowserRouter>
		<QueryClientProvider
			client={
				new QueryClient({
					defaultOptions: {
						queries: {
							refetchOnWindowFocus: false,
							retry: false,
						},
					},
				})
			}
		>
			<DarkModeProvider>
				<TestProvider>
					<Header />
					<Routes />
				</TestProvider>
			</DarkModeProvider>
		</QueryClientProvider>
	</BrowserRouter>
	// </React.StrictMode>
);
