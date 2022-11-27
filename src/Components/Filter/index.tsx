import { useState } from 'react';
import { useTranslation } from '../../Hooks/UseTranslation';
import { objectToQuery } from '../../Utils/ObjectToQuery';
import { Button } from '../Button';
import { Input } from '../Input';
import { Select } from '../Select';

export function Filter({
	filterParams,
	setFilterParams,
}: {
	filterParams: string;
	setFilterParams: (data: string) => void;
}) {
	const [filter, setFilter] = useState({
		name: '',
		status: '',
	});
	const { translate } = useTranslation();

	function handleSave() {
		setFilterParams(objectToQuery(filter));
	}

	return (
		<div className="w-full grid grid-cols-12 gap-6">
			<Input
				label={translate('NAME')}
				id="name"
				value={filter.name}
				onChange={e => setFilter({ ...filter, name: e.target.value })}
				containerProps={{
					className: 'col-span-4 lg:col-span-4',
				}}
			/>
			<Select
				id="status"
				label="STATUS"
				items={[
					{ id: 1, text: 'alive' },
					{ id: 2, text: 'dead' },
					{ id: 3, text: 'unknown' },
				]}
				textProp="text"
				onChange={({ text }) => setFilter({ ...filter, status: text })}
				containerProps={{
					className: 'col-span-4 lg:col-span-4',
				}}
			/>
			<div className="col-span-4 lg:col-span-4 flex items-end justify-center">
				<Button onClick={handleSave}>Filtrar</Button>
			</div>
		</div>
	);
}
