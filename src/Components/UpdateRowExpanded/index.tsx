import { ChangeEvent, FormEvent, useState } from 'react';
import { Checkbox } from '../Checkbox';
import { Datepicker } from '../Datepicker';
import { Input } from '../Input';

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
		updateFormData({
			...formData,
			[e.target.name]: e.target.value.trim(),
		});
	}

	function handleSave(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		onSave(row, formData);
	}

	return (
		<form onSubmit={handleSave} className="p-2 flex flex-col gap-2">
			<Input
				label="Nome"
				defaultValue={row.original.name}
				onChange={handleChange}
				id="name"
				name="name"
			/>
			<Input
				label="Sobrenome"
				defaultValue={row.original.lastName}
				onChange={handleChange}
				id="lastName"
				name="lastName"
			/>
			<Datepicker
				label="Data Nascimento"
				id="birthday"
				name="birthday"
				customDefaultValue={new Date(row.original.birthday)}
				onChange={handleChange}
			/>
			<Checkbox
				{...{
					checked: formData.isActive,
				}}
			/>

			<button type="submit" className="!bg-primary-500 text-white p-2 rounded">
				Salvar
			</button>
			<button
				type="button"
				onClick={row.getToggleExpandedHandler()}
				className="!bg-red-500 text-white p-2 rounded"
			>
				Cancelar
			</button>
		</form>
	);
}
