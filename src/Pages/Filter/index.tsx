import { useEffect, useMemo, useState } from 'react';
import { Column, ColumnDef } from '@tanstack/react-table';
import { SelectNew } from '~/Components/SelectNew';
import { Table } from '../../Components/Table';
import { useTranslation } from '../../Hooks/UseTranslation';
import { TPerson } from '../../Types/TPerson';
import { makeData } from '../../Utils/MakeData';
import { useColumns } from '../../Hooks/UseColumns';
import { DebouncedInput } from '../../Components/DebouncedInput';

function FilterCustom({
	column,
	table,
}: {
	column: Column<any, any>;
	table: any;
}) {
	const firstValue = table
		.getPreFilteredRowModel()
		.flatRows[0]?.getValue(column.id);

	const columnFilterValue = column.getFilterValue();
	console.log({ columnFilterValue });

	// column.setFilterValue(['t', 'rr']);

	return typeof firstValue === 'number' ? (
		<div className="flex space-x-2">
			<input
				type="number"
				value={(columnFilterValue as [number, number])?.[0] ?? ''}
				onChange={e =>
					column.setFilterValue((old: [number, number]) => [
						e.target.value,
						old?.[1],
					])
				}
				placeholder="Min"
				className="w-24 border shadow rounded"
			/>
			<input
				type="number"
				value={(columnFilterValue as [number, number])?.[1] ?? ''}
				onChange={e =>
					column.setFilterValue((old: [number, number]) => [
						old?.[0],
						e.target.value,
					])
				}
				placeholder="Max"
				className="w-24 border shadow rounded"
			/>
		</div>
	) : (
		<input
			type="text"
			value={(columnFilterValue ?? '') as string}
			onChange={e => column.setFilterValue(e.target.value)}
			placeholder="Search..."
			className="w-36 border shadow rounded"
		/>
	);
}

export default function Filter() {
	const { translate } = useTranslation();
	const [data, setData] = useState<TPerson[]>([]);
	const [globalFilter, setGlobalFilter] = useState('');

	function getNames() {
		return data.map(item => ({ value: item.name, label: item.name }));
	}

	const { columns } = useColumns();

	const columns2 = useMemo<ColumnDef<TPerson>[]>(
		() => [
			columns[0],
			columns[1],
			{
				accessorKey: 'name',
				header: translate('NAME'),
				minSize: 100,
				size: 100,
				align: 'center',
				enableSorting: true,
				filterElement: (column: Column<any, any>, table: any) => (
					<SelectNew
						options={getNames()}
						isMulti={{
							onChange: e => {
								column.setFilterValue(e.target.value);
							},
						}}
						id="role"
					/>
				),
				filterFn: (row, columnId, valueFilter) => {
					if (
						valueFilter.length === 0 ||
						valueFilter.includes(row.getValue(columnId))
					) {
						return true;
					}
					return false;
				},
			},
			columns[3],
			columns[4],
			columns[5],
			columns[6],
			{
				accessorKey: 'friends',
				accessorFn: e => e.friends.map(item => item.name).join(' | '),
				header: translate('FRIENDS'),
				minSize: 100,
				size: 200,
				align: 'left',
				cell: info => info.getValue(),
				enableGlobalFilter: false,
			},
		],
		[translate]
	);

	useEffect(() => {
		setData(makeData.person(5));
	}, []);

	console.log({ data });

	return (
		<div className="p-4 flex flex-col gap-4">
			<strong>{translate('UNDER_CONSTRUCTION')}</strong>
			<DebouncedInput
				value={globalFilter ?? ''}
				onChange={value => setGlobalFilter(String(value))}
				className="p-2 font-lg shadow border border-block"
				placeholder="Search all columns..."
			/>
			<Table
				columns={[...columns2]}
				data={data}
				globalFilter={{
					filter: globalFilter,
					setFilter: setGlobalFilter,
				}}
			/>
		</div>
	);
}
