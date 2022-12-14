import { useQuery } from '@tanstack/react-query';
import { usePagination } from '~/Hooks/UsePagination';
import { Table } from '../../Components/Table';
import { useTranslation } from '../../Hooks/UseTranslation';
import { TPerson } from '../../Types/TPerson';
import { makeData } from '../../Utils/MakeData';
import { useColumns } from '../../Hooks/UseColumns';
import { delay } from '../../Utils/Delay';
import { Filter } from '../../Components/Filter';

export default function Pagination() {
	const {
		pageCount,
		setPageCount,
		pagination,
		setPagination,
		filterQuery,
		setFilterQuery,
		backQuery,
	} = usePagination();
	const { translate } = useTranslation();
	const { columns } = useColumns();

	async function load(filter: string) {
		// if (filter.indexOf('pageIndex') === -1) return [];
		console.log('Backend...', { filter });
		await delay(3000);
		const result = makeData.personWithPagination({
			pageSize: pagination.pageSize,
		});

		setPageCount(result.pageCount);
		return result.data;
	}

	const { data, isFetching } = useQuery<TPerson[]>({
		queryKey: ['pagination', backQuery],
		queryFn: () => load(backQuery),
		keepPreviousData: true,
	});

	return (
		<div className="p-4 flex flex-col gap-2">
			<h1>{translate('PAGINATION_MODE')}</h1>
			<div>
				<strong>{translate('NOTE')}: </strong>
				<span>{translate('NOTE_PAGINATION_MODE')} </span>
				<span>{JSON.stringify({ backQuery })}</span>
			</div>
			<Filter
				filterParams={filterQuery}
				setFilterParams={setFilterQuery}
				isLoading={isFetching}
			/>

			<Table
				isLoading={isFetching}
				columns={[...columns]}
				data={data || []}
				pagination={{
					pageCount,
					pageIndex: pagination.pageIndex,
					pageSize: pagination.pageSize,
					setPagination,
				}}
				disabledVirtualization
			/>
		</div>
	);
}
