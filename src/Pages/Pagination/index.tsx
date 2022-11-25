import { useEffect, useState } from 'react';
import { Table } from '../../Components/Table';
import { useTranslation } from '../../Hooks/UseTranslation';
import { TPerson } from '../../Types/TPerson';
import { makeData } from '../../Utils/MakeData';
import { useColumns } from '../../Hooks/UseColumns';

export default function Pagination() {
	const { translate } = useTranslation();
	const [data, setData] = useState<TPerson[]>([]);
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 50,
		pageCount: 0,
	});

	const { columns } = useColumns();

	function load() {
		const result = makeData.personWithPagination({
			pageIndex: pagination.pageIndex,
			pageSize: pagination.pageSize,
		});
		setData(result.data);
		setPagination(result.info);
	}

	useEffect(() => {
		load();
	}, []);

	return (
		<div className="p-4">
			<h1>{translate('PAGINATION_MODE')}</h1>
			{translate('FRIENDS_IS_ARRAY_OF_OBJECT')}

			<Table
				columns={[...columns]}
				data={data}
				enablePagination={{
					pagination,
					setPagination,
				}}
				disabledVirtualization
			/>
		</div>
	);
}
