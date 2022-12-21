import { useEffect, useState } from 'react';
import { Table } from '../../Components/Table';
import { useTranslation } from '../../Hooks/UseTranslation';
import { TPerson } from '../../Types/TPerson';
import { makeData } from '../../Utils/MakeData';
import { useColumns } from '../../Hooks/UseColumns';
import { Button } from '../../Components/Button';

export default function Print() {
	const { translate } = useTranslation();
	const [data, setData] = useState<TPerson[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const { columns } = useColumns();

	async function load() {
		setIsLoading(true);
		setData(makeData.person(1000));
		setIsLoading(false);
	}

	useEffect(() => {
		load();
	}, []);

	return (
		<div className="p-4">
			<div className="flex gap-2">
				<Button onClick={() => alert(true)}>{translate('PRINT')}</Button>
			</div>
			<Table isLoading={isLoading} columns={columns} data={data} />
		</div>
	);
}
