import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Table } from '../../Components/Table';
import { useTranslation } from '../../Hooks/UseTranslation';
import { TPerson } from '../../Types/TPerson';
import { makeData } from '../../Utils/MakeData';
import { Input } from '../../Components/Input';
import { Select } from '../../Components/Select';
import { ROLES } from '../../Constants/Roles';
import { Checkbox } from '../../Components/Checkbox';

export default function FullEditable() {
	const { translate } = useTranslation();
	const [data, setData] = useState<TPerson[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const onBlur = (
		e: ChangeEvent<HTMLInputElement>,
		rowIndex: number,
		table: any
	) => {
		const { id, value } = e.target;
		table.options.meta?.updateData(rowIndex, id, value);
	};

	function updateData(rowIndex, columnId, value) {
		console.log(rowIndex, columnId, value);
		// Skip age index reset until after next rerender
		// skipAutoResetPageIndex()
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
	}

	function handleInput(e: ChangeEvent<HTMLInputElement>, rowIndex: number) {
		const { id, value } = e.target;
		setData(old =>
			old.map((row, index) => {
				if (index === rowIndex) {
					return {
						...old[rowIndex]!,
						[id]: value,
					};
				}
				return row;
			})
		);
	}

	function onChangeSelect(e: { id: number; name: string }) {
		const newRole = e.name as 'Admin' | 'User' | 'Dev';
		// setUpdateLine(prev => {
		// 	if (!prev) return null;
		// 	return {
		// 		...prev,
		// 		data: { ...prev?.data, role: newRole },
		// 	};
		// });
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
					<>
						{console.log(info)}
						<Input
							type="text"
							id="name"
							onBlur={e => onBlur(e, info.row.index, info.table)}
							defaultValue={info.getValue() as string}
						/>
					</>
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
				// cell: info => (
				// 	<Datepicker
				// 		id="birthday"
				// 		name="birthday"
				// 		customDefaultValue={new Date(updateLine?.data.birthday || '')}
				// 		onChange={handleInput}
				// 		value={info.getValue() as string}
				// 	/>
				// ),
			},
			{
				accessorKey: 'email',
				header: 'Email',
				minSize: 100,
				size: 100,
				align: 'center',
				cell: info => (
					<Input
						type="text"
						id="email"
						onChange={e => handleInput(e, info.row.index)}
						value={info.getValue() as string}
					/>
				),
			},
			{
				accessorKey: 'role',
				header: 'Role',
				minSize: 100,
				size: 100,
				align: 'center',
				cell: info => (
					<Select
						defaultValue={ROLES.find(item => item.name === info.getValue())}
						items={ROLES}
						textProp="name"
						onChange={onChangeSelect}
						id="role"
					/>
				),
			},
			{
				accessorKey: 'isActive',
				header: translate('ACTIVE'),
				minSize: 100,
				size: 100,
				align: 'center',
				cell: info => (
					<div className="w-full flex items-center justify-center">
						<Checkbox
							defaultChecked={info.getValue() as boolean}
							id="isActive"
							containerProps={{ className: 'flex items-center' }}
							onCheckedChange={e =>
								handleInput(e as ChangeEvent<HTMLInputElement>)
							}
						/>
					</div>
				),
			},
		],
		[translate]
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
			<div>
				<Table
					isLoading={isLoading}
					columns={[...columns]}
					data={data}
					meta={{
						updateData,
					}}
				/>
			</div>
		</div>
	);
}
