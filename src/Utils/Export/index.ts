import saveAs from 'file-saver';
import * as XLSX from 'xlsx-js-style';

const EXCEL_TYPE =
	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

type TCellProps<T> = {
	valueCell: unknown;
	row: T;
	original: T[];
	index: number;
};

type THeaderProps<T> = {
	valueHeader: string;
	currentDefinition: DefProps<T>;
	definitions: DefProps<T>[];
	index: number;
};

export type DefProps<T> = {
	header: string;
	accessor: keyof T;
	typeCell?: 's' | 'b';
	accessorFn?: (data: TCellProps<T>) => string;
	styleCellFn?: (data: TCellProps<T>) => Record<string, unknown>;
	styleHeaderCellFn?: (data: THeaderProps<T>) => Record<string, unknown>;
};

export type Props<T> = {
	data: T[];
	defColumns: DefProps<T>[];
};

function excel<T>({ data, defColumns }: Props<T>) {
	const headerTemp: Record<string, unknown>[] = [];
	const dataTemp: Record<string, unknown>[][] = [];

	// Add Header

	for (let i = 0; i < defColumns.length; i += 1) {
		const styleFn = defColumns[i].styleHeaderCellFn;
		headerTemp.push({
			v: defColumns[i].header,
			s:
				styleFn &&
				styleFn({
					valueHeader: defColumns[i].header,
					currentDefinition: defColumns[i],
					definitions: defColumns,
					index: i,
				}),
		});
	}
	// Add Rows

	for (let i = 0; i < data.length; i += 1) {
		const rowTemp: Record<string, unknown>[] = [];
		for (const defCol of defColumns) {
			const value = defCol.accessorFn
				? defCol.accessorFn({
						valueCell: data[i][defCol.accessor],
						row: data[i],
						original: data,
						index: i,
				  })
				: data[i][defCol.accessor];

			const style = defCol.styleCellFn
				? defCol.styleCellFn({
						valueCell: value,
						row: data[i],
						original: data,
						index: i,
				  })
				: {};

			rowTemp.push({ v: value, t: defCol.typeCell, s: style });
		}
		dataTemp.push(rowTemp);
	}

	const ws = XLSX.utils.aoa_to_sheet([
		[...headerTemp],
		...dataTemp.map(item => item),
	]);

	const wb = {
		Sheets: {
			data: ws,
		},
		SheetNames: ['data'],
	};

	const eb = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
	const blob = new Blob([eb], { type: EXCEL_TYPE });

	saveAs(blob, `Data ${EXCEL_EXTENSION}`);
}

export const exportTo = { excel };
