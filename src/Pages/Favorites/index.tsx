import { CellContext, ColumnDef } from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';
import { Table } from '../../Components/Table';
import { useTranslation } from '../../Hooks/UseTranslation';
import { TPerson } from '../../Types/TPerson';
import { makeData } from '../../Utils/MakeData';
import { Icons } from '../../Components/Icons';

export default function Favorites() {
	const { translate } = useTranslation();
	const [data, setData] = useState<TPerson[]>([]);
	const [selectedItems, setSelectedItems] = useState({});

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
				id: 'select',
				header: translate('FAVORITES'),
				size: 60,
				minSize: 60,
				maxSize: 60,
				align: 'center',
				enableSorting: false,
				cell: ({ row }: CellContext<TPerson, unknown>) => (
					<div className="w-full h-6 flex items-center justify-center">
						{row.getIsSelected() ? (
							<Icons.Star colorFill="#0054B6" colorStroke="#0054B6" />
						) : (
							<Icons.Star colorStroke="#0054B6" />
						)}
					</div>
				),
			},
		],
		[translate]
	);

	useEffect(() => {
		setData(makeData.person(5));
	}, []);

	return (
		<div className="p-4">
			<h1>{translate('FAVORITE_ROW_MODE')}</h1>

			<div>
				<Table
					columns={columns}
					data={data}
					selection={{
						rowSelection: selectedItems,
						setRowSelection: setSelectedItems,
						type: 'multi',
						disableCheckbox: true,
					}}
				/>
				{translate('FAVORITE_ROWS')}: {JSON.stringify(selectedItems, null, 2)}
			</div>
		</div>
	);
}
