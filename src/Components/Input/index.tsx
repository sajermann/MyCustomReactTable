import {
	DetailedHTMLProps,
	HTMLAttributes,
	InputHTMLAttributes,
	LabelHTMLAttributes,
} from 'react';
import { ContainerInput } from '../ContainerInput';
import styles from './index.module.css';

interface Props
	extends DetailedHTMLProps<
		InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	label?: string;
	labelProps?: DetailedHTMLProps<
		LabelHTMLAttributes<HTMLLabelElement>,
		HTMLLabelElement
	>;
	containerProps?: DetailedHTMLProps<
		HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	>;
}

export function Input({ label, containerProps, labelProps, ...rest }: Props) {
	return (
		<ContainerInput
			containerProps={containerProps}
			label={label}
			labelProps={labelProps}
		>
			<input {...rest} className={styles.input} />
		</ContainerInput>
	);
}
