import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { formatDate } from '@sajermann/utils/FormatDate';
import { Button } from '@sajermann/ui-react';
import { FloppyDiskBack, Pen, XCircle } from 'phosphor-react';
import { Table } from '../../Components/Table';
import { useTranslation } from '../../Hooks/UseTranslation';
import { TPerson } from '../../Types/TPerson';
import { makeData } from '../../Utils/MakeData';
import { Icons } from '../../Components/Icons';
import { Input } from '../../Components/Input';
import { Datepicker } from '../../Components/Datepicker';
import { Select } from '../../Components/Select';
import { ROLES } from '../../Constants/Roles';
import { Checkbox } from '../../Components/Checkbox';

export default function Editable() {
	const { translate } = useTranslation();
	const [data, setData] = useState<TPerson[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [updateLine, setUpdateLine] = useState<null | {
		row: number;
		data: TPerson;
	}>(null);

	function handleInput(e: ChangeEvent<HTMLInputElement>) {
		const { id, value } = e.target;
		if (!updateLine) return;
		setUpdateLine(prev => {
			if (!prev) return null;
			return { ...prev, data: { ...prev?.data, [id]: value } };
		});
	}

	function onChangeSelect(e: { id: number; name: string }) {
		const newRole = e.name as 'Admin' | 'User' | 'Dev';
		setUpdateLine(prev => {
			if (!prev) return null;
			return {
				...prev,
				data: { ...prev?.data, role: newRole },
			};
		});
	}

	function handleSave() {
		if (!updateLine) return;
		const newData = [...data];
		newData[updateLine.row] = { ...updateLine.data };
		setData([...newData]);
		setUpdateLine(null);
	}

	const columns = useMemo<ColumnDef<TPerson>[]>(
		() => [
			{
				accessorKey: 'id_action',
				header: translate('ACTIONS'),
				minSize: 80,
				size: 80,
				align: 'center',
				cell: info => (
					<div className="w-full flex items-center justify-center">
						<Button
							style={{ minWidth: '50px', height: '50px', borderRadius: '50%' }}
							disabled={isLoading}
							colorStyle="Primary"
							variant="Outlined"
							type="button"
							onClick={() =>
								setUpdateLine({
									row: info.row.index,
									data: { ...info.row.original },
								})
							}
							endIcon={<Pen size={30} />}
						/>
					</div>
				),
				cellEdit: () => (
					<div className="w-full flex items-center justify-center gap-2">
						<Button
							style={{ minWidth: '50px', height: '50px', borderRadius: '50%' }}
							disabled={isLoading}
							colorStyle="Success"
							variant="Outlined"
							type="button"
							onClick={handleSave}
							endIcon={<FloppyDiskBack size={30} />}
						/>
						<Button
							style={{ minWidth: '50px', height: '50px', borderRadius: '50%' }}
							disabled={isLoading}
							colorStyle="Secondary"
							variant="Outlined"
							type="button"
							onClick={() => setUpdateLine(null)}
							endIcon={<XCircle size={30} />}
						/>
					</div>
				),
			},
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
				cellEdit: () => (
					<Input
						type="text"
						id="name"
						onChange={handleInput}
						value={updateLine?.data.name}
					/>
				),
			},
			{
				accessorKey: 'lastName',
				header: translate('LAST_NAME'),
				minSize: 100,
				size: 100,
				align: 'center',
				cellEdit: () => (
					<Input
						type="text"
						id="lastName"
						onChange={handleInput}
						value={updateLine?.data.lastName}
					/>
				),
			},
			{
				accessorKey: 'birthday',
				header: translate('BIRTHDAY'),
				minSize: 100,
				size: 100,
				cell: info => (
					<div>{formatDate(new Date(info.getValue() as string))}</div>
				),
				align: 'center',
				cellEdit: () => (
					<Datepicker
						id="birthday"
						name="birthday"
						customDefaultValue={new Date(updateLine?.data.birthday || '')}
						onChange={handleInput}
					/>
				),
			},
			{
				accessorKey: 'email',
				header: 'Email',
				minSize: 100,
				size: 100,
				align: 'center',
				cellEdit: () => (
					<Input
						type="text"
						id="email"
						onChange={handleInput}
						value={updateLine?.data.email}
					/>
				),
			},
			{
				accessorKey: 'role',
				header: 'Role',
				minSize: 100,
				size: 100,
				align: 'center',
				cellEdit: () => (
					<Select
						defaultValue={ROLES.find(
							item => item.name === updateLine?.data.role
						)}
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
				cell: ({ row }) =>
					row.original.isActive ? (
						<div className="flex items-center justify-center w-full h-6 text-green-500">
							<Icons.Checked />
						</div>
					) : (
						<div className="flex items-center justify-center w-full h-9 text-red-500">
							<Icons.Error />
						</div>
					),
				cellEdit: () => (
					<div className="w-full flex items-center justify-center">
						<Checkbox
							defaultChecked={updateLine?.data.isActive}
							id="isActive"
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
			<h1>{translate('EXPAND_LINE_MODE')}</h1>
			{JSON.stringify(updateLine, null, 2)}
			<div>
				<Table
					isLoading={isLoading}
					columns={[...columns]}
					data={data}
					rowForUpdate={updateLine}
				/>
			</div>
		</div>
	);
}
