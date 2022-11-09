/**
 * @vitest-environment jsdom
 */
import { it, describe, expect } from 'vitest';
import { makeData } from '.';

describe('Utils/MakeData', () => {
	it(`should generate medicalFiles`, async () => {
		const result = await makeData.medicalFiles(10);
		expect(result).not.toBeNull();
	});
});
