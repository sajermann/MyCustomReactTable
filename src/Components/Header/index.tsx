import { Link } from 'react-router-dom';
import { SelectLanguage } from '../SelectLanguage';

export function Header() {
	return (
		<header className="bg-slate-900 flex justify-between items-center p-4	text-white">
			<Link to="/">My Custom Table</Link>
			<SelectLanguage />
		</header>
	);
}
