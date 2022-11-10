import { ChangeEvent, FormEvent, useState } from 'react';

type Props = {
	row: any;
	onSave: (row: any, dataEdit: any) => void;
};
export function UpdateRowExpanded({ row, onSave }: Props) {
	const [formData, updateFormData] = useState({
		name: row.original.name,
		lastName: row.original.lastName,
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
		<form onSubmit={handleSave} className="p-2">
			<input
				className="bg-slate-600 border rounded w-full p-1 text-white"
				defaultValue={row.original.name}
				onChange={handleChange}
				id="name"
				name="name"
			/>
			<input
				className="bg-slate-600 border rounded w-full p-1 text-white"
				defaultValue={row.original.lastName}
				onChange={handleChange}
				id="lastName"
				name="lastName"
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
