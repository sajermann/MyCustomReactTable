import { useState } from 'react';
import { useTranslation } from '../../Hooks/UseTranslation';
import { SelectNew } from '../SelectNew';

const LANGUAGES_LIST = [
	{ value: 'en', label: 'EN' },
	{ value: 'pt-BR', label: 'PT-BR' },
];

export function SelectLanguage() {
	const { changeLanguage, currentLanguage } = useTranslation();
	const [language, setLanguage] = useState(currentLanguage);

	function handleChangeLanguage(e: {
		target: {
			id?: string;
			value: string;
		};
	}) {
		const { value } = e.target;
		setLanguage(value);
		changeLanguage(value);
	}

	return (
		<div className="w-36">
			<SelectNew
				menuPosition="fixed"
				menuPortalTarget={document.body}
				isSearchable={false}
				value={LANGUAGES_LIST.find(item => item.value === language)?.value}
				options={LANGUAGES_LIST}
				onChange={handleChangeLanguage}
			/>
		</div>
	);
}
