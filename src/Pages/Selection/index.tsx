import { Row } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

import { Table } from '~/Components/Table';
import { useTranslation } from '~/Hooks/UseTranslation';
import { TPerson } from '~/Types/TPerson';
import { makeData } from '~/Utils/MakeData';
import { Input } from '~/Components/Input';
import { useColumns } from '~/Hooks/UseColumns';
import { Select } from '~/Components/Select';

export default function Selection() {
	const { translate } = useTranslation();
	const [data, setData] = useState<TPerson[]>([]);
	const [selectedItems, setSelectedItems] = useState({});
	const [selectionType, setSelecitonType] = useState<'single' | 'multi'>(
		'single'
	);
	const [disableSelectionForId, setDisableSelectionForId] = useState('');
	const [globalFilter, setGlobalFilter] = useState('');
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
		{ value: 'multi', label: translate('MULTI') },
		{ value: 'single', label: translate('SINGLE') },
	];

	return (
		<div className="p-4 flex flex-col gap-2">
			<div className="grid grid-cols-12 gap-2">
				<div className="col-span-5">
					<Input
						value={globalFilter ?? ''}
						onChange={e => setGlobalFilter(e.target.value)}
						placeholder={translate('SEARCH_ALL_COLUMNS...')}
						type="search"
					/>
				</div>
				<div className="col-span-3">
					<div className="flex items-center gap-2">
						<div className="whitespace-nowrap ">
							{translate('SELECTION_TYPE')}
						</div>
						<Select
							isSearchable={false}
							menuPosition="fixed"
							menuPortalTarget={document.body}
							defaultValue={
								OPTIONS_LIST.find(item => item.value === selectionType)?.value
							}
							options={OPTIONS_LIST}
							onChange={e =>
								setSelecitonType(e.target.value as 'single' | 'multi')
							}
						/>
					</div>
				</div>
				<div className="col-span-4">
					<Input
						placeholder="Id"
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
				globalFilter={{
					filter: globalFilter,
					setFilter: setGlobalFilter,
				}}
			/>
			{translate('SELECTED_ROWS')}: {JSON.stringify(selectedItems, null, 2)}
		</div>
	);
}
