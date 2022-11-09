/**
 * @vitest-environment jsdom
 */
import { render } from '@testing-library/react';
import { it, describe, expect } from 'vitest';
import { Icons } from './index';

describe('Components/Icons', () => {
	it(`should render icon Report`, async () => {
		const { getByTestId } = render(<Icons.Report data-testid="IconReport" />);
		expect(getByTestId('IconReport')).toBeInTheDocument();
	});
	it(`should render icon Power`, async () => {
		const { getByTestId } = render(<Icons.Power data-testid="IconPower" />);
		expect(getByTestId('IconPower')).toBeInTheDocument();
	});
	it(`should render icon printer`, async () => {
		const { getByTestId } = render(<Icons.Printer data-testid="IconPrinter" />);
		expect(getByTestId('IconPrinter')).toBeInTheDocument();
	});
	it(`should render icon Pdf`, async () => {
		const { getByTestId } = render(<Icons.Pdf data-testid="IconPdf" />);
		expect(getByTestId('IconPdf')).toBeInTheDocument();
	});
	it(`should render icon Excel`, async () => {
		const { getByTestId } = render(<Icons.Excel data-testid="IconExcel" />);
		expect(getByTestId('IconExcel')).toBeInTheDocument();
	});
	it(`should render icon Xml`, async () => {
		const { getByTestId } = render(<Icons.Xml data-testid="IconXml" />);
		expect(getByTestId('IconXml')).toBeInTheDocument();
	});
});
