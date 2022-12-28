import saveAs from 'file-saver';
import * as XLSX from 'xlsx-js-style';

const EXCEL_TYPE =
	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

type DefProp = {
	header: string;
	accessor: string;
	convertionFn?: (data: any) => string;
};

type Props = {
	data: Record<string, unknown>[];
	defColumns: DefProp[];
};

const excel = ({ data, defColumns }: Props) => {
	const dataTemp: Record<string, unknown>[] = [];

	for (const item of data) {
		let t = {};
		for (const defCol of defColumns) {
			const value = defCol.convertionFn
				? defCol.convertionFn(item[defCol.accessor])
				: item[defCol.accessor];

			t = {
				...t,
				[defCol.header]: value,
			};
		}
		dataTemp.push(t);
	}
	console.log({ dataTemp });
	const ws = XLSX.utils.json_to_sheet(dataTemp);

	const styleHeader = {
		font: {
			patternType: 'solid',
			color: { rgb: 'FFFFFF' },
		},
		fill: {
			patternType: 'solid',
			fgColor: { rgb: '000' },
		},
	};

	const head = [
		{
			v: 'A',
			t: 's',
			s: styleHeader,
		},
		{
			v: 'B',
			t: 's',
			s: styleHeader,
		},
	];
	const row = [
		{ v: 'Courier: 24', t: 's', s: { font: { name: 'Courier', sz: 24 } } },
		{
			v: 'bold & color',
			t: 's',
			s: { font: { bold: true, color: { rgb: 'FF0000' } } },
		},
		{ v: 'fill: color', t: 's', s: { fill: { fgColor: { rgb: 'E9E9E9' } } } },
		{ v: 'line\nbreak', t: 's', s: { alignment: { wrapText: true } } },
	];

	const wsw = XLSX.utils.aoa_to_sheet([head, row]);

	const wb = {
		Sheets: {
			data: wsw,
		},
		SheetNames: ['data'],
	};

	const eb = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
	const blob = new Blob([eb], { type: EXCEL_TYPE });

	saveAs(blob, `Data ${EXCEL_EXTENSION}`);
};

export const exportTo = { excel };
