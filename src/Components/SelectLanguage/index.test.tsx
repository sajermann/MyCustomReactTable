/**
 * @vitest-environment jsdom
 */
import { fireEvent, render } from '@testing-library/react';
import { describe, expect } from 'vitest';
import { useTranslation } from '~/Hooks/UseTranslation';
import { SelectLanguage } from '.';
import '~/Config/i18n';

function Mock() {
	const { translate } = useTranslation();
	return (
		<>
			<span>{translate('WELCOME_TO_VITE_BOILERPLATE')}</span>
			<SelectLanguage />
		</>
	);
}

describe('Components/SelectLanguage', () => {
	test(`should change language`, async () => {
		const { getByTestId, debug, findByText } = render(<Mock />);
		const select = getByTestId('selectLanguage') as HTMLSelectElement;
		await fireEvent.change(select, { target: { value: 'pt-BR' } });
		expect(await findByText('Bem Vindo ao Vite')).not.toBeNull();
		await fireEvent.change(select, { target: { value: 'en' } });
		expect(await findByText('Welcome to Vite Boilerplate')).not.toBeNull();
		debug();
	});
});
