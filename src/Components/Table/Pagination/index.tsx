/* eslint-disable react/button-has-type */

import { Table } from '@tanstack/react-table';
import { Button } from '~/Components/Button';

import { Icons } from '~/Components/Icons';
import { Input } from '~/Components/Input';

type Props<T> = {
	table: Table<T>;
	disabledActions?: boolean;
	propsButtonFirstPage?: Record<string, unknown>;
	propsButtonPrevPage?: Record<string, unknown>;
	propsButtonNextPage?: Record<string, unknown>;
	propsButtonLastPage?: Record<string, unknown>;
	propsInput?: Record<string, unknown>;
};

type Propss = {
	children: React.ReactNode;
	onClick: () => void;
	disabled?: boolean;
};

function ButtonPagination({ children, onClick, disabled, ...rest }: Propss) {
	return (
		<Button
			style={{ width: 34, maxWidth: 34, minWidth: 34 }}
			onClick={onClick}
			disabled={disabled}
			{...rest}
		>
			{children}
		</Button>
	);
}

export function Pagination<T>({
	table,
	disabledActions,
	propsButtonFirstPage,
	propsButtonPrevPage,
	propsButtonNextPage,
	propsButtonLastPage,
	propsInput,
}: Props<T>) {
	return (
		<div>
			<div className="h-2" />
			<div className="flex items-center gap-2">
				<ButtonPagination
					{...propsButtonFirstPage}
					onClick={() => table.setPageIndex(0)}
					disabled={!table.getCanPreviousPage() || disabledActions}
				>
					<Icons.ArrowPairLeft color="#fff" />
				</ButtonPagination>
				<ButtonPagination
					{...propsButtonPrevPage}
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage() || disabledActions}
				>
					<Icons.ArrowSingleLeft color="#fff" />
				</ButtonPagination>
				<ButtonPagination
					{...propsButtonNextPage}
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage() || disabledActions}
				>
					<Icons.ArrowSingleRight color="#fff" />
				</ButtonPagination>
				<ButtonPagination
					{...propsButtonLastPage}
					onClick={() => table.setPageIndex(table.getPageCount() - 1)}
					disabled={!table.getCanNextPage() || disabledActions}
				>
					<Icons.ArrowPairRight color="#fff" />
				</ButtonPagination>
				<span className="flex items-center gap-1">
					<div>Pág.</div>
					<strong>{table.getState().pagination.pageIndex + 1}</strong>
					de <strong>{table.getPageCount()}</strong>
				</span>
				<span className="flex items-center gap-1">
					| Ir para pág.:
					<div className="w-20">
						<Input
							{...propsInput}
							disabled={disabledActions}
							type="number"
							defaultValue={table.getState().pagination.pageIndex + 1}
							onBlur={e => {
								const page = e.target.value ? Number(e.target.value) - 1 : 0;
								table.setPageIndex(page);
							}}
						/>
					</div>
				</span>

				<div>| {table.getRowModel().rows.length} Linhas</div>
			</div>
		</div>
	);
}
