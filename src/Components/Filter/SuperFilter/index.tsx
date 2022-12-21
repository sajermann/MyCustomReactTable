import { useState } from 'react';
import { Button } from '~/Components/Button';
import { Input } from '~/Components/Input';
import { Modal } from '~/Components/Modal';
import { SelectNew } from '~/Components/SelectNew';
import { useTranslation } from '~/Hooks/UseTranslation';
import { generateGuid } from '@sajermann/utils/Random';

type FilterActive = {
	id: string;
	column: string;
	type: string;
	value: string;
};

export function SuperFilter() {
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [optionColumnSelected, setOptionColumnSelected] = useState('id');
	const [optionTypeSelected, setOptionTypeSelected] = useState('equals');
	const [valueSelected, setValueSelected] = useState('');
	const [activeFilters, setActiveFilters] = useState<FilterActive[]>([]);
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
		{ value: 'different', label: translate('DIFFERENT') },
	];

	function handleAddFilter() {
		setActiveFilters(old => [
			...old,
			{
				id: generateGuid(),
				column: optionColumnSelected,
				type: optionTypeSelected,
				value: valueSelected,
			},
		]);
	}

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
				<div className="grid grid-cols-12 gap-4">
					<div className="col-span-6">
						<SelectNew
							label={translate('COLUMN')}
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
					</div>
					<div className="col-span-6">
						<SelectNew
							label={translate('TYPE_FILTER')}
							isClearable
							options={optionsType}
							value={
								optionsType.find(item => item.value === optionTypeSelected)
									?.value
							}
							onChange={e => setOptionTypeSelected(e.target.value)}
							id="select_type"
							placeholder={translate('FILTER_TYPE')}
						/>
					</div>
					<Input
						placeholder={translate('VALUE')}
						value={valueSelected}
						onChange={e => setValueSelected(e.target.value)}
					/>
				</div>

				<Button onClick={handleAddFilter}>Adicionar Filtro</Button>

				{JSON.stringify(
					{ optionColumnSelected, optionTypeSelected, activeFilters },
					null,
					2
				)}
			</Modal>
		</>
	);
}
