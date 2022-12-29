import ReactDOM from 'react-dom/client';
import Routes from '~/Components/Routes';
import { InjectorProviders } from './Components/InjectorProviders';

import './global.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<InjectorProviders>
		<Routes />
	</InjectorProviders>
);
