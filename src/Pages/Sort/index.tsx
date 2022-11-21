import { useEffect, useState } from 'react';
import { Table } from '../../Components/Table';
import { useTranslation } from '../../Hooks/UseTranslation';
import { TPerson } from '../../Types/TPerson';
import { makeData } from '../../Utils/MakeData';
import { useColumns } from '../../Hooks/UseColumns';

export default function Sort() {
	const { translate } = useTranslation();
	const [data, setData] = useState<TPerson[]>([]);

	const { columns } = useColumns();

	useEffect(() => {
		setData(makeData.person(5));
	}, []);

	return (
		<div className="p-4">
			<h1>{translate('SORT_MODE')}</h1>

			<Table columns={columns} data={data} />
		</div>
	);
}
