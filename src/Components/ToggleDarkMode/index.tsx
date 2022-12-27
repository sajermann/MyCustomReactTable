import { useDarkMode } from '../../Hooks/UseDarkMode';
import { Switch } from '../Switch';

function Container({ children }: { children: React.ReactNode }) {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100%',
				fontSize: 18,
				borderRadius: '50%',
			}}
		>
			{children}
		</div>
	);
}

export function ToggleDarkMode() {
	const { darkMode, toggleDarkMode } = useDarkMode();
	return (
		<Switch
			checked={darkMode}
			onChange={toggleDarkMode}
			uncheckedHandleIcon={<Container>🌞</Container>}
			checkedHandleIcon={<Container>🌜</Container>}
		/>
	);
}
