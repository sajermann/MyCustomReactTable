import ReactSelect, { OptionsOrGroups } from 'react-select';

type Props = {
	isClearable?: boolean;
	isDisabled?: boolean;
	isLoading?: boolean;
	isSearchable?: boolean;
	id?: string;
	label?: string;
	placeholder?: string;
	value?: unknown;
	defaultValue?: string;
	options: OptionsOrGroups<unknown, any>;
	onChange: (data: { target: { id?: string; value: string } }) => void;
};

export function SelectNew({
	isClearable,
	isDisabled,
	isLoading,
	isSearchable,
	options,
	id,
	placeholder,
	label,
	value,
	defaultValue,
	onChange,
	...rest
}: Props) {
	function handleOnChange(e: unknown) {
		if (!e) {
			onChange({ target: { value: '', id } });
			return;
		}
		const { value: valueNow } = e as { value: string };
		if (onChange) {
			onChange({ target: { value: valueNow, id } });
		}
	}

	return (
		<div {...rest}>
			{label && (
				<div className="mb-2">
					<label htmlFor={id}>{label}</label>
				</div>
			)}

			<ReactSelect
				menuPosition="fixed"
				menuPortalTarget={document.body}
				loadingMessage={() => 'Carregando...'}
				noOptionsMessage={() => 'Não há dados'}
				key={`react-select-${value}-${label}`}
				id={id}
				className="basic-single"
				classNamePrefix="select"
				defaultValue={options.find(item => item.value === defaultValue)}
				isDisabled={isDisabled}
				isLoading={isLoading}
				isClearable={isClearable}
				isSearchable={isSearchable}
				options={options}
				placeholder={placeholder}
				onChange={handleOnChange}
				value={options.find(item => item.value === value)}
			/>
		</div>
	);
}
