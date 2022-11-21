/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Table, flexRender } from '@tanstack/react-table';
import styles from './index.module.css';

type Props<T> = {
	table: Table<T>;
};

export function Thead<T>({ table }: Props<T>) {
	return (
		<thead className={styles.thead}>
			{table.getHeaderGroups().map(headerGroup => (
				<tr key={headerGroup.id}>
					{headerGroup.headers.map(header => (
						<th
							className={styles.th}
							key={header.id}
							colSpan={header.colSpan}
							style={{
								width: header.getSize(),
								// @ts-expect-error align exists
								textAlign: header.getContext().column.columnDef.align,
							}}
						>
							{header.isPlaceholder ? null : (
								<>
									<div
										{...{
											className: header.column.getCanSort()
												? 'cursor-pointer select-none'
												: '',
											onClick: header.column.getToggleSortingHandler(),
										}}
									>
										{flexRender(
											header.column.columnDef.header,
											header.getContext()
										)}
										{{
											asc: ' 🔼',
											desc: ' 🔽',
										}[header.column.getIsSorted() as string] ?? null}
									</div>
									{/* SizingMode */}
									{header.column.getCanResize() && (
										<div
											{...{
												onMouseDown: header.getResizeHandler(),
												onTouchStart: header.getResizeHandler(),
												className: `${styles.resizer} ${
													header.column.getIsResizing() ? styles.isResizing : ''
												}`,
											}}
										/>
									)}
								</>
							)}
						</th>
					))}
				</tr>
			))}
		</thead>
	);
}
