import {
	DetailedHTMLProps,
	HTMLAttributes,
	InputHTMLAttributes,
	LabelHTMLAttributes,
} from 'react';

import styles from './index.module.css';

interface Props
	extends DetailedHTMLProps<
		InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	children: React.ReactNode;
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
	id?: string;
}
export function ContainerInput({
	children,
	label,
	containerProps,
	labelProps,
	id,
}: Props) {
	function classContainer() {
		if (containerProps?.className) {
			return `${styles.customContainer} ${containerProps?.className}`;
		}
		return styles.customContainer;
	}

	function extractorIdChildren(child: React.ReactNode): string | undefined {
		const { props } = child as { props: { id: string } };
		return props.id || '';
	}

	return (
		<div {...containerProps} className={classContainer()}>
			<label
				htmlFor={id || extractorIdChildren(children)}
				className={styles.label}
				{...labelProps}
			>
				{label}
			</label>
			{children}
		</div>
	);
}
