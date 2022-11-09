import * as CheckboxRadix from '@radix-ui/react-checkbox';
import React from 'react';
import { Icons } from '../Icons';

type Props = {
	checked: boolean | 'indeterminate';
	onClick?: () => void;
};

type PropsContainer = {
	children: React.ReactNode;
};

function Container({ children }: PropsContainer) {
	return <div className="p-1">{children}</div>;
}

export function Checkbox({ checked, onClick, ...rest }: Props) {
	return (
		<CheckboxRadix.Root
			onClick={onClick}
			checked={checked}
			className={`${
				!checked ? '' : 'bg-primary-500'
			} rounded h-5 w-5 border-[1px] border-black disabled:cursor-not-allowed disabled:opacity-50`}
			{...rest}
		>
			<CheckboxRadix.Indicator>
				{checked === 'indeterminate' && (
					<Container>
						<div className="w-full h-1 bg-white rounded" />
					</Container>
				)}
				{checked === true && (
					<Container>
						<Icons.Checked />
					</Container>
				)}
			</CheckboxRadix.Indicator>
		</CheckboxRadix.Root>
	);
}
