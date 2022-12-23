import { useEffect, useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Table } from '../../Components/Table';
import { useTranslation } from '../../Hooks/UseTranslation';
import { TPerson } from '../../Types/TPerson';
import { makeData } from '../../Utils/MakeData';
import { useColumns } from '../../Hooks/UseColumns';

export default function Resizing() {
	const { translate } = useTranslation();
	const [data, setData] = useState<TPerson[]>([]);
	const [columnSize, setColumnSize] = useState({});

	const { columns } = useColumns();

	const columns2 = useMemo<ColumnDef<TPerson>[]>(
		() => [
			{
				accessorKey: 'friends',
				accessorFn: e => e.friends.map(item => item.name).join(' | '),
				header: translate('FRIENDS'),
				minSize: 50,
				size: 50,
				align: 'left',
				cell: info => info.getValue(),
				onResizing: console.log,
			},
		],
		[translate]
	);

	useEffect(() => {
		setData(makeData.person(5));
	}, []);

	function saveSize(dataColumn: object) {
		// setColumnSize(dataColumn.columnSizing);
	}

	return (
		<div className="p-4">
			{translate('DISPLAY_TITLE_ONLY_HOVER_ON_ELLIPSIS')}
			<Table
				columns={[...columns2, ...columns]}
				data={data}
				onResizing={saveSize}
			/>
			<pre>{JSON.stringify(columnSize, null, 2)}</pre>
		</div>
	);
}
