import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import styles from './index.module.css';

type Props = DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>;

export function Button({ ...rest }: Props) {
	function buildClass() {
		const { className } = rest;

		if (className) {
			return `${styles.button} ${className}`;
		}

		return styles.button;
	}
	return <button {...rest} className={buildClass()} />;
}
