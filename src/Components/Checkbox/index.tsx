import * as CheckboxRadix from '@radix-ui/react-checkbox';
import { MouseEvent, useCallback, useState } from 'react';
import { Icons } from '../Icons';

interface Props
	extends Omit<
		React.ForwardRefExoticComponent<
			CheckboxRadix.CheckboxProps & React.RefAttributes<HTMLButtonElement>
		>,
		'checked' | 'defaultChecked' | '$$typeof' | 'onClick'
	> {
	checked?: boolean | 'indeterminate';
	defaultChecked?: boolean | 'indeterminate';
	onClick?: (e?: MouseEvent<HTMLButtonElement, Event>) => void;
}

function Container({ children }: { children: React.ReactNode }) {
	return (
		<div className="p-1 w-full h-full flex items-center justify-center">
			{children}
		</div>
	);
}

export function Checkbox({ checked, onClick, defaultChecked, ...rest }: Props) {
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
			console.log('vai ser: ', attributes['data-state'].value);
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

	return (
		<div className="w-full h-full flex items-center justify-center">
			<CheckboxRadix.Root
				ref={ref}
				onClick={onClick}
				checked={checked}
				defaultChecked={defaultChecked}
				className={verifyClass()}
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
		</div>
	);
}
