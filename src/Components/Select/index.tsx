import {
	CheckIcon,
	ChevronDownIcon,
	ChevronUpIcon,
} from '@radix-ui/react-icons';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Button } from '../Button';

type Props = {};

function cx(...rest: string[]) {
	return rest.join(' ');
}

const DEFAULT = [
	{
		id: 1,
		name: 'Admin',
	},
	{
		id: 2,
		name: 'User',
	},
	{
		id: 3,
		name: 'Batata',
	},
];

export function Select(props: Props) {
	return (
		<div className="w-60 border-2 border-warning-700">
			<SelectPrimitive.Root defaultValue="1" onValueChange={console.log}>
				<SelectPrimitive.Trigger asChild aria-label="Food">
					<Button className="flex items-center justify-around">
						<SelectPrimitive.Value />
						<SelectPrimitive.Icon>
							<ChevronDownIcon />
						</SelectPrimitive.Icon>
					</Button>
				</SelectPrimitive.Trigger>
				<SelectPrimitive.Content>
					<SelectPrimitive.ScrollUpButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
						<ChevronUpIcon />
					</SelectPrimitive.ScrollUpButton>
					<SelectPrimitive.Viewport className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg">
						<SelectPrimitive.Group>
							{DEFAULT.map(item => (
								<SelectPrimitive.Item
									key={item.id}
									value={String(item.id)}
									className={cx(
										'relative flex items-center px-8 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 font-medium focus:bg-gray-100 dark:focus:bg-gray-900',
										'radix-disabled:opacity-50',
										'focus:outline-none select-none'
									)}
								>
									<SelectPrimitive.ItemText>
										{item.name}
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
		</div>
	);
}
