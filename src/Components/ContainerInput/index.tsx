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
}
export function ContainerInput({
	children,
	label,
	containerProps,
	labelProps,
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
				htmlFor={extractorIdChildren(children)}
				{...labelProps}
				className={styles.label}
			>
				{label}
			</label>
			{children}
		</div>
	);
}
