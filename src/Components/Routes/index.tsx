import { Route, Routes } from 'react-router-dom';
import { useRoutesConfig } from '~/Hooks/UseRoutesConfig';

export default function RoutesConfig() {
	const { ROUTES } = useRoutesConfig();

	return (
		<Routes>
			{ROUTES.map(route => (
				<Route key={route.path} path={route.path} element={route.element} />
			))}
		</Routes>
	);
}
