import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { DarkModeProvider } from '~/Hooks/UseDarkMode';
import { TestProvider } from '~/Hooks/UseTest';
import { Header } from '../Header';
import '~/Config/i18n';
import 'react-datepicker/dist/react-datepicker.css';

export function InjectorProviders({ children }: { children: React.ReactNode }) {
	return (
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
						{children}
					</TestProvider>
				</DarkModeProvider>
			</QueryClientProvider>
		</BrowserRouter>
	);
}
