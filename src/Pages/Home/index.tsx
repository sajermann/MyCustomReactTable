import { ColumnDef } from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';
import { formatDate } from '@sajermann/utils/FormatDate';
import { Table } from '../../Components/Table';
import { useTranslation } from '../../Hooks/UseTranslation';
import { TPerson } from '../../Types/TPerson';
import { makeData } from '../../Utils/MakeData';
import { UpdateRowExpanded } from '../../Components/UpdateRowExpanded';
import { Icons } from '../../Components/Icons';

export default function Home() {
	const { translate } = useTranslation();
	const [data, setData] = useState<TPerson[]>([]);

	useEffect(() => {
		setData(makeData.person(5));
	}, []);

	function handleSaveUpdate(row: any, dataUpdate: any) {
		console.log('Salvando', { dataUpdate }, row.index);
		row.getToggleExpandedHandler()();
	}

	const columns = useMemo<ColumnDef<TPerson>[]>(
		() => [
			{
				id: 'expander',
				header: 'Ações',
				size: 10,
				cell: ({ row }) => (
					<button
						type="button"
						onClick={row.getToggleExpandedHandler()}
						{...{
							style: { cursor: 'pointer' },
						}}
					>
						{row.getIsExpanded() ? '✏' : '📝'}
					</button>
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
					<div className="w-14 flex items-center justify-center">
						<img
							className="w-full rounded-full"
							src={getValue() as string}
							alt=""
						/>
					</div>
				),
			},
			{
				accessorKey: 'name',
				header: 'Nome',
				minSize: 100,
				size: 100,
				align: 'center',
			},
			{
				accessorKey: 'lastName',
				header: 'Sobrenome',
				minSize: 100,
				size: 100,
				align: 'center',
			},
			{
				accessorKey: 'birthday',
				header: 'Data Nascimento',
				minSize: 100,
				size: 100,
				cell: info => (
					<div>{formatDate(new Date(info.getValue() as string))}</div>
				),
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
				header: 'Ativo',
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
			},
		],
		[]
	);

	return (
		<div className="p-4">
			<h1>{translate('WELCOME_TO_VITE_BOILERPLATE')}</h1>

			<div>
				<Table
					columns={columns}
					data={data}
					expandLine={{
						render: row => (
							<UpdateRowExpanded row={row} onSave={handleSaveUpdate} />
						),
					}}
				/>
			</div>
		</div>
	);
}
