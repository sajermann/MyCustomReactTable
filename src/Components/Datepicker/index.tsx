/* eslint-disable import/no-extraneous-dependencies */
import ptBr from 'date-fns/locale/pt-BR';
import {
	useEffect,
	useState,
	DetailedHTMLProps,
	HTMLAttributes,
	InputHTMLAttributes,
	LabelHTMLAttributes,
	ChangeEvent,
} from 'react';
import DatePicker from 'react-datepicker';
import { ContainerInput } from '../ContainerInput';
import styles from './index.module.css';

interface Props
	extends DetailedHTMLProps<
		InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	withoutDay?: boolean;
	label?: string;
	customDefaultValue?: Date;
	labelProps?: DetailedHTMLProps<
		LabelHTMLAttributes<HTMLLabelElement>,
		HTMLLabelElement
	>;
	containerProps?: DetailedHTMLProps<
		HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	>;
}

export function Datepicker({
	label,
	containerProps,
	labelProps,
	customDefaultValue,
	withoutDay,
	...rest
}: Props) {
	const [startDate, setStartDate] = useState<Date | null>(
		customDefaultValue || null
	);

	function onChangeInternal(date: Date | null) {
		setStartDate(date);

		const dataVerify = date ? date.toISOString() : '';

		if (rest.onChange) {
			const t = {
				target: {
					value: dataVerify,
					id: rest.id,
					name: rest.name,
				},
			} as ChangeEvent<HTMLInputElement>;
			rest.onChange(t);
		}
	}

	useEffect(() => {
		if (rest.value === '' || rest.value === undefined) {
			setStartDate(null);
		}
	}, [rest.value]);

	useEffect(() => {
		if (customDefaultValue) {
			onChangeInternal(customDefaultValue);
		}
	}, []);

	return (
		<ContainerInput
			containerProps={containerProps}
			label={label}
			labelProps={labelProps}
		>
			<DatePicker
				autoComplete="off"
				id={rest.id}
				disabled={rest.disabled}
				placeholderText={rest.placeholder}
				className={styles.input}
				selected={startDate}
				onChange={onChangeInternal}
				locale={ptBr}
				dateFormat={withoutDay ? 'MM/yyyy' : 'dd/MM/yyyy'}
				closeOnScroll
				shouldCloseOnSelect
				showMonthYearPicker={withoutDay}
			/>
		</ContainerInput>
	);
}
