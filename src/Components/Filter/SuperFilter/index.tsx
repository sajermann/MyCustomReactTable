import { useState } from 'react';
import { Button } from '~/Components/Button';
import { Modal } from '~/Components/Modal';
import { SelectNew } from '~/Components/SelectNew';
import { useTranslation } from '~/Hooks/UseTranslation';

export function SuperFilter() {
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [optionColumnSelected, setOptionColumnSelected] = useState('id');
	const [optionTypeSelected, setOptionTypeSelected] = useState('equals');
	const { translate } = useTranslation();

	const optionsColumns = [
		{ value: 'id', label: translate('ID') },
		{ value: 'name', label: translate('NAME') },
		{ value: 'role', label: translate('ROLE') },
	];

	const optionsType = [
		{ value: 'equals', label: translate('EQUAL') },
		{ value: 'bigger', label: translate('BIGGER_THAN') },
		{ value: 'smaller', label: translate('SMALLER_THAN') },
		{ value: 'different', label: translate('DIFERENT') },
	];

	return (
		<>
			<Button onClick={() => setIsOpenModal(true)}>
				{translate('SUPER_FILTER')}
			</Button>

			<Modal
				title={translate('CONFIGURE_SUPER_FILTER')}
				width="70%"
				isOpen={isOpenModal}
				onClose={() => setIsOpenModal(false)}
				closeButton
			>
				<SelectNew
					isClearable
					options={optionsColumns}
					value={
						optionsColumns.find(item => item.value === optionColumnSelected)
							?.value
					}
					onChange={e => setOptionColumnSelected(e.target.value)}
					id="select_type"
					placeholder={translate('FILTER_TYPE')}
				/>

				<SelectNew
					isClearable
					options={optionsType}
					value={
						optionsType.find(item => item.value === optionTypeSelected)?.value
					}
					onChange={e => setOptionTypeSelected(e.target.value)}
					id="select_type"
					placeholder={translate('FILTER_TYPE')}
				/>

				{JSON.stringify({ optionColumnSelected, optionTypeSelected }, null, 2)}
			</Modal>
		</>
	);
}
