import { Row } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { Table } from '../../Components/Table';
import { useTranslation } from '../../Hooks/UseTranslation';
import { TPerson } from '../../Types/TPerson';
import { makeData } from '../../Utils/MakeData';
import { Input } from '../../Components/Input';
import { useColumns } from '../../Hooks/UseColumns';

export default function Selection() {
	const { translate } = useTranslation();
	const [data, setData] = useState<TPerson[]>([]);
	const [selectedItems, setSelectedItems] = useState({});
	const [selectionType, setSelecitonType] = useState<'single' | 'multi'>(
		'single'
	);
	const [disableSelectionForId, setDisableSelectionForId] = useState('');
	const { columns } = useColumns();

	useEffect(() => {
		setData(makeData.person(5));
	}, []);

	function verifyForDisable(row: Row<TPerson>) {
		if (Number(row.original.id) > Number(disableSelectionForId)) {
			return true;
		}
		return false;
	}

	const OPTIONS_LIST = [
		{ id: 'multi', text: translate('MULTI') },
		{ id: 'single', text: translate('SINGLE') },
	];

	return (
		<div className="p-4">
			<h1>{translate('SELECTION_ROW_MODE')}</h1>

			<div>
				<div className="flex items-center gap-2">
					<label htmlFor="selectionType">{translate('SELECTION_TYPE')}</label>
					<select
						id="selectionType"
						data-testid="selectLanguage"
						className="bg-slate-600 rounded h-7 flex justify-between items-center text-white"
						onChange={e =>
							setSelecitonType(e.target.value as 'single' | 'multi')
						}
						defaultValue={selectionType}
					>
						{OPTIONS_LIST.map(item => (
							<option value={item.id} key={item.id}>
								{item.text}
							</option>
						))}
					</select>
					<div className="">
						<Input
							id="disableSelection"
							containerProps={{
								className: 'flex flex-row items-center',
							}}
							labelProps={{
								className: 'm-0 mr-2',
							}}
							label={translate('DISABLE_SELECTION_WHEN_ID_GREATER_THAN')}
							className="max-w-[60px]"
							value={disableSelectionForId}
							onChange={e => setDisableSelectionForId(e.target.value)}
						/>
					</div>
				</div>
				<Table
					columns={columns}
					data={data}
					selection={{
						rowSelection: selectedItems,
						setRowSelection: setSelectedItems,
						type: selectionType,
						disableSelectionRow:
							disableSelectionForId !== '' ? verifyForDisable : undefined,
					}}
				/>
				{translate('SELECTED_ROWS')}: {JSON.stringify(selectedItems, null, 2)}
			</div>
		</div>
	);
}
