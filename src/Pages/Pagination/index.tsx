import { useEffect, useState } from 'react';
import { Table } from '../../Components/Table';
import { useTranslation } from '../../Hooks/UseTranslation';
import { TPerson } from '../../Types/TPerson';
import { makeData } from '../../Utils/MakeData';
import { useColumns } from '../../Hooks/UseColumns';
import { delay } from '../../Utils/Delay';

export default function Pagination() {
	const { translate } = useTranslation();
	const [data, setData] = useState<TPerson[]>([]);
	const [pageCount, setPageCount] = useState(0);

	const [isLoading, setIsLoading] = useState(true);

	const { columns } = useColumns();

	async function load(pageIndex: number, pageSize: number) {
		setIsLoading(true);
		await delay(3000);
		const result = makeData.personWithPagination({
			pageIndex,
			pageSize,
		});
		console.log({ result });
		// setData(result.data);
		// setPagination(result.info);
		setIsLoading(false);
	}

	useEffect(() => {
		load(0, 30);
	}, []);

	return (
		<div className="p-4">
			<h1>{translate('PAGINATION_MODE')}</h1>
			<Table
				isLoading={isLoading}
				columns={[...columns]}
				data={data}
				enablePagination={{
					pageCount,
					onChange: () => {
						console.log('Mudou');
					},
				}}
				disabledVirtualization
			/>
		</div>
	);
}
