/* eslint-disable react/button-has-type */
import React from 'react';

import './index.css';

import {
	Column,
	Table,
	ColumnDef,
	useReactTable,
	getCoreRowModel,
	getFilteredRowModel,
	flexRender,
	RowData,
} from '@tanstack/react-table';
import { makeData, Person } from './makeData';

declare module '@tanstack/react-table' {
	interface TableMeta<TData extends RowData> {
		updateData: (rowIndex: number, columnId: string, value: unknown) => void;
	}
}

// Give our default column cell renderer editing superpowers!
const defaultColumn: Partial<ColumnDef<Person>> = {
	cell: ({ getValue, row: { index }, column: { id }, table }) => {
		const initialValue = getValue();
		// We need to keep and update the state of the cell normally
		const [value, setValue] = React.useState(initialValue);

		// When the input is blurred, we'll call our table meta's updateData function
		const onBlur = () => {
			table.options.meta?.updateData(index, id, value);
		};

		// If the initialValue is changed external, sync it up with our state
		React.useEffect(() => {
			setValue(initialValue);
		}, [initialValue]);

		return (
			<input
				value={value as string}
				onChange={e => setValue(e.target.value)}
				onBlur={onBlur}
			/>
		);
	},
};

function Filter({
	column,
	table,
}: {
	column: Column<any, any>;
	table: Table<any>;
}) {
	const firstValue = table
		.getPreFilteredRowModel()
		.flatRows[0]?.getValue(column.id);

	const columnFilterValue = column.getFilterValue();

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

export function EditableClear() {
	const rerender = React.useReducer(() => ({}), {})[1];

	const columns = React.useMemo<ColumnDef<Person>[]>(
		() => [
			{
				accessorKey: 'firstName',
				footer: (props: any) => props.column.id,
			},
			{
				accessorFn: row => row.lastName,
				id: 'lastName',
				header: () => <span>Last Name</span>,
				footer: (props: any) => props.column.id,
			},
			{
				accessorKey: 'age',
				header: () => 'Age',
				footer: (props: any) => props.column.id,
			},
			{
				accessorKey: 'visits',
				header: () => <span>Visits</span>,
				footer: (props: any) => props.column.id,
			},
			{
				accessorKey: 'status',
				header: 'Status',
				footer: (props: any) => props.column.id,
			},
			{
				accessorKey: 'progress',
				header: 'Profile Progress',
				footer: (props: any) => props.column.id,
			},
		],
		[]
	);

	const [data, setData] = React.useState(() => makeData(10));
	const refreshData = () => setData(() => makeData(10));

	const table = useReactTable({
		data,
		columns,
		defaultColumn,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		// Provide our updateData function to our table meta
		meta: {
			updateData: (rowIndex, columnId, value) => {
				// Skip age index reset until after next rerender

				setData(old =>
					old.map((row, index) => {
						if (index === rowIndex) {
							return {
								...old[rowIndex]!,
								[columnId]: value,
							};
						}
						return row;
					})
				);
			},
		},
		debugTable: true,
	});

	return (
		<div className="p-2">
			<div className="h-2" />

			<table>
				<thead>
					{table.getHeaderGroups().map(headerGroup => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map(header => (
								<th key={header.id} colSpan={header.colSpan}>
									{header.isPlaceholder ? null : (
										<div>
											{flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
											{header.column.getCanFilter() ? (
												<div>
													<Filter column={header.column} table={table} />
												</div>
											) : null}
										</div>
									)}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map(row => (
						<tr key={row.id}>
							{row.getVisibleCells().map(cell => (
								<td key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			{JSON.stringify(data, null, 2)}
			<div className="h-2" />
			<div>{table.getRowModel().rows.length} Rows</div>
			<div>
				<button onClick={() => rerender()}>Force Rerender</button>
			</div>
			<div>
				<button onClick={() => refreshData()}>Refresh Data</button>
			</div>
		</div>
	);
}
