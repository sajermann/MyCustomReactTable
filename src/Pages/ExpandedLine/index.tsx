import { useEffect, useState } from 'react';

import { Table } from '~/Components/Table';
import { TPerson } from '~/Types/TPerson';
import { makeData } from '~/Utils/MakeData';
import { UpdateRowExpanded } from '~/Components/UpdateRowExpanded';
import { useColumns } from '~/Hooks/UseColumns';

export default function ExpandedLine() {
	const [data, setData] = useState<TPerson[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const { columns } = useColumns();

	async function load() {
		setIsLoading(true);
		setData(makeData.person(5));
		setIsLoading(false);
	}

	useEffect(() => {
		load();
	}, []);

	function handleSaveUpdate(row: any, dataUpdate: TPerson) {
		const updateData = [...data];
		updateData[row.index] = { ...updateData[row.index], ...dataUpdate };
		setData([...updateData]);
		row.getToggleExpandedHandler()();
	}

	return (
		<div className="p-4">
			<Table
				isLoading={isLoading}
				columns={columns}
				data={data}
				expandLine={{
					render: row => (
						<UpdateRowExpanded row={row} onSave={handleSaveUpdate} />
					),
				}}
				disabledVirtualization
			/>
		</div>
	);
}
