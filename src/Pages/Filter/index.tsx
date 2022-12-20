import { useEffect, useMemo, useState } from 'react';
import { Column, ColumnDef } from '@tanstack/react-table';
import { SelectNew } from '~/Components/SelectNew';
import { Modal } from '~/Components/Modal';
import { Input } from '~/Components/Input';
import { Button } from '~/Components/Button';
import { Popover } from '~/Components/Popover';
import { Icons } from '~/Components/Icons';
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

type Props = {
	column: Column<any, any>;
};
function FilterId({ column }: Props) {
	const { translate } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);
	const [selectType, setSelectType] = useState('');
	const [filterValue, setFilterValue] = useState('');
	const options = [
		{ value: 'equals', label: translate('EQUAL') },
		{ value: 'bigger', label: translate('BIGGER_THAN') },
		{ value: 'smaller', label: translate('SMALLER_THAN') },
	];
	return (
		<Popover
			isOpen={isOpen}
			onClose={() => setIsOpen(false)}
			trigger={
				<button
					className="w-5 h-4 flex items-center justify-center"
					type="button"
					onClick={() => setIsOpen(true)}
				>
					<Icons.Funnel />
				</button>
			}
		>
			<>
				<div className="flex flex-col gap-4">
					<div className="w-48">
						<SelectNew
							isClearable
							options={options}
							value={options.find(item => item.value === selectType)?.value}
							onChange={e => setSelectType(e.target.value)}
							id="select_type"
							placeholder={translate('FILTER_TYPE')}
						/>
					</div>
					<div className="w-48">
						<Input
							placeholder={translate('TYPE_VALUE_FOR_FILTER')}
							onChange={e => setFilterValue(e.target.value)}
							value={filterValue}
						/>
					</div>
				</div>

				<div className="w-full flex justify-center gap-4 mt-4">
					<Button
						style={{
							borderRadius: '50%',
							maxHeight: 50,
							maxWidth: 50,
							minWidth: 50,
							width: 50,
						}}
						type="button"
						onClick={() => {
							setSelectType('');
							setFilterValue('');
						}}
					>
						<div className="w-7 h-7">
							<Icons.Trash />
						</div>
					</Button>

					<Button
						style={{
							borderRadius: '50%',
							maxHeight: 50,
							maxWidth: 50,
							minWidth: 50,
							width: 50,
						}}
						type="button"
						onClick={() => {
							column.setFilterValue([selectType, filterValue]);
							setIsOpen(false);
						}}
					>
						<div className="w-7 h-7">
							<Icons.Save />
						</div>
					</Button>
				</div>
			</>
		</Popover>
	);
}

type Props2 = {
	column: Column<any, any>;
	data: TPerson[];
};

function FilterName({ column, data }: Props2) {
	const { translate } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);
	const [filterValue, setFilterValue] = useState<string[]>([]);

	function getNames() {
		return data.map(item => ({ value: item.name, label: item.name }));
	}

	return (
		<Popover
			isOpen={isOpen}
			onClose={() => setIsOpen(false)}
			trigger={
				<button
					className="w-5 h-4 flex items-center justify-center"
					type="button"
					onClick={() => setIsOpen(true)}
				>
					<Icons.Funnel />
				</button>
			}
		>
			<>
				<SelectNew
					placeholder={translate('FILTER_NAMES')}
					menuPosition="fixed"
					menuPortalTarget={document.body}
					options={getNames()}
					isMulti={{
						onChange: e => {
							console.log(e.target.value);
							setFilterValue(e.target.value);
						},
						value: filterValue,
					}}
					id="filter_names"
				/>

				<div className="w-full flex justify-center gap-4 mt-4">
					<Button
						style={{
							borderRadius: '50%',
							maxHeight: 50,
							maxWidth: 50,
							minWidth: 50,
							width: 50,
						}}
						type="button"
						onClick={() => {
							setFilterValue([]);
						}}
					>
						<div className="w-7 h-7">
							<Icons.Trash />
						</div>
					</Button>

					<Button
						style={{
							borderRadius: '50%',
							maxHeight: 50,
							maxWidth: 50,
							minWidth: 50,
							width: 50,
						}}
						type="button"
						onClick={() => {
							column.setFilterValue(filterValue);
							setIsOpen(false);
						}}
					>
						<div className="w-7 h-7">
							<Icons.Save />
						</div>
					</Button>
				</div>
			</>
		</Popover>
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
			{
				accessorKey: 'id',
				header: 'ID',
				minSize: 100,
				size: 100,
				align: 'center',
				filterElement: (column: Column<any, any>, table: any) => (
					<FilterId column={column} />
				),
				filterFn: (row, columnId, valueFilter) => {
					console.log(row, columnId, valueFilter);
					if (valueFilter[0] === '' && valueFilter[1] === '') {
						return true;
					}
					if (valueFilter[0] === 'smaller') {
						if (Number(row.getValue(columnId)) < Number(valueFilter[1])) {
							return true;
						}
					}
					if (valueFilter[0] === 'bigger') {
						if (Number(row.getValue(columnId)) > Number(valueFilter[1])) {
							return true;
						}
					}
					if (valueFilter[0] === 'equals') {
						if (Number(row.getValue(columnId)) === Number(valueFilter[1])) {
							return true;
						}
					}

					return false;
				},
			},
			columns[1],
			{
				accessorKey: 'name',
				header: translate('NAME'),
				minSize: 100,
				size: 100,
				align: 'center',
				enableSorting: true,
				filterElement: (column: Column<any, any>, table: any) => (
					// <SelectNew
					// 	menuPosition="fixed"
					// 	menuPortalTarget={document.body}
					// 	options={getNames()}
					// 	isMulti={{
					// 		onChange: e => {
					// 			column.setFilterValue(e.target.value);
					// 		},
					// 	}}
					// 	id="role"
					// />
					<FilterName column={column} data={data} />
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
