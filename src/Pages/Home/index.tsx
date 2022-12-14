import { useNavigate } from 'react-router-dom';
import { Footer } from '~/Components/Footer';
import { useTranslation } from '../../Hooks/UseTranslation';
import { Button } from '../../Components/Button';

export default function Home() {
	const { translate } = useTranslation();

	const navigate = useNavigate();

	const LIST_OPTIONS = [
		{
			translate: 'EXPAND_LINE',
			url: '/expanded-line',
		},
		{
			translate: 'SELECTION',
			url: '/selection',
		},
		{
			translate: 'LOADING',
			url: '/loading',
		},
		{
			translate: 'SORT',
			url: '/sort',
		},
		{
			translate: 'FILTER',
			url: '/filter',
		},
		{
			translate: 'EDITABLE',
			url: '/editable',
		},
		{
			translate: 'FULL_EDITABLE',
			url: '/full-editable',
		},
		{
			translate: 'VIRTUALIZED',
			url: '/virtualized',
		},
		{
			translate: 'PAGINATION',
			url: '/pagination',
		},
		{
			translate: 'FAVORITES',
			url: '/favorites',
		},
	];

	return (
		<>
			<div className="p-4 max-w-7xl m-auto flex flex-col items-center justify-center gap-2">
				<h1 className="text-lg font-bold">
					{translate('WELCOME_TO_CUSTOM_TABLE')}
				</h1>
				<div className="flex gap-4 flex-wrap items-center justify-center">
					{LIST_OPTIONS.map(item => (
						<Button key={item.url} onClick={() => navigate(item.url)}>
							{translate(item.translate)}
						</Button>
					))}
				</div>
			</div>
			<Footer />
		</>
	);
}
