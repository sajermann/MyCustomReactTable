/* eslint-disable react/button-has-type */
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';

import { Column, ColumnDef, RowData } from '@tanstack/react-table';
import { Table } from '../../Components/Table';
import { TPerson } from '../../Types/TPerson';
import { useTranslation } from '../../Hooks/UseTranslation';
import { makeData } from '../../Utils/MakeData';
import { Datepicker } from '../../Components/Datepicker';
import { Input } from '../../Components/Input';

declare module '@tanstack/react-table' {
	interface TableMeta<TData extends RowData> {
		updateData: (rowIndex: number, columnId: string, value: unknown) => void;
	}
}

// Give our default column cell renderer editing superpowers!
const defaultColumn: Partial<ColumnDef<TPerson>> = {
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

function Filter({ column, table }: { column: Column<any, any>; table: any }) {
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

export default function FullEditable() {
	const { translate } = useTranslation();
	const [data, setData] = useState<TPerson[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	function handleInput(e: ChangeEvent<HTMLInputElement>, indexRow: number) {
		const { id, value } = e.target;

		setData(old =>
			old.map((row, index) => {
				if (index === indexRow) {
					return {
						...old[indexRow]!,
						[id]: value,
					};
				}
				return row;
			})
		);
	}

	const columns = useMemo<ColumnDef<TPerson>[]>(
		() => [
			{
				accessorKey: 'id',
				header: 'ID',
				minSize: 100,
				size: 100,
				align: 'center',
			},
			{
				accessorKey: 'avatar',
				header: 'Avatar',
				minSize: 60,
				size: 60,
				align: 'left',
				cell: ({ getValue }) => (
					<div className="w-14 h-14 flex items-center justify-center">
						<img
							className="w-full rounded-full"
							src={getValue() as string}
							alt=""
						/>
					</div>
				),
				enableResizing: false,
				enableSorting: false,
				enableGlobalFilter: false,
			},
			{
				accessorKey: 'name',
				header: translate('NAME'),
				minSize: 100,
				size: 100,
				align: 'center',
				enableSorting: true,
				cell: info => (
					<Input
						type="text"
						id="name"
						onChange={e => handleInput(e, info.row.index)}
						value={info.getValue() as string}
					/>
				),
			},
			{
				accessorKey: 'lastName',
				header: translate('LAST_NAME'),
				minSize: 100,
				size: 100,
				align: 'center',
				cell: info => (
					<Input
						type="text"
						id="lastName"
						onChange={e => handleInput(e, info.row.index)}
						value={info.getValue() as string}
					/>
				),
			},
			{
				accessorKey: 'birthday',
				header: translate('BIRTHDAY'),
				minSize: 100,
				size: 100,
				align: 'center',
				cell: row => (
					<Datepicker
						id="birthday"
						name="birthday"
						// customDefaultValue={new Date(updateLine?.data.birthday || '')}
						onChange={e => handleInput(e, row.index)}
					/>
				),
			},
			{
				accessorKey: 'email',
				header: 'Email',
				minSize: 100,
				size: 100,
				align: 'center',
			},
			{
				accessorKey: 'role',
				header: 'Role',
				minSize: 100,
				size: 100,
				align: 'center',
			},
			{
				accessorKey: 'isActive',
				header: translate('ACTIVE'),
				minSize: 100,
				size: 100,
				align: 'center',
			},
		],
		[]
	);

	async function load() {
		setIsLoading(true);
		setData(makeData.person(2));
		setIsLoading(false);
	}

	useEffect(() => {
		load();
	}, []);

	return (
		<>
			<Table
				columns={columns}
				data={data}
				fullEditable={{ defaultColumn }}
				meta={{
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
				}}
				disabledVirtualization
			/>
			{JSON.stringify(data, null, 2)}
		</>
	);
}
