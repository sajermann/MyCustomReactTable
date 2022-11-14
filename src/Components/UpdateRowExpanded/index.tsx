import { ChangeEvent, FormEvent, useState } from 'react';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { Datepicker } from '../Datepicker';
import { Input } from '../Input';
import { Select } from '../Select';

const DEFAULT = [
	{
		id: 1,
		name: 'Admin',
	},
	{
		id: 2,
		name: 'Dev',
	},
	{
		id: 3,
		name: 'User',
	},
];

type Props = {
	row: any;
	onSave: (row: any, dataEdit: any) => void;
};
export function UpdateRowExpanded({ row, onSave }: Props) {
	const [formData, updateFormData] = useState({
		name: row.original.name,
		lastName: row.original.lastName,
		birthday: row.original.birthday,
		isActive: row.original.isActive,
	});

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		const { id, value } = e.target;
		updateFormData({
			...formData,
			[id]: value,
		});
	}

	function handleSave(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		console.log('form', { e });
		onSave(row, formData);
	}

	function onChange(e: any) {
		console.log('result onchange', e);
	}

	return (
		<form onSubmit={handleSave} className="p-2 flex flex-col gap-2 ">
			<div className="grid grid-cols-12 gap-6">
				<Input
					label="Nome"
					defaultValue={row.original.name}
					onChange={handleChange}
					id="name"
					containerProps={{ className: 'col-span-12 lg:col-span-3' }}
				/>
				<Input
					label="Sobrenome"
					defaultValue={row.original.lastName}
					onChange={handleChange}
					id="lastName"
					containerProps={{ className: 'col-span-12 lg:col-span-3' }}
				/>
				<Input
					label="Email"
					defaultValue={row.original.email}
					id="email"
					disabled
					containerProps={{ className: 'col-span-12 lg:col-span-3' }}
				/>
				<Datepicker
					label="Data Nascimento"
					id="birthday"
					name="birthday"
					customDefaultValue={new Date(row.original.birthday)}
					onChange={handleChange}
					containerProps={{ className: 'col-span-12 lg:col-span-3' }}
				/>
				<Select
					defaultValue={DEFAULT.find(item => item.name === row.original.role)}
					items={DEFAULT}
					textProp="name"
					onChange={onChange}
					placeholder="Selecione a Role"
					label="Role"
					id="role"
					containerProps={{ className: 'col-span-12 lg:col-span-3' }}
				/>

				<Checkbox
					defaultChecked={row.original.isActive}
					id="isActive"
					onCheckedChange={e =>
						handleChange(e as ChangeEvent<HTMLInputElement>)
					}
					label="Usuário Ativo"
					containerProps={{ className: 'col-span-12 lg:col-span-3' }}
				/>
				<div className="col-span-12 lg:col-span-3 flex items-end">
					<Button type="submit" className="text-white p-2 rounded">
						Salvar
					</Button>
				</div>
				<div className="col-span-12 lg:col-span-3 flex items-end">
					<Button
						type="button"
						onClick={row.getToggleExpandedHandler()}
						className="!bg-red-500 hover:!bg-red-300 text-white p-2 rounded"
					>
						Cancelar
					</Button>
				</div>
			</div>
		</form>
	);
}
