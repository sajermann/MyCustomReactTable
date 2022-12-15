/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useRef, useState } from 'react';
import {
	CellContext,
	ColumnDef,
	getCoreRowModel,
	getExpandedRowModel,
	getSortedRowModel,
	HeaderContext,
	Row,
	SortingState,
	useReactTable,
	getFilteredRowModel,
	TableMeta,
} from '@tanstack/react-table';
import { TPagination } from '~/Types/TPagination';
import { TSelection } from '~/Types/TSelection';
import { Checkbox } from '../Checkbox';

import styles from './index.module.css';
import { useTranslation } from '../../Hooks/UseTranslation';
import { Thead } from './Thead';
import { Tbody } from './Tbody';
import { Pagination } from './Pagination';

type Props<T> = {
	selection?: TSelection<T>;

	columns: ColumnDef<T, unknown>[];
	data: T[];
	isLoading?: boolean;
	expandLine?: {
		render: (data: Row<T>) => React.ReactNode;
	};

	globalFilter?: {
		filter: string;
		setFilter: (data: string) => void;
	};

	rowForUpdate?: { row: number; data: T } | null;
	disabledVirtualization?: boolean;
	pagination?: TPagination;
	fullEditable?: boolean;
	meta?: TableMeta<T>;
};

type PropsTableInternal = {
	getIsAllRowsSelected: () => boolean;
	getIsSomeRowsSelected: () => boolean;
};

export function Table<T>({
	selection,
	columns,
	data,
	isLoading,
	expandLine,
	globalFilter,
	rowForUpdate,
	disabledVirtualization,
	pagination,
	meta,
	fullEditable,
}: Props<T>) {
	const [sorting, setSorting] = useState<SortingState>([]);

	const { translate } = useTranslation();

	function verifyIndeterminate(table: PropsTableInternal) {
		if (table.getIsAllRowsSelected()) {
			return true;
		}

		if (table.getIsSomeRowsSelected()) {
			return 'indeterminate';
		}

		return false;
	}

	function buildColumns() {
		const result: ColumnDef<T, unknown>[] = [];

		if (selection && !selection.disableCheckbox) {
			const t = [
				{
					id: 'select',
					header: ({ table }: HeaderContext<T, unknown>) =>
						selection.type === 'multi' && (
							<Checkbox
								containerProps={{
									className: 'flex items-center justify-center',
								}}
								checked={verifyIndeterminate(table)}
								onClick={table.getToggleAllRowsSelectedHandler()}
								{...{ disabled: selection.disableSelectionRow !== undefined }}
							/>
						),
					size: 60,
					minSize: 60,
					maxSize: 60,
					align: 'center',
					enableSorting: false,
					cell: ({ row }: CellContext<T, unknown>) => (
						<Checkbox
							containerProps={{
								className: 'flex items-center justify-center',
							}}
							{...{
								disabled: selection.disableSelectionRow
									? selection.disableSelectionRow(row)
									: false,
								checked: row.getIsSelected(),
							}}
						/>
					),
				},
			];
			result.push(t as unknown as ColumnDef<T, unknown>);
		}

		if (expandLine) {
			const t = [
				{
					id: 'expander',
					header: translate('ACTION'),
					size: 10,
					cell: ({ row }: CellContext<T, unknown>) => (
						<button
							type="button"
							onClick={row.getToggleExpandedHandler()}
							{...{
								style: { cursor: 'pointer' },
							}}
						>
							{row.getIsExpanded() ? '✏' : '📝'}
						</button>
					),
				},
			];
			result.push(t as unknown as ColumnDef<T, unknown>);
		}

		result.push(columns as unknown as ColumnDef<T, unknown>);
		return result.flat();
	}

	const table = useReactTable({
		data,
		columns: buildColumns(),
		getCoreRowModel: getCoreRowModel(),
		columnResizeMode: 'onChange',
		getFilteredRowModel: getFilteredRowModel(),
		pageCount: pagination?.pageCount,
		state: {
			pagination: {
				pageIndex: pagination?.pageIndex || 0,
				pageSize: pagination?.pageSize || 0,
			},
			sorting,
			rowSelection: selection?.rowSelection,
			globalFilter: globalFilter?.filter,
		},
		onGlobalFilterChange: globalFilter?.setFilter,
		onRowSelectionChange: selection?.setRowSelection,
		enableRowSelection: selection !== undefined,
		enableMultiRowSelection: selection?.type === 'multi',
		onSortingChange: setSorting,

		getSortedRowModel: getSortedRowModel(),
		getRowCanExpand: () => !!expandLine,
		getExpandedRowModel: getExpandedRowModel(),
		manualPagination: true,
		onPaginationChange: pagination?.setPagination,
		meta,
	});

	const tableContainerRef = useRef<HTMLDivElement>(null);

	function buildClass() {
		const classes = [styles.customContainer];
		classes.push('scrollbar-thin');
		classes.push('scrollbar-thumb-gray-500');
		classes.push('scrollbar-track-gray-300');
		classes.push('scrollbar-thumb-rounded-full');
		classes.push('scrollbar-track-rounded-full');
		return classes.join(' ');
	}

	return (
		<>
			<div
				ref={tableContainerRef}
				className={buildClass()}
				style={{ overflow: isLoading ? 'hidden' : 'auto' }}
			>
				<table className={styles.table}>
					<Thead table={table} />

					<Tbody
						table={table}
						tableContainerRef={tableContainerRef}
						data={data}
						columns={columns}
						isLoading={isLoading}
						expandLine={expandLine}
						selection={selection}
						rowForUpdate={rowForUpdate}
						disabledVirtualization={disabledVirtualization}
						fullEditable={fullEditable}
					/>
				</table>
			</div>
			{pagination && (
				<Pagination
					table={table}
					disabledActions={pagination.disabledActions}
					disabledPageSize={pagination.disabledPageSize}
				/>
			)}
		</>
	);
}
