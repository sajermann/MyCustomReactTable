import { ColumnDef } from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';
import { formatDate } from '@sajermann/utils/FormatDate';
import { Table } from '../../Components/Table';
import { useTranslation } from '../../Hooks/UseTranslation';
import { TPerson } from '../../Types/TPerson';
import { makeData } from '../../Utils/MakeData';
import { UpdateRowExpanded } from '../../Components/UpdateRowExpanded';
import { Icons } from '../../Components/Icons';

export default function ExpandedLine() {
	const { translate } = useTranslation();
	const [data, setData] = useState<TPerson[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	async function load() {
		setIsLoading(true);
		setData(makeData.person(5));
		setIsLoading(false);
	}

	useEffect(() => {
		load();
	}, []);

	function handleSaveUpdate(row: any, dataUpdate: any) {
		const updateData = [...data];
		updateData[row.index] = { ...updateData[row.index], ...dataUpdate };
		setData([...updateData]);
		row.getToggleExpandedHandler()();
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
				header: translate('NAME'),
				minSize: 100,
				size: 100,
				align: 'center',
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
			},
		],
		[translate]
	);

	return (
		<div className="p-4">
			<h1>{translate('EXPAND_LINE_MODE')}</h1>
			<div>
				<Table
					isLoading={isLoading}
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
