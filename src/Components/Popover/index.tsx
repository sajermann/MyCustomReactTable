/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import * as PopoverRadix from '@radix-ui/react-popover';
import { MixerHorizontalIcon, Cross2Icon } from '@radix-ui/react-icons';

type Props = {
	children: React.ReactNode;
	isOpen?: boolean;
	onClose?: () => void;
	trigger?: React.ReactNode;
};

export function Popover({ children, isOpen, onClose, trigger }: Props) {
	return (
		<div className="relative inline-block text-left">
			<PopoverRadix.Root open={isOpen}>
				<PopoverRadix.Trigger asChild>
					{/* <button className="IconButton" aria-label="Update dimensions">
						<MixerHorizontalIcon />
					</button> */}
					{trigger}
				</PopoverRadix.Trigger>
				<PopoverRadix.Portal>
					<PopoverRadix.Content
						data-bruno="sajermann"
						align="center"
						sideOffset={4}
						// className="radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down w-48 rounded-lg p-4 shadow-md md:w-56 bg-white dark:bg-gray-800 z-10"
						className="radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down w-48 rounded-lg p-4 pt-10 shadow-md md:w-56 bg-white dark:bg-gray-800 z-[1]"
						style={{ border: '1px solid' }}
					>
						{/* <PopoverRadix.Arrow className="fill-current text-white dark:text-gray-800 p-4" /> */}
						{children}
						<PopoverRadix.Close
							onClick={onClose}
							className="absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
							aria-label="Close"
						>
							<Cross2Icon />
						</PopoverRadix.Close>
						<PopoverRadix.Arrow className="PopoverRadixArrow" />
					</PopoverRadix.Content>
				</PopoverRadix.Portal>
			</PopoverRadix.Root>
		</div>
	);
}
