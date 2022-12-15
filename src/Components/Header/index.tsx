import { Link, useLocation } from 'react-router-dom';
import { useRoutesConfig } from '~/Hooks/UseRoutesConfig';
import { SelectLanguage } from '../SelectLanguage';

export function Header() {
	const { ROUTES } = useRoutesConfig();
	const { pathname } = useLocation();

	return (
		<header className="bg-slate-900 flex justify-between items-center p-4	text-white">
			<Link to="/">My Custom Table</Link>
			{ROUTES.find(item => item.path === pathname)?.title}
			<SelectLanguage />
		</header>
	);
}
