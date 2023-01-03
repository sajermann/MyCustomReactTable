import { useState } from 'react';

import { useTranslation } from '~/Hooks/UseTranslation';
import { Select } from '~/Components/Select';
import { Icons } from '../Icons';

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

	const LANGUAGES_LIST = [
		{
			value: 'en',
			label: (
				<div className="flex gap-2 items-center justify-between">
					<div>EN</div>
					<div className="w-7">
						<Icons.Eua />
					</div>
				</div>
			),
		},
		{
			value: 'pt-BR',
			label: (
				<div className="flex gap-2 items-center justify-between">
					<div>PT-BR</div>
					<div className="w-7">
						<Icons.Brazil />
					</div>
				</div>
			),
		},
	];

	return (
		<div className="w-36">
			<Select
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
