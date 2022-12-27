import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Container } from '~/Components/Dnd/Container';
import { BeautifulDnd } from '~/Components/BeautifulDnd';
import { Table } from '../../Components/Table';
import { useTranslation } from '../../Hooks/UseTranslation';
import { TPerson } from '../../Types/TPerson';
import { makeData } from '../../Utils/MakeData';
import { useColumns } from '../../Hooks/UseColumns';

export default function ColumnOrder() {
	const { translate } = useTranslation();
	const [data, setData] = useState<TPerson[]>([]);
	const [columnOrder, setColumnOrder] = useState([
		{ id: 'avatar', content: 'Avatar' },
		{ id: 'id', content: 'Id' },
		{ id: 'name', content: translate('NAME') },
		{ id: 'lastName', content: translate('LAST_NAME') },
		{ id: 'birthday', content: translate('BIRTHDAY') },
		{ id: 'email', content: 'Email' },
		{ id: 'role', content: 'Role' },
		{ id: 'isActive', content: translate('ACTIVE') },
	]);

	const { columns } = useColumns();

	useEffect(() => {
		setData(makeData.person(5));
	}, []);

	return (
		<div className="p-4">
			{translate('COLUMN_VISIBILITY_WITH_STATE_FULLY_CONTROLLED')}

			<div className="flex flex-col justify-center text-center">
				<div>{translate('COLUMNS_VISIBLED')}</div>
				<div className="flex gap-4">
					<BeautifulDnd items={columnOrder} setItems={setColumnOrder} />
				</div>
			</div>
			<Table
				columns={columns}
				data={data}
				columnOrder={columnOrder.map(item => item.id)}
			/>
		</div>
	);
}
