import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../Hooks/UseTranslation';
import { Button } from '../../Components/Button';

export default function Home() {
	const { translate } = useTranslation();

	const navigate = useNavigate();

	return (
		<div className="p-4 max-w-2xl m-auto flex flex-col items-center justify-center gap-2">
			<h1 className="text-lg font-bold">
				{translate('WELCOME_TO_CUSTOM_TABLE')}
			</h1>
			<div className="flex gap-4">
				<Button onClick={() => navigate('/expanded-line')}>
					{translate('EXPAND_LINE')}
				</Button>
				<Button onClick={() => navigate('/selection')}>
					{translate('SELECTION')}
				</Button>

				<Button onClick={() => navigate('/loading')}>
					{translate('LOADING')}
				</Button>
				<Button onClick={() => navigate('/sort')}>{translate('SORT')}</Button>
				<Button onClick={() => navigate('/filter')}>
					{translate('FILTER')}
				</Button>
			</div>
		</div>
	);
}
