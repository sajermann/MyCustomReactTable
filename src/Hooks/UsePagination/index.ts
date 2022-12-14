import { useEffect, useState } from 'react';

import { DEFAULT_PAG } from '../../Constants/Others';
import { objectToQuery } from '../../Utils/ObjectToQuery';

export function usePagination() {
	const [backQuery, setBackQuery] = useState('');
	const [filterQuery, setFilterQuery] = useState('');
	const [paginationQuery, setPaginationQuery] = useState('');
	const [pageCount, setPageCount] = useState(0);
	const [pagination, setPagination] = useState(DEFAULT_PAG);

	function resetPagination() {
		console.log('Reset...', { filterQuery });
		setPagination({ ...DEFAULT_PAG });
		setPaginationQuery(objectToQuery({ ...DEFAULT_PAG }));
	}

	useEffect(() => {
		resetPagination();
	}, [filterQuery]);

	function mountQueryPagination() {
		const queryPag = objectToQuery({ ...pagination });
		setPaginationQuery(queryPag);
		setBackQuery(`${filterQuery}&${queryPag}`);
	}

	useEffect(() => {
		mountQueryPagination();
	}, [pagination]);

	return {
		pagination,
		setPagination,
		paginationQuery,
		setPaginationQuery,
		pageCount,
		setPageCount,
		backQuery,
		filterQuery,
		setFilterQuery,
	};
}
