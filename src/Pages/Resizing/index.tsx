import { useEffect, useMemo, useState } from 'react';
import {
	ColumnDef,
	ColumnSizingInfoState,
	ColumnSizingState,
} from '@tanstack/react-table';
import { formatDate } from '@sajermann/utils/FormatDate';
import { Icons } from '~/Components/Icons';
import { Table } from '../../Components/Table';
import { useTranslation } from '../../Hooks/UseTranslation';
import { TPerson } from '../../Types/TPerson';
import { makeData } from '../../Utils/MakeData';
import { useColumns } from '../../Hooks/UseColumns';

const DEFAULT = {
	id: 100,
	avatar: 60,
	name: 100,
	lastName: 100,
	birthday: 100,
	email: 100,
	role: 100,
	isActive: 100,
	friends: 100,
};

export default function Resizing() {
	const { translate } = useTranslation();
	const [data, setData] = useState<TPerson[]>([]);
	const [columnSize] = useState(() => {
		const saveds = localStorage.getItem('@CustomTable:Resizing');
		console.log({ saveds });
		if (!saveds) {
			return DEFAULT;
		}

		return JSON.parse(saveds);
	});

	type Propssss = {
		columnSizing: {
			[index: string]: number;
		};
	};

	function onResizing(dataBatata: {
		columnSizing: ColumnSizingState;
		columnSizingInfo: ColumnSizingInfoState;
	}) {
		console.log(dataBatata);
		const keys = Object.keys(dataBatata.columnSizing);
		if (keys.length === 0) return;

		const saveds = localStorage.getItem('@CustomTable:Resizing');

		const newDefault = saveds ? JSON.parse(saveds) : { ...DEFAULT };

		for (const item of keys) {
			newDefault[item] = dataBatata.columnSizing[item];
		}
		console.log(newDefault);
		localStorage.setItem('@CustomTable:Resizing', JSON.stringify(newDefault));
	}

	const columns = useMemo<ColumnDef<TPerson>[]>(
		() => [
			{
				accessorKey: 'id',
				header: 'ID',
				minSize: 50,
				size: 50,
				align: 'center',
				enableResizing: false,
			},
			{
				accessorKey: 'avatar',
				header: 'Avatar',
				minSize: 70,
				size: 70,
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
				size: columnSize.name,
				align: 'center',
				enableSorting: true,
			},
			{
				accessorKey: 'lastName',
				header: translate('LAST_NAME'),
				minSize: 100,
				size: columnSize.lastName,
				align: 'center',
			},
			{
				accessorFn: row => formatDate(new Date(row.birthday)),
				accessorKey: 'birthday',
				header: translate('BIRTHDAY'),
				minSize: 100,
				size: columnSize.birthday,
				align: 'center',
			},
			{
				accessorKey: 'email',
				header: 'Email',
				minSize: 100,
				size: columnSize.email,
				align: 'center',
				enableHiding: true,
				isVisible: false,
			},
			{
				accessorKey: 'role',
				header: 'Role',
				minSize: 100,
				size: columnSize.role,
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
				enableResizing: false,
			},
			{
				accessorKey: 'friends',
				accessorFn: e => e.friends.map(item => item.name).join(' | '),
				header: translate('FRIENDS'),
				minSize: 50,
				size: columnSize.friends,
				align: 'left',
				cell: info => info.getValue(),
			},
		],
		[translate]
	);

	useEffect(() => {
		setData(makeData.person(5));
	}, []);

	return (
		<div className="p-4">
			{translate('DISPLAY_TITLE_ONLY_HOVER_ON_ELLIPSIS')}
			<Table columns={columns} data={data} onResizing={onResizing} />
			{JSON.stringify(columnSize, null, 2)}
		</div>
	);
}
