import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Routes from './Pages/Routes';
import { Header } from './Components/Header';
import { DarkModeProvider } from './Hooks/UseDarkMode';
import { TestProvider } from './Hooks/UseTest';
import '@sajermann/ui-react/index.css';

function App() {
	return (
		<BrowserRouter>
			<QueryClientProvider
				client={
					new QueryClient({
						defaultOptions: {
							queries: {
								refetchOnWindowFocus: false,
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
	);
}

export default App;
