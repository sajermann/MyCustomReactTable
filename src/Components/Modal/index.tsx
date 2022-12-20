import * as Dialog from '@radix-ui/react-dialog';
import { Icons } from '../Icons';
import styles from './index.module.css';

type Props = {
	children: React.ReactNode;
	title?: string;
	isOpen: boolean;
	onClose: () => void;
	width?: string;
	closeByBackdrop?: boolean;
	closeByEsc?: boolean;
	contentProps?: object;
	overlayProps?: object;
	closeButton?: boolean;
};

export function Modal({
	children,
	title,
	isOpen,
	onClose,
	closeByBackdrop,
	closeByEsc,
	width,
	contentProps,
	overlayProps,
	closeButton,
}: Props) {
	return (
		<Dialog.Root open={isOpen}>
			<Dialog.Portal>
				<Dialog.Overlay
					{...overlayProps}
					className={styles.overlay}
					onClick={closeByBackdrop ? onClose : undefined}
				/>
				<Dialog.Content
					{...contentProps}
					style={{ width }}
					onEscapeKeyDown={closeByEsc ? onClose : undefined}
					className={styles.content}
				>
					<header className={styles.header}>
						{title && <span className={styles.title}>{title}</span>}
						{closeButton && (
							<div
								className={styles.closeButton}
								onClick={onClose}
								onKeyPress={onClose}
								role="button"
								tabIndex={0}
								data-testid="closeButtonModal"
							>
								<Icons.Close />
							</div>
						)}
					</header>
					<main className={styles.main}>{children}</main>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
