/**
 * @vitest-environment jsdom
 */
import { it, describe, expect } from 'vitest';
import { makeData } from '.';

describe('Utils/MakeData', () => {
	it(`should generate person`, async () => {
		const result = await makeData.person(10);
		expect(result).not.toBeNull();
	});
	it(`should generate personWithPagination`, async () => {
		const result = await makeData.personWithPagination({ pageSize: 1 });
		expect(result).not.toBeNull();
	});
});
