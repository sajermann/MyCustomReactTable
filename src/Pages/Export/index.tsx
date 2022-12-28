import { useEffect, useMemo, useState } from 'react';

import { Table } from '~/Components/Table';
import { useTranslation } from '~/Hooks/UseTranslation';
import { TPerson } from '~/Types/TPerson';
import { makeData } from '~/Utils/MakeData';
import { useColumns } from '~/Hooks/UseColumns';
import { Button } from '~/Components/Button';
import { formatDate } from '@sajermann/utils/FormatDate';
import { exportTo } from '~/Utils/Export';

export default function Export() {
	const { translate } = useTranslation();
	const [data, setData] = useState<TPerson[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const { columns } = useColumns();

	async function load() {
		setIsLoading(true);
		setData(makeData.person(100));
		setIsLoading(false);
	}

	useEffect(() => {
		load();
	}, []);

	const defForExcel = useMemo(
		() => [
			{
				header: 'Id',
				accessor: 'id',
			},
			{
				header: 'Avatar',
				accessor: 'avatar',
			},
			{
				header: translate('NAME'),
				accessor: 'name',
			},
			{
				header: translate('LAST_NAME'),
				accessor: 'lastName',
			},
			{
				header: translate('BIRTHDAY'),
				accessor: 'birthday',
				convertionFn: (dataColumn: any) => formatDate(new Date(dataColumn)),
			},
			{
				header: 'Email',
				accessor: 'email',
			},
			{
				header: 'Role',
				accessor: 'role',
			},
			{
				header: translate('ACTIVE'),
				accessor: 'isActive',
				convertionFn: (dataColumn: any) =>
					dataColumn ? translate('YES') : translate('NO'),
			},
			{
				header: translate('FRIENDS'),
				accessor: 'friends',
				convertionFn: (dataColumn: any) =>
					dataColumn.map((item: any) => item.name).join(', '),
			},
		],
		[translate]
	);

	return (
		<div className="p-4 flex flex-col gap-2">
			<div className="flex flex-col w-48 gap-2">
				{translate('EXPORT_DATA')}
				<Button
					onClick={() => exportTo.excel({ data, defColumns: defForExcel })}
				>
					Excel
				</Button>
			</div>

			<Table isLoading={isLoading} columns={columns} data={data} />
		</div>
	);
}
