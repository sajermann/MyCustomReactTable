import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { formatDate } from '@sajermann/utils/FormatDate';
import { Table } from '../../Components/Table';
import { useTranslation } from '../../Hooks/UseTranslation';
import { TPerson } from '../../Types/TPerson';
import { makeData } from '../../Utils/MakeData';
import { useColumns } from '../../Hooks/UseColumns';
import { delay } from '../../Utils/Delay';
import { TRickAndMorty } from '../../Types/TRickAndMorty';
import { Filter } from '../../Components/Filter';
import { objectToQuery } from '../../Utils/ObjectToQuery';
import { removeParamsFromQuery } from '../../Utils/RemoveParamsFromQuery';

const DEFAULT_PAG = {
	pageIndex: 0,
	pageSize: 50,
};

export default function Pagination() {
	const { translate } = useTranslation();
	const [params, setParams] = useState('');
	const [pageCount, setPageCount] = useState(0);
	const [pagination, setPagination] = useState(DEFAULT_PAG);

	async function load(filter: string) {
		if (filter === '') return null;
		console.log({ filter });
		await delay(3000);
		const result = await fetch(
			`https://rickandmortyapi.com/api/character/?${filter}`
		).then(resp => resp.json());
		console.log({ result });
		if (result) {
			setPageCount(result.info.pages);
			return result.results;
		}
		return [];
	}

	const { data, isFetching, status, error } = useQuery<TRickAndMorty[]>({
		queryKey: ['queryMorty', params],
		queryFn: () => load(params),
		keepPreviousData: true,
	});

	console.log({ status, error });

	function handlePag() {
		const removedPagParams = removeParamsFromQuery(
			removeParamsFromQuery(params, 'pageIndex'),
			'pageSize'
		);
		console.log({ removedPagParams });
		const resultPag = objectToQuery(pagination);
		setParams(`${removedPagParams}&${resultPag}`);
	}

	useEffect(() => {
		handlePag();
	}, [pagination]);

	function handleFilterSave(e: string) {
		setPagination({ ...DEFAULT_PAG });
		const resultPag = objectToQuery(DEFAULT_PAG);
		console.log(`${e}&${resultPag}`);
		setParams(`${e}&${resultPag}`);
	}

	const columns = useMemo<ColumnDef<TRickAndMorty>[]>(
		() => [
			{
				accessorKey: 'id',
				header: 'ID',
				minSize: 100,
				size: 100,
				align: 'center',
			},
			{
				accessorKey: 'image',
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
				accessorKey: 'status',
				header: 'Status',
				minSize: 100,
				size: 100,
				align: 'center',
			},
			{
				accessorKey: 'created',
				header: translate('CREATED'),
				minSize: 100,
				size: 100,
				cell: info => (
					<div>{formatDate(new Date(info.getValue() as string))}</div>
				),
				align: 'center',
			},
		],
		[translate]
	);

	// function handlePag(e: any) {
	// 	const result = objectToQuery(e);
	// 	setPagParams(result);
	// 	console.log(result);
	// }

	return (
		<div className="p-4">
			<h1>{translate('PAGINATION_MODE')}</h1>
			<Filter filterParams="" setFilterParams={handleFilterSave} />
			{params}
			<Table
				isLoading={isFetching}
				columns={[...columns]}
				data={data || []}
				enablePagination={{
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
