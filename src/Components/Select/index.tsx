import {
	CheckIcon,
	ChevronDownIcon,
	ChevronUpIcon,
} from '@radix-ui/react-icons';
import * as SelectPrimitive from '@radix-ui/react-select';
import { DetailedHTMLProps, HTMLAttributes, LabelHTMLAttributes } from 'react';
import { Button } from '../Button';
import { ContainerInput } from '../ContainerInput';

function cx(...rest: string[]) {
	return rest.join(' ');
}

type Props<T> = {
	items: T[];
	textProp: keyof T;
	defaultValue?: T;
	placeholder?: string;
	onChange?: (data: T) => void;
	id?: string;
	label?: string;
	labelProps?: DetailedHTMLProps<
		LabelHTMLAttributes<HTMLLabelElement>,
		HTMLLabelElement
	>;
	containerProps?: DetailedHTMLProps<
		HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	>;
};

export function Select<T>({
	items,
	textProp,
	defaultValue,
	onChange,
	placeholder,
	id,
	label,
	labelProps,
	containerProps,
}: Props<T>) {
	function onChangeInternal(e: string) {
		if (onChange) {
			onChange(JSON.parse(e));
		}
	}
	return (
		<ContainerInput
			containerProps={containerProps}
			label={label}
			labelProps={labelProps}
			id={id}
		>
			<SelectPrimitive.Root
				defaultValue={JSON.stringify(defaultValue)}
				onValueChange={onChangeInternal}
			>
				<SelectPrimitive.Trigger asChild id={id}>
					<button className="flex items-center justify-around">
						<SelectPrimitive.Value placeholder={placeholder} />
						<SelectPrimitive.Icon>
							<ChevronDownIcon />
						</SelectPrimitive.Icon>
					</button>
				</SelectPrimitive.Trigger>
				<SelectPrimitive.Content>
					<SelectPrimitive.ScrollUpButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
						<ChevronUpIcon />
					</SelectPrimitive.ScrollUpButton>
					<SelectPrimitive.Viewport className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg">
						<SelectPrimitive.Group>
							{items.map(item => (
								<SelectPrimitive.Item
									key={JSON.stringify(item)}
									value={JSON.stringify(item)}
									className={cx(
										'relative flex items-center px-8 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 font-medium focus:bg-gray-100 dark:focus:bg-gray-900',
										'radix-disabled:opacity-50',
										'focus:outline-none select-none'
									)}
								>
									<SelectPrimitive.ItemText>
										{String(item[textProp])}
									</SelectPrimitive.ItemText>
									<SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
										<CheckIcon />
									</SelectPrimitive.ItemIndicator>
								</SelectPrimitive.Item>
							))}
						</SelectPrimitive.Group>
					</SelectPrimitive.Viewport>
					<SelectPrimitive.ScrollDownButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
						<ChevronDownIcon />
					</SelectPrimitive.ScrollDownButton>
				</SelectPrimitive.Content>
			</SelectPrimitive.Root>
		</ContainerInput>
	);
}
