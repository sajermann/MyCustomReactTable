/* eslint-disable import/no-extraneous-dependencies */
import { faker } from '@faker-js/faker/locale/pt_BR';
import { TPerson } from '../../Types/TPerson';

const range = (len: number) => {
	const arr = [];
	for (let i = 0; i < len; i += 1) {
		arr.push(i);
	}
	return arr;
};

export function person(...lens: number[]) {
	const makeDataLevel = (depth = 0): TPerson[] => {
		const len = lens[depth]!;
		return range(len).map(
			(i): TPerson => ({
				id: String(i + 1),
				name: faker.name.firstName(),
				lastName: faker.name.lastName(),
				birthday: faker.date.past().toISOString(),
				email: faker.internet.email(),
				avatar: faker.internet.avatar(),
			})
		);
	};

	return makeDataLevel();
}

export const makeData = { person };
