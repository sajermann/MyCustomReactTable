import { useEffect, useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Table } from '../../Components/Table';
import { useTranslation } from '../../Hooks/UseTranslation';
import { TPerson } from '../../Types/TPerson';
import { makeData } from '../../Utils/MakeData';
import { Input } from '../../Components/Input';
import { Datepicker } from '../../Components/Datepicker';

export default function FullEditable() {
	const { translate } = useTranslation();
	const [data, setData] = useState<TPerson[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	function updateData(rowIndex: number, columnId: string, value: string) {
		setData(old =>
			old.map((row, index) => {
				if (index === rowIndex) {
					return {
						...old[rowIndex],
						[columnId]: value,
					};
				}
				return row;
			})
		);
	}

	const defaultColumn: Partial<ColumnDef<TPerson>> = {
		cell: ({ getValue, row: { index }, column: { id }, table }) => {
			const initialValue = getValue();
			// We need to keep and update the state of the cell normally
			const [value, setValue] = useState(initialValue);

			// When the input is blurred, we'll call our table meta's updateData function
			const onBlur = () => {
				console.log(index, id, value);
				// @ts-expect-error dsafgf
				table.options.meta?.updateData(index, id, value);
			};

			// If the initialValue is changed external, sync it up with our state
			useEffect(() => {
				setValue(initialValue);
			}, [initialValue]);

			return (
				<Input
					value={value as string}
					onChange={e => setValue(e.target.value)}
					onBlur={onBlur}
					placeholder={id}
				/>
			);
		},
	};

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
			},
			{
				accessorKey: 'lastName',
				header: translate('LAST_NAME'),
				minSize: 100,
				size: 100,
				align: 'center',
			},
			{
				accessorKey: 'birthday',
				header: translate('BIRTHDAY'),
				minSize: 100,
				size: 100,
				align: 'center',
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
		<div className="p-4">
			<h1>{translate('FULL_EDITABLE_MODE')}</h1>
			{JSON.stringify(data, null, 2)}
			<div>
				<Table
					isLoading={isLoading}
					columns={[...columns]}
					data={data}
					defaultColumn={defaultColumn}
					meta={{
						updateData,
					}}
					disabledVirtualization
				/>
			</div>
		</div>
	);
}
