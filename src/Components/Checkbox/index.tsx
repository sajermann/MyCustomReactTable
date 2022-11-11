/* eslint-disable jsx-a11y/label-has-associated-control */
import * as CheckboxRadix from '@radix-ui/react-checkbox';
import {
	DetailedHTMLProps,
	LabelHTMLAttributes,
	MouseEvent,
	useCallback,
	useState,
} from 'react';
import { Icons } from '../Icons';

interface Props
	extends Omit<
		React.ForwardRefExoticComponent<
			CheckboxRadix.CheckboxProps & React.RefAttributes<HTMLButtonElement>
		>,
		'checked' | 'defaultChecked' | '$$typeof' | 'onClick' | 'id'
	> {
	checked?: boolean | 'indeterminate';
	defaultChecked?: boolean | 'indeterminate';
	onClick?: (e?: MouseEvent<HTMLButtonElement, Event>) => void;
	labelProps?: DetailedHTMLProps<
		LabelHTMLAttributes<HTMLLabelElement>,
		HTMLLabelElement
	>;
	label?: string;
	id?: string;
	onCheckedChange?: (data: {
		target: { value: boolean | 'indeterminate'; id: string | undefined };
	}) => void;
}

function Container({ children }: { children: React.ReactNode }) {
	return (
		<div className="p-1 w-full h-full flex items-center justify-center">
			{children}
		</div>
	);
}

export function Checkbox({
	checked,
	onClick,
	defaultChecked,
	labelProps,
	onCheckedChange,
	label,
	id,
	...rest
}: Props) {
	const [situation, setSituation] = useState(() => {
		if (checked === true || defaultChecked === true) {
			return 'checked';
		}
		if (checked === 'indeterminate' || defaultChecked === 'indeterminate') {
			return 'indeterminate';
		}
		return 'unchecked';
	});

	const ref = useCallback((node: any) => {
		if (node !== null) {
			const { attributes } = node as unknown as {
				attributes: Record<string, { value: string }>;
			};
			setSituation(attributes['data-state'].value);
		}
	}, []);

	function verifyClass() {
		const classes = [
			'rounded h-5 w-5 border-[1px] border-black disabled:cursor-not-allowed disabled:opacity-50;',
		];

		if (situation === 'checked' || situation === 'indeterminate') {
			classes.push('bg-primary-500');
		}

		return classes.join(' ');
	}

	function handleCheckedChange(e: boolean | 'indeterminate') {
		const result = {
			target: {
				value: e,
				id,
			},
		};
		if (onCheckedChange) {
			onCheckedChange(result);
		}
	}

	return (
		<div className="flex items-center gap-2 w-full h-full">
			<CheckboxRadix.Root
				ref={ref}
				onClick={onClick}
				checked={checked}
				defaultChecked={defaultChecked}
				onCheckedChange={handleCheckedChange}
				className={verifyClass()}
				id={id}
				{...rest}
			>
				<CheckboxRadix.Indicator>
					{situation === 'indeterminate' && (
						<Container>
							<Icons.Indeterminate color="#fff" />
						</Container>
					)}
					{situation === 'checked' && (
						<Container>
							<Icons.Checked color="#fff" />
						</Container>
					)}
				</CheckboxRadix.Indicator>
			</CheckboxRadix.Root>
			{label && (
				<label htmlFor={id} {...labelProps}>
					{label}
				</label>
			)}
		</div>
	);
}
